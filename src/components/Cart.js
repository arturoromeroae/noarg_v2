import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import Divider from "@mui/material/Divider";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cookies from "js-cookie";
import styled from "styled-components";

const NumberContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NumberInput = styled.input`
  border: 0;
  width: 30px;
  height: 30px;
  font-family: "Roboto";
  font-weight: 500;
  text-align: center;
  background-color: #f5f5ef;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
`;

const Cart = ({ dataCart, dataCount, dataId }) => {
  const navigate = useNavigate();
  const [dense, setDense] = useState(false);
  const [products, setProducts] = useState([]);
  const listProducts = [...products];
  const [price, setPrice] = useState([]);
  const listPrice = [...price];
  const [number, setNumber] = useState(1);

  const handleClickPlus = (params) => {
    if (params) setNumber(params + 1);
    dataCart.cantidad = params + 1;
  };

  const handleClickMinus = () => {
    if (number > 1) setNumber(number - 1);
    dataCart.cantidad = number;
  };

  let getSellInfo = Cookies.get("sell");
  let productsCookies = getSellInfo && JSON.parse(getSellInfo);
  if (productsCookies) {
    return <Navigate to="/completar-venta" replace />;
  }

  listProducts.map((p) => listPrice.push(p.precioVenta));
  let total = listPrice.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (dataCart !== undefined) {
      if (!dataCart.cantidad) dataCart.cantidad = 1;
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

  console.log(products);

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
                    <Divider key={"divider-" + index} />
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                        key={"delete-" + index}
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
                          <div>
                            <Typography variant="h7">Cantidad</Typography>
                            <NumberContainer key={"number-" + index}>
                              <IconButton
                                key={"buttonMinus-" + index}
                                aria-label="minus"
                                onClick={handleClickMinus}
                                color="error"
                                size="small"
                              >
                                <RemoveCircleTwoToneIcon fontSize="inherit" />
                              </IconButton>
                              <NumberInput
                                key={"input-" + index}
                                disabled
                                value={value.cantidad}
                              />
                              <IconButton
                                key={"buttonPlus-" + index}
                                aria-label="plus"
                                onClick={() => handleClickPlus(value.cantidad)}
                                color="primary"
                                size="small"
                              >
                                <AddCircleTwoToneIcon fontSize="inherit" />
                              </IconButton>
                            </NumberContainer>
                          </div>
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
