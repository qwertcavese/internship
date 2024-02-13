// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Badge from '@mui/material/Badge';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// // import MailIcon from '@mui/icons-material/Mail';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Addtocart from './Addtocart';
// import Card from "@mui/material/Card";
// import Addtocart from './Addtocart';


// export default function BadgeVisibility() {
    // const [count, setCount] = React.useState(1);


    // const [invisible, setInvisible] = React.useState(false);

    // const handleBadgeVisibility = () => {
    //     setInvisible(!invisible);
    // };

//     return (
//         <div>



//             <Box
//                 sx={{
//                     color: "action.active",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     textAlign: "center",
//                     // border:"1px solid red",
//                     marginBottom: 20,
//                     "& > *": {
//                         // marginBottom: 2,
//                     },
//                     "& .MuiBadge-root": {
//                         marginRight: 2.5,
//                     },
//                 }}
//             >
//                 <div>
//                     <Badge color="primary" badgeContent={count}>
//                         <ShoppingCartIcon />
//                     </Badge>
//                     <ButtonGroup>
//                         <Button
//                             aria-label="reduce"
//                             onClick={() => {
//                                 setCount(Math.max(count - 1, 1));
//                             }}
//                         >
//                             <RemoveIcon fontSize="small" />
//                         </Button>
//                         <Button
//                             aria-label="increase"
//                             onClick={() => {
//                                 // let count2 = count
//                                 setCount(count + 1, 1);
//                                 // <Addtocart cnt={count2} />

//                                 // <Exaple  total = {count}/>
//                             }}
//                         >
//                             <AddIcon fontSize="small" />
//                         </Button>
//                     </ButtonGroup>
//                 </div>
                
//             </Box></div>

//     );
// }