import axios from "axios"

export function Url() {
  return 'http://192.168.29.183:8000'
}

export default async function PostSignin(props) {
  try {
    // console.log(props);
    const response = await axios.post(
      Url() + '/login',
      new URLSearchParams({
        'grant_type': '',
        'username': props.email,
        'password': props.pwd,
        'scope': '',
        'client_id': '',
        'client_secret': ''
      }),
      {
        headers: {
          'accept': 'application/json'
        }
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.detail.message);
  }
}


export async function PostResetRequest(props) {
  try {

    const response = await axios.post(
      Url() + '/password',
      '',
      {
        params: {
          'user_email': props.email
        },
        headers: {
          'accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    )
    console.log(response);
    return response.data
  } catch (error) {
    // console.log("api serv:",error);
  }
}

export async function PutNewPwd(props) {
  try {

    const response = await axios.put(
      Url() + '/reset_password',
      {
        'token': sessionStorage.getItem("forgotPwdToken"),
        'password': props.resetPwd
      },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    // console.log("reset api pwd:",response.data.message);
    return response.data.message
  } catch (error) {
    console.log("reset error api ne pwd:",error.message);
  }
}

export async function PostSignUp(props) {
  // console.log(props);
  try {

    const response = await axios.post(
      Url() + '/signup',
      '',
      {
        params: {
          'firstname': props.fn,
          'lastname': props.ln,
          'email': props.email,
          'password': props.pwd
        },
        headers: {
          'accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    )
    // console.log("signup api positive", response);
    return response.data.detail.message
  }
  catch (error) {
    // console.log("api:", error);
    return error.response.data.detail.message 
  }
}