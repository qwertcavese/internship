import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './Navbar'
import SignIn from './SignIn'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getAllOrderDetails, updateOrderStatus } from './ApiServices';
import Reviews from './Reviews';
import Loader from './Loader';
import Snackbar1 from './Snackbar';

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


export default function Home() {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = React.useState("")
  const [z, setz] = React.useState({
    open1: false,
    msg: "",
    type:"",
  })
  const [orders, setOrders] = React.useState([])
  var count = 0;
  const [state, setState] = React.useState(true)
  const [name, setName] = React.useState({
    btnName: "",
    heading: "",
    placeholder: "",
  })
  const [loader, setLoader] = React.useState(true)


  function closeSnackBar() {
    setTimeout(() => {
      setz({ ...z, open1: false })
    }, 1500)
  }
  React.useEffect(() => {
    async function fetchAllOrdersDetails() {

      var getAllOrdersRes = await getAllOrderDetails();
      setOrders(getAllOrdersRes.orders)
      setLoader(false)
    }
    fetchAllOrdersDetails();

    setState(true)
  }, [state])
  // console.log(navigator.connection.effectiveType);
  // console.log(orders);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
};

  if (sessionStorage.getItem("adminId") && loader == false) {

    return (
      <>
        <ResponsiveAppBar />
        {/* <WrapperSnackbar> */}
        <div className='body-main' style={{}}>

          <div className='get-order-main'>
            <div className='get-order-container'>
              <h2 style={{ textAlign: "center" }}>ALL ORDERS</h2><hr />
              <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>SR NO.</StyledTableCell>
                      <StyledTableCell>CUSTOMER ID</StyledTableCell>
                      <StyledTableCell>ITEMS</StyledTableCell>
                      <StyledTableCell>ORDER DATE</StyledTableCell>
                      <StyledTableCell>ACTION</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((val, index) => {
                      count = count + 1;

                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {count}
                          </StyledTableCell>
                          <StyledTableCell>{val.customer_order_id}</StyledTableCell>
                          <StyledTableCell>
                            <Table sx={{ minWidth: 300 }} aria-label="customized table">
                              <TableHead>
                                <TableRow>
                                  <TableCell style={{ fontWeight: "bold" }}>Item Name</TableCell>
                                  <TableCell style={{ fontWeight: "bold" }}>Quantity</TableCell>
                                  <TableCell style={{ fontWeight: "bold" }}>Unit Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {val.items.map((item) => {
                                  let unit = ""
                                  if (item.quantity < 1) {
                                    unit = "g"
                                    item.quantity = item.quantity * 1000
                                  }
                                  else unit = "kg"
                                  return (
                                    <TableRow key={item.item_name}>
                                      <TableCell>{item.item_name}</TableCell>
                                      <TableCell>{item.quantity}{unit}</TableCell>
                                      <TableCell>₹{item.unit_price}</TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </StyledTableCell>
                          <StyledTableCell>{formatDate(val.order_date)}</StyledTableCell>
                          <StyledTableCell>
                            {
                              val.status == 0 ?
                                (

                                  <button className='dc-btn' id={val.customer_order_id} onClick={async () => {
                                    let updateOrderStatusRes = await updateOrderStatus(val.customer_order_id)
                                    // console.log(updateOrderStatusRes);
                                    setz({...z,open1:true,msg:updateOrderStatusRes,type:"success"})
                                    setState(false)
                                    setLoader(false)
                                    closeSnackBar();
                                  }}>
                                    Pending
                                  </button>
                                ) : (
                                  <Typography variant="body2" color="textSecondary" style={{ borderRadius: "5px", padding: "7px", background: "rgb(13, 129, 13)", color: "white" }}>
                                    Completed
                                  </Typography>
                                )
                            }
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })}
                  </TableBody>
                </Table>

              </TableContainer>

            </div>
          </div>
          <Reviews />
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

                </Box>
              </Typography>
            </Box>
          </Modal>
        </div>


        <Snackbar1 message={z} />
      </>
    )
  }

  else if (loader == true) {
    return <Loader />
  }

  else {
    window.location.pathname = "/"
    return <SignIn />
  }
}
