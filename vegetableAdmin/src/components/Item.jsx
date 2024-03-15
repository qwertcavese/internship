import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './Navbar'
import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import { createItem, deleteItems, getAllCategories, getAllItems, getPackSize, updateItem } from './ApiServices';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Loader from './Loader';
import Snackbar1 from './Snackbar';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function Item() {

    const [items, setItems] = React.useState([])
    const [render, setRender] = React.useState(false)

    // quantity code
    const [quantity, setQuantity] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [category, setCategory] = React.useState([])

    const [name, setName] = React.useState({
        name: "",
        placeholder: "",
        title: "",
        placeholderDesc: "",
        placeholderQuantity: "",
        placeholderImg: "",
        btn: "",
        displayField: "",
        btnId: ""
    })

    const [data, setData] = React.useState({
        updtItem: "",
        updtDesc: "",
        updtQuantity: "",
        updtImg: null,
        updtCategory: 0,
        updtMod: "",
        updtItemId: "",
    })
    const [loader, setLoader] = React.useState(true)

    React.useEffect(() => {
        async function fetchData() {
            var res = await getAllItems();
            setItems(res);
            setLoader(false)
        }
        fetchData();

        setRender(false)


    }, [render])

    const [z, setz] = React.useState({
        open1: false,
        msg: "",
        type:""
    })
    function closeSnackBar() {
        setTimeout(() => {
            setz({ ...z, open: false })
        }, 1500)
    }

    const url = `http://192.168.29.183:8001`



    if (sessionStorage.getItem("adminId") && loader == false) {

        return (
            <>
                <ResponsiveAppBar />

                <Button variant="contained" disableElevation style={{ right: "0px", position: "fixed", marginTop: "80px", marginRight: "20px", zIndex:"1"}}
                    onClick={async (e) => {
                        setName({ ...name, title: "Create New Item", placeholder: "Item Name", placeholderDesc: " Description", placeholderQuantity: "Quantity", placeholderImg: "Image", btn: "add item", btnId: "add", displayField: "hidden" })
                        handleClickOpen();
                        var getAllCategoriesRes = await getAllCategories();
                        setCategory(getAllCategoriesRes)
                        // console.log("clicked");
                    }}>
                    Add New Item
                </Button >

                <div className='body-main' style={{ overflowY: "hidden" }}>
                    <div className='items-main' style={{
                        display: "flex", flexWrap: "wrap",
                        justifyContent: "space-around"
                    }}>
                        {items.map((val, index) => {
                            var unit = ""
                            if (val.quantity < 1) {
                                val.quantity = val.quantity * 1000
                                unit = "g"
                            }
                            else {
                                unit = "kg"
                            }
                            return (

                                <Card style={{ width: "240px", margin: "15px 10px 80px 10px" }} key={index}>

                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="240"
                                        image={url + val.image_path}
                                    />
                                    <CardContent>
                                        <hr />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {val.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {val.description}
                                        </Typography>
                                        <hr />
                                        <Typography variant="body2">
                                            Quantity Available:- {val.quantity}{unit}
                                        </Typography>
                                        <select name="quantity" id={val.id} style={{ height: "40px", borderRadius: "5px", marginTop: "10px", width: "80%", cursor: "pointer", textAlign: "center " }}
                                            onClick={async (e) => {
                                                var getPackSizeRes = await getPackSize({ itemId: e.target.id })
                                                setQuantity(getPackSizeRes.pack_sizes)
                                            }}>
                                            <option value="">Select Quantity</option>
                                            {quantity.map((val) => {
                                                if (val.size < 1) return <option id={val.id}>{val.size * 1000}g = ₹{val.price}</option>


                                                else return <option id={val.id}>{val.size}kg = ₹{val.price}</option>

                                            })}
                                        </select>
                                    </CardContent>
                                    <hr />

                                    <CardActions>
                                        <Button size="small" id={val.id} onClick={async (e) => {
                                            setName({ ...name, title: "Update Item", placeholder: "Update Item Name", placeholderDesc: "Update Description", placeholderQuantity: "Update Quantity", placeholderImg: "Update Image", btn: "save changes", displayField: "visible", btnId: "updt" })
                                            handleClickOpen();

                                            setData({ ...data, updtItemId: e.target.id })
                                            // console.log(data.updtItemId);

                                            var getAllCategoriesRes = await getAllCategories();
                                            setCategory(getAllCategoriesRes)


                                        }}>Update</Button>
                                        <Button size="small" id={val.id} onClick={async (e) => {
                                            var deleteItemRes = await deleteItems({ itemId: e.target.id })
                                            // console.log(deleteItemRes);
                                            setz({ ...z, open1: true, msg: deleteItemRes,type:"success" })
                                            setRender(true)
                                            closeSnackBar()
                                        }}>Delete</Button>
                                    </CardActions>
                                </Card>
                            )
                        })}
                    </div>


                </div>




                {/* dialog box code */}
                <div>
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            {name.title}
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent dividers style={{ display: "grid", gap: "15px" }}>

                            <div>

                                <select name="" id="" className='item-inpt' style={{ textAlign: "center", height: "55px", border: "0px", background: "whiteSmoke" }} onChange={(e) => {
                                    setData({ ...data, updtCategory: e.target.value })
                                }}>
                                    <option value="">Select Category</option>
                                    {category.map((val, index) => {
                                        return (
                                            <option value={val.id} key={index}>{val.name}</option>
                                        )
                                    })}
                                </select>
                                <hr />
                            </div>
                            <div>

                                <TextField id="filled-basic" label={name.placeholder} variant="filled" className='item-inpt' onChange={(e) => {
                                    setData({ ...data, updtItem: e.target.value })
                                }} />
                            </div>
                            <div>

                                <TextField id="filled-basic" label={name.placeholderDesc} variant="filled" className='item-inpt' onChange={(e) => {
                                    setData({ ...data, updtDesc: e.target.value })
                                }} />
                            </div>
                            <div>

                                <TextField id="filled-basic" label={name.placeholderQuantity} variant="filled" className='item-inpt' type='number'  onChange={(e) => {
                                    setData({ ...data, updtQuantity: e.target.value })
                                }} min="0"/>
                            </div>
                            <div>

                                <TextField id="filled-basic" type='file' variant="filled" className='item-inpt'
                                    name="image" accept="image/*"
                                    onChange={(e) => {
                                        setData({ ...data, updtImg: e.target.files[0] })
                                        // console.log(data.updtImg);
                                    }} />
                            </div>
                            <div style={{ contentVisibility: name.displayField }}>
                                <label htmlFor="">Active</label>
                                <Checkbox value="active" id='active' onChange={(e) => {
                                    if (e.target.checked == true) {

                                        setData({ ...data, updtMod: e.target.value })
                                        // console.log(data);
                                        // console.log(data.updtImg.length);
                                    }
                                }} />
                                <label htmlFor="" style={{ marginLeft: "10px" }}>Deactive</label>
                                <Checkbox value="deactive" id='deactive' onChange={(e) => {
                                    if (e.target.checked == true) {

                                        setData({ ...data, updtMod: e.target.value })
                                        // console.log(data);
                                        // console.log(data.updtImg.length);
                                    }
                                }} />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button id={name.btnId} autoFocus onClick={async (e) => {

                                if (e.target.id == "updt") {

                                    const updateItemRes = await updateItem({
                                        updtItem: data.updtItem,
                                        updtDesc: data.updtDesc,
                                        updtQuantity: data.updtQuantity,
                                        updtImg: data.updtImg,
                                        updtCategory: data.updtCategory,
                                        updtMod: data.updtMod,
                                        updtItemId: data.updtItemId,
                                    })
                                    // console.log(updateItemRes);
                                    setz({...z,open1:true,msg:updateItemRes.message,type:"success"})
                                }
                                else {
                                    const createItemRes = await createItem({
                                        updtItem: data.updtItem,
                                        updtDesc: data.updtDesc,
                                        updtQuantity: data.updtQuantity,
                                        updtImg: data.updtImg,
                                        updtCategory: data.updtCategory,
                                        updtMod: data.updtMod,
                                        updtItemId: data.updtItemId,
                                    })
                                    // console.log(createItemRes.message);
                                    setz({...z,open1:true,msg:createItemRes.message,type:"success"})
                                }
                                // setLoader(true)
                                handleClose();
                                setRender(true);
                                closeSnackBar();
                            }}>
                                {name.btn}
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>

                <Snackbar1 message={z} />

            </>
        )
    }
    else if (loader == true) return <Loader />
    else {
        window.location.pathname = "/"
        return <SignIn />
    }
}
