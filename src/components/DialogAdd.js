import React, { useState } from "react";
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
import ProductsAuto from "../components/ProductsAuto";
import ProductsAutoCode from "./ProductsAutoCode";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAdd = ({ addProduct, action }) => {
  const [prod, setProd] = useState();

  let getSellInfo = Cookies.get("sell");
  let productsCookies = getSellInfo && JSON.parse(getSellInfo);

  const handleClose = () => {
    addProduct(false);
    setProd("");
  };

  const handleQuantity = (event) => {
    prod.cantidad = event.target.value;
  };

  const handleSaveProd = () => {
    if (prod) {
      Cookies.set(
        "sell",
        JSON.stringify([...productsCookies, prod]).toString(),
        {
          expires: 0.3,
        }
      );
      addProduct(false);
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
                <ProductsAuto pr={setProd} getPr={prod} />
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
                required
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
                value={prod ? prod.precioVenta : ""}
                disabled
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
          <Button color="error" onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSaveProd}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogAdd;
