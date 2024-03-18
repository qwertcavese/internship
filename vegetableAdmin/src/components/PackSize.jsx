import * as React from 'react';
import Button from '@mui/material/Button';
import ResponsiveAppBar from './Navbar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CreateCategory, createPackSize, deleteCategory, deletePackSize, getAllItems, getAllPackSize, updateCategory } from './ApiServices';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllCategories } from './ApiServices';
import Loader from './Loader';
import Snackbar1 from './Snackbar';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    color: 'black',
    padding: "15px",
    width: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "25px",
    borderRadius: "10px",
}

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

export default function PackSize() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = React.useState("")
    const [packSize, setPackSize] = React.useState([])
    var count = 0;
    const [state, setState] = React.useState(true)
    const [name, setName] = React.useState({
        btnName: "",
        heading: "",
        placeholder: "",
        placeholder2: '',
    })

    const [data, setData] = React.useState({
        packSize: "",
        price: "",
    })

    const [allItems, setAllItems] = React.useState([])
    const [loader, setLoader] = React.useState(true)

    React.useEffect(() => {

        async function getAllItemsFetch() {
            var getAllItemsRes = await getAllItems();
            // console.log(getAllItemsRes);
            setAllItems(getAllItemsRes)
            setLoader(false)
        }
        getAllItemsFetch();


        async function fetchData() {

            var getAllPackSizeRes = await getAllPackSize();
            setPackSize(getAllPackSizeRes.all_pack_sizes)
            setLoader(false)
        }
        fetchData();
        setState(true)
    }, [state])


    const [z, setz] = React.useState({
        open1: false,
        msg: "",
        type: "",
    })
    function closeSnackBar() {
        setTimeout(() => {
            setz({ ...z, open1: false })
        }, 1500)
    }
    if (sessionStorage.getItem("adminId") && loader == false) {

        return (
            <>
                <ResponsiveAppBar />

               

                <div className='body-main'>
                    <div className='pack-size-main'>
                        <div className='pack-size-container'>
                            <h2 style={{ textAlign: "center" }}>Pack Sizes</h2><hr />
                            <div>
                                <Button variant="contained" style={{ marginTop: "10px", float: "inline-end", marginBottom: "10px" }}
                                    onClick={() => {
                                        setOpen(true)
                                        setCategory("")
                                        setName({ ...name, btnName: "Add", head: "Add New Pack", placeholder: "Pack Size", placeholder2: "Price" })
                                    }}
                                >Add Pack</Button>
                            </div><hr />

                            <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>SR NO.</StyledTableCell>
                                            <StyledTableCell>ITEM NAME</StyledTableCell>
                                            <StyledTableCell>SIZE</StyledTableCell>
                                            <StyledTableCell>PRICE</StyledTableCell>
                                            <StyledTableCell>ACTION</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {packSize.map((val, index) => {
                                            // console.log(val.pack_size_id);
                                            var unit = ""
                                            count = count + 1;
                                            if (val.size < 1) {
                                                val.size = val.size * 1000;
                                                unit = "g"
                                            }
                                            else unit = "kg"
                                            return (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {count}
                                                    </StyledTableCell>
                                                    <StyledTableCell>{val.item_name}</StyledTableCell>
                                                    <StyledTableCell>{val.size}{unit}</StyledTableCell>
                                                    <StyledTableCell>₹{val.price}</StyledTableCell>
                                                    <StyledTableCell style={{ display: "flex" }}>
                                                        <button className='dc-btn' id={val.id} onClick={async () => {
                                                            setOpen(true);
                                                            setCategory(val.name)
                                                            setName({ ...name, btnName: "Update", head: "Update Category", placeholder: "Update Category" })
                                                            sessionStorage.setItem("updateCategoryId", val.id)
                                                        }} disabled>
                                                            Edit
                                                        </button>
                                                        <button className='dc-btn' id={val.pack_size_id} onClick={async (e) => {
                                                            var deletePackSizeRes = await deletePackSize({ packSizeId: e.target.id })
                                                            // console.log(deletePackSizeRes);
                                                            setz({ ...z, open1: true, msg: deletePackSizeRes, type: "success" })
                                                            setState(false)
                                                            closeSnackBar();
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
                            </Typography >

                            <div style={{ width: "100%" }}>

                                <select id='pack-select-inpt' style={{ width: "85%", textAlign: "center", height: "30px" }} onClick={(e) => {
                                    // console.log(e.target.value);
                                    sessionStorage.setItem("itemId", e.target.value)
                                    document.getElementById("pack-select").style.contentVisibility = "hidden"
                                }}>
                                    <option value="">Select Pack</option>
                                    {allItems.map((value, index) => {
                                        return (

                                            <option key={index} value={value.id} id={value.id}>{value.name}</option>
                                        );
                                    })}
                                </select><br />
                                <div id='pack-select' style={{ color: "red", fontSize: "15px", position: "absolute", contentVisibility: "hidden" }}>Please Select Pack</div>
                            </div>
                            <div style={{ width: "100%" }}>

                                <input type="number" name="" id="pack-size-inpt" placeholder={name.placeholder} style={{ paddingLeft: "5px", width: "60%", height: "25px" }} onChange={(e) => {
                                    setData({ ...data, packSize: e.target.value })
                                    // console.log(data.packSize);
                                    document.getElementById("pack-size").style.contentVisibility = "hidden"
                                }} min="0" /><br />
                                <div id='pack-size' style={{ color: "red", fontSize: "15px", contentVisibility: "hidden", position: "absolute" }}>Please Enter Size</div>
                            </div>
                            <div style={{ width: "100%", }}>

                                <input type="number" name="" id="pack-price-inpt" placeholder={name.placeholder2} style={{ paddingLeft: "5px", width: "60%", height: "25px" }} onChange={(e) => {
                                    setData({ ...data, price: e.target.value })
                                    // console.log(data);
                                    document.getElementById("pack-price").style.contentVisibility = "hidden"
                                }} min="0" />
                                <div id='pack-price' style={{ color: "red", fontSize: "15px", contentVisibility: "hidden", position: "absolute" }}>Please Enter price</div>
                            </div>

                            <Button variant="contained" id={name.btnName}
                                onClick={async (e) => {

                                    if (document.getElementById("pack-select-inpt").value == "") {
                                        document.getElementById("pack-select").style.contentVisibility = "visible"
                                    }
                                    else if (document.getElementById("pack-size-inpt").value == "") {
                                        document.getElementById("pack-size").style.contentVisibility = "visible"
                                    }
                                    else if (document.getElementById("pack-price-inpt").value == "") {
                                        document.getElementById("pack-price").style.contentVisibility = "visible"
                                    }

                                    else {

                                        var createPackSizeRes = await createPackSize({ packSize: data.packSize, price: data.price })
                                        // console.log(createPackSizeRes);
                                        setz({ ...z, open1: true, msg: createPackSizeRes, type: "success" })
                                        handleClose()
                                        closeSnackBar()
                                        setState(false)
                                    }

                                }
                                }
                                style={{ width: "60%", height: "10%", marginTop: "10px" }}
                            >{name.btnName}</Button>
                        </Box>
                    </Modal>
                </div>
                <Snackbar1 message={z} />
            </>
        )
    }
    else if (loader == true) return <Loader />
    else return window.location.pathname = "/"
}
