import * as React from "react";
// import DrawerAppBar from './NAvbar1';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect } from "react";


// import React, { createContext, useContext } from 'react';
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./Newnavbar";
const UserContext = createContext();
export default function ImgMediaCard() {
  // const [cartsvalue, setcartsvalue] = React.useState(1);
  const [products, setproducts] = React.useState([]);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setproducts(res.data);
    });
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <ResponsiveAppBar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "90px",
          justifyContent: "left",
          padding:"15px"
        }}
      >
        {products.slice(0, 20).map((value, index) => {
          return (
            <Card key={index} style={{
              padding:"15px",
              borderRadius:"25px",
              width:"348px"
            }} >
              <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image={value.image}
                style={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${value.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => {
                    axios
                      .post("http://localhost:3000/product", {
                        title: value.title,
                        price: value.price,
                        category: value.category,
                        image: value.image,
                        cartvalue:1
                      })
                      .then(console.log("done"));
                  }}
                  
                >
                  Add To Cart
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/BuysPage");
                  }}
                >
                  Buy
                </Button>
               
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
}
export { UserContext };
