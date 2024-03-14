import * as React from 'react';
import Button from '@mui/material/Button';
import ResponsiveAppBar from './Navbar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CreateCategory, deleteCategory, updateCategory } from './ApiServices';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllCategories } from './ApiServices';
import WrapperSnackbar from './WrapperSnackbar';
import Loader from './Loader';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    p: 4,
    color: 'black',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Category() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = React.useState("")
    const [categoryMessage, setCategoryMessage] = React.useState({
        state: false,
        message: "",
    })
    const [categories, setCategories] = React.useState([])
    var count = 0;
    const [state, setState] = React.useState(true)
    const [name, setName] = React.useState({
        btnName: "",
        heading: "",
        placeholder: "",
    })

    const [loader, setLoader] = React.useState(true)


    React.useEffect(() => {
        async function fetchData() {

            var getAllCategoriesRes = await getAllCategories();
            setCategories(getAllCategoriesRes)
            setLoader(false)
        }
        fetchData();
        setState(true)
    }, [state])

    if (sessionStorage.getItem("adminId") && loader == false) {

        return (
            <>
                <ResponsiveAppBar />

                <WrapperSnackbar data={categoryMessage}>

                    <div className='body-main'>
                        <div className='category-main'>
                            <div className='category-container'>
                                <h2 style={{ textAlign: "center" }}>ALL CATEGORY</h2><hr />
                                <div>
                                    <Button variant="contained" style={{ marginTop: "10px", float: "inline-end", marginBottom: "10px" }}
                                        onClick={() => {
                                            setOpen(true)
                                            setCategory("")
                                            setName({ ...name, btnName: "Add", head: "Add New Category", placeholder: "Enter New Category" })
                                        }}
                                    >Add Category</Button>
                                </div><hr />

                                <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>SR NO.</StyledTableCell>
                                                <StyledTableCell>NAME</StyledTableCell>
                                                <StyledTableCell>ACTION</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {categories.map((val) => {
                                                count = count + 1;
                                                return (
                                                    <StyledTableRow key={val.id}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {count}
                                                        </StyledTableCell>
                                                        <StyledTableCell>{val.name}</StyledTableCell>
                                                        <StyledTableCell style={{ display: "flex" }}>
                                                            <button className='dc-btn' id={val.id} onClick={async () => {
                                                                setOpen(true);
                                                                setCategory(val.name)
                                                                setName({ ...name, btnName: "Update", head: "Update Category", placeholder: "Update Category" })
                                                                sessionStorage.setItem("updateCategoryId", val.id)
                                                            }}>
                                                                Edit
                                                            </button>
                                                            <button className='dc-btn' id={val.id} onClick={async () => {
                                                                var deleteCategoryRes = await deleteCategory({ categoryId: val.id })
                                                                console.log(deleteCategoryRes);
                                                                setLoader(false)
                                                                setState(false)
                                                            }}>
                                                                Delete
                                                            </button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </div>
                        </div>
                    </div>



                    {/* modal box code */}
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {name.head}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                            display: "flex",
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" placeholder={name.placeholder} variant="outlined"
                                            style={{ border: "1px solid blue", borderRadius: "5px", height: "35px" }}
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />


                                        <Button variant="contained" id={name.btnName}
                                            onClick={async (e) => {
                                                if (e.target.id == "Add") {

                                                    var CreateCategoryRes = await CreateCategory({ category })
                                                    // console.log(CreateCategoryRes);
                                                    setCategoryMessage({ ...categoryMessage, state: true, message: CreateCategoryRes });
                                                    handleClose();
                                                    setState(false)
                                                    // setTimeout(()=>{
                                                    //     setCategoryMessage({ ...categoryMessage, state:false, message: "" });
                                                    // },3000)
                                                }
                                                else {
                                                    var updateCategoryRes = await updateCategory({ category })
                                                    // console.log(updateCategoryRes);
                                                    handleClose();
                                                    setState(false)
                                                }
                                            }
                                            }
                                            style={{ width: "28%", height: "10%" }}
                                        >{name.btnName}</Button>

                                    </Box>
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                </WrapperSnackbar>
            </>
        )
    }
    else if (loader == true) return <Loader />
    else{
        window.location.pathname="/"
    }
}
