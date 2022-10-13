import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cookies from "js-cookie";
import Product from "./Product";
import Typography from "@mui/material/Typography";

const Cart = ({ dataCart, dataCount }) => {
  const navigate = useNavigate();
  const [dense, setDense] = useState(false);
  const [products, setProducts] = useState([]);

  let getSellInfo = Cookies.get("sell");
  let productsCookies = getSellInfo && JSON.parse(getSellInfo);
  if (productsCookies) {
    return <Navigate to="/completar-venta" replace />;
  }
  // let total = listPrice.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (dataCart) {
      setProducts((prevState) => {
        const foundIndex = prevState.findIndex(
          (p) => p.idProducto === dataCart.idProducto
        );
        if (foundIndex === -1) {
          const newProduct = dataCart;
          if(!newProduct.cantidad) newProduct.cantidad = 1;
          return [...prevState, newProduct];
        }
        const newState = [...prevState];
        newState[foundIndex].cantidad++;
        return newState;
      });
    }
  }, [dataCount]);

  const handleSaveProd = () => {
    if (products.length > 0) {
      Cookies.set("sell", JSON.stringify(products).toString(), {
        expires: 0.3,
      });
      navigate("/completar-venta");
    }
  };

  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.idProducto !== productId)
    );
  };

  const handleQuantityChange = (productId, action) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.idProducto !== productId) return p;
        const newProduct = { ...p };
        switch (action) {
          case "increment":
            newProduct.cantidad++;
            break;
          case "decrement":
            if (newProduct.cantidad > 1) newProduct.cantidad--;
            break;
          default:
            console.log(`${action} no esta implementado`);
        }
        return newProduct;
      })
    );
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Paper elevation={3}>
          <div style={{ padding: "10px" }}>
            <Typography
              variant="h5"
              sx={{
                p: 1,
                textAlign: "center",
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
              }}
            >
              Carrito de compra <br />
              <ShoppingCartIcon />
            </Typography>
            <List
              dense={dense}
              sx={{
                overflow: "auto",
                height: 460,
                width: 320,
                maxHeight: 460,
                maxWidth: 320,
              }}
            >
              {products.map((value) => (
                <Product
                  data={value}
                  key={value.idProducto}
                  deleteProduct={handleDelete}
                  changeQuantity={handleQuantityChange}
                />
              ))}
            </List>
          </div>
          <Paper sx={{ pl: 0.5, textAlign: "center" }}>
            {/* <h2>Total: S/{total.toFixed(2)}</h2> */}
            {products.length > 0 && (
              <Button
                sx={{ m: 1 }}
                variant="contained"
                startIcon={<SellTwoToneIcon />}
                onClick={handleSaveProd}
              >
                Completar Venta
              </Button>
            )}
            {products.length === 0 && (
              <Button
                sx={{ m: 1 }}
                variant="contained"
                startIcon={<SellTwoToneIcon />}
                disabled
                type="submit"
              >
                Completar Venta
              </Button>
            )}
          </Paper>
        </Paper>
      </Box>
    </>
  );
};

export default Cart;
