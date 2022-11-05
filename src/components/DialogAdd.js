import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import defaultImage from "../image/default-image.jpg";
import ProductsAutoCode from "./ProductsAutoCode";
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAdd = ({ addProduct, action }) => {
  const [prod, setProd] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  let getSellInfo = Cookies.get("sell");
  let productsCookies = getSellInfo && JSON.parse(getSellInfo);

  useEffect(() => {
    if (prod) {
      setPrice(prod.precioVenta);
    }
  }, [prod]);

  const handleClose = () => {
    addProduct(false);
    setProd("");
    setPrice("");
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleSaveProd = () => {
    prod.precioVenta = price;
    const foundIndex = productsCookies.findIndex(
      (p) => p.idProducto === prod.idProducto
    );

    if (foundIndex === -1) {
      if (!quantity) {
        prod.cantidad = 1;
      } else {
        prod.cantidad = parseInt(quantity);
      }
    } else {
      if (!quantity) {
        productsCookies[foundIndex].cantidad++;
      } else {
        productsCookies[foundIndex].cantidad += parseInt(quantity);
      }
    }

    if (prod && foundIndex === -1) {
      Cookies.set(
        "sell",
        JSON.stringify([...productsCookies, prod]).toString(),
        {
          expires: 0.3,
        }
      );
      addProduct(false);
      setProd("");
      setPrice("");
      setQuantity("");
    } else {
      Cookies.set("sell", JSON.stringify([...productsCookies]).toString(), {
        expires: 0.3,
      });
      addProduct(false);
      setProd("");
      setPrice("");
      setQuantity("");
    }
  };

  return (
    <div>
      <Dialog
        open={action}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Agregar productos a la venta
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = defaultImage;
                }}
                alt="Logo NOARG"
                width={250}
                src={
                  prod
                    ? `http://appdemo1.solarc.pe/imagenes/${prod.codProd}.JPG`
                    : defaultImage
                }
              />
            </Grid>
            <Grid item xs={8}>
              <div style={{ display: "flex" }}>
                <ProductsAutoCode pr={setProd} getPr={prod} />
                <TextField
                sx={{ m: 1, width: "35ch" }}
                multiline
                label="Nombre del Producto"
                margin="dense"
                value={prod ? prod.nombreProducto : ""}
                disabled
              />
              </div>
              <TextField
                sx={{ m: 1, width: "62ch" }}
                multiline
                label="Descripción"
                margin="dense"
                value={prod ? prod.descripcion : ""}
                disabled
              />
              <TextField
                sx={{ m: 1, width: "15ch" }}
                label="Cantidad"
                margin="dense"
                value={quantity}
                onChange={handleQuantity}
              />
              <TextField
                sx={{ m: 1, width: "15ch" }}
                label="Precio Base"
                margin="dense"
                value={prod ? prod.precioBase : ""}
                disabled
              />
              <TextField
                sx={{ m: 1, width: "20ch" }}
                label="Precio Venta"
                margin="dense"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{ m: 1, width: "20ch" }}
                margin="dense"
                id="outlined-disabled"
                label="Ubicación"
                value={prod ? prod.ubicacion : ""}
                disabled
              />
              <TextField
                sx={{ m: 1, width: "15ch" }}
                margin="dense"
                id="outlined-disabled"
                label="Modelo"
                value={prod ? prod.modelo : ""}
                disabled
              />
              <TextField
                sx={{ m: 1, width: "15ch" }}
                margin="dense"
                id="outlined-disabled"
                label="Marca"
                value={prod ? prod.marca : ""}
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveProd}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogAdd.propTypes = {
  addProduct: PropTypes.any,
  action: PropTypes.bool
};

export default DialogAdd;
