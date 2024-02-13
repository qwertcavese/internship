from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from passlib.context import CryptContext
import jwt
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()
id_inc = 0

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to the specific origin(s) you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
PASSWORD_HASHING_ALGORITHM = "bcrypt"

# MySQL database configuration
MYSQL_HOST = "localhost"
MYSQL_USER = "root"
MYSQL_PASSWORD = ""
MYSQL_DATABASE = "test_api"

# Establish MySQL connection
db_conn = mysql.connector.connect(
    host=MYSQL_HOST,
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    database=MYSQL_DATABASE,
)
cursor = db_conn.cursor()

class User(BaseModel):
    username: str
    email: str
    password: str

class UserProfile(BaseModel):
    user_id: int
    username: str
    email: str
    full_name: str = None
    dob: str = None
    phone_no: str = None

class UserProfileUpdate(BaseModel):
    username: str
    email: str
    full_name: str = None
    dob: str = None
    phone_no: str = None

# OAuth2 password bearer flow for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token1")

# Password hashing context
pwd_context = CryptContext(schemes=[PASSWORD_HASHING_ALGORITHM], deprecated="auto")

# Function to create a JWT token
def create_jwt_token(data: dict):
    to_encode = data.copy()
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

# Function to decode and verify a JWT token
def decode_jwt_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload

# Function to create a new user with an auto-incrementing id
def create_user(user: User):

    hashed_password = pwd_context.hash(user.password)

    # Check for duplicate email addresses
    select_query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(select_query, (user.email,))
    existing_user = cursor.fetchone()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    insert_query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
    cursor.execute(insert_query, (user.username, user.email, hashed_password))
    db_conn.commit()

    user_data = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
    }

    get_user_id = "SELECT id FROM users WHERE email = %s"
    cursor.execute(get_user_id,(user.email,))
    user_id = cursor.fetchone()
    # print(user_id)
    
    return user_data, user_id

# Endpoint for user registration (sign-up)
@app.post("/signup", response_model=dict)
async def sign_up(user: User):
    user_data, user_id = create_user(user)

    return {"message": "User registered successfully","user": user_data, "user_id": user_id}

@app.post("/insert_profile", response_model=dict)
async def insert_profile(profile: UserProfile):
    insert_query = "INSERT INTO user_profile_tbl (uid, username, email, full_name, dob, phone_no) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(insert_query, (profile.user_id, profile.username, profile.email, profile.full_name, profile.dob, profile.phone_no))
    db_conn.commit()

    return {"message": "User profile inserted successfully"}

@app.put("/update_profile/{uid}", response_model=dict)
async def update_profile(uid: int, profile_update: UserProfileUpdate):
    update_query = """
        UPDATE user_profile_tbl
        SET username = %s, email = %s, full_name = %s, dob = %s, phone_no = %s
        WHERE uid = %s
    """
    cursor.execute(update_query, (profile_update.username, profile_update.email, profile_update.full_name, profile_update.dob, profile_update.phone_no, uid))
    db_conn.commit()

    return {"message": f"User profile with uid {uid} updated successfully"}

# Endpoint for token creation (sign-in)
@app.post("/token1", response_model=dict)
async def sign_in(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    password = form_data.password
    print(form_data)
    
    select_query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(select_query, (username,))
    user_data = cursor.fetchone()
    
    if not user_data:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    stored_password = user_data[3]  # Assuming password is in the fourth column
    if not pwd_context.verify(password, stored_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token_data = {"sub": username}
    token = create_jwt_token(token_data)
    print(token)
    return {"access_token": token, "token_type": "bearer"}

# Endpoint to get user details (protected route)
@app.get("/users/me", response_model=dict)
async def get_user(token: str = Depends(oauth2_scheme)):
    payload = decode_jwt_token(token)
    print(payload)
    username = payload.get('sub')
    
    select_query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(select_query, (username,))
    user_data = cursor.fetchone()

    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found',
        )
    
    return {
        "username": user_data[1],
        "email": user_data[2],
    }
