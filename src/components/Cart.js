import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import Divider from "@mui/material/Divider";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";
import NumberPicker from "./NumberPicker";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cookies from "js-cookie";

const Cart = ({ dataCart, dataCount, dataId }) => {
  const navigate = useNavigate();
  const [dense, setDense] = useState(false);
  const [products, setProducts] = useState([]);
  const listProducts = [...products];
  const [price, setPrice] = useState([]);
  const listPrice = [...price];

  let getSellInfo = Cookies.get("sell");
  let productsCookies = getSellInfo && JSON.parse(getSellInfo);
  if (productsCookies) {
    return <Navigate to="/completar-venta" replace />;
  }

  listProducts.map((p) => listPrice.push(p.precioVenta));
  let total = listPrice.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (dataCart != undefined) {
      listProducts.push(dataCart);
      setProducts(listProducts);
    }
  }, [dataCount]);

  const handleDelete = (index) => {
    listProducts.splice(index, 1);
    setProducts(listProducts);
  };

  const handleSaveProd = () => {
    if (products.length > 0) {
      Cookies.set("sell", JSON.stringify(products).toString(), {
        expires: 0.3,
      });
      navigate("/completar-venta");
    }
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
              {Object.keys(products).length > 0 &&
                products.map((value, index) => (
                  <>
                    <Divider />
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          aria-label="deleteProduct"
                          color="error"
                          size="large"
                          onClick={() => handleDelete(index)}
                        >
                          <DeleteForeverTwoToneIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      <div>
                        <p style={{ width: "220px" }}>
                          <strong>Cod:</strong> {value.codProd} <br />
                          <strong>Prod:</strong> {value.nombreProducto} <br />
                          <strong>Precio:</strong> {value.precioVenta}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <NumberPicker />
                        </div>
                      </div>
                    </ListItem>
                    <Divider />
                  </>
                ))}
            </List>
          </div>
          <Paper sx={{ pl: 0.5, textAlign: "center" }}>
            <h2>Total: S/{total.toFixed(2)}</h2>
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
