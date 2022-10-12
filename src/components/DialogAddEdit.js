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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAddEdit = ({ info, setAction, action }) => {
    const [prod, setProd] = useState();

    let getSellInfo = Cookies.get("sell");
    let productsCookies = getSellInfo && JSON.parse(getSellInfo);

    const handleClose = () => {
        setAction(false);
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
                                    info
                                        ? `http://appdemo1.solarc.pe/imagenes/${info.codProd}.JPG`
                                        : defaultImage
                                }
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <div style={{ display: "flex" }}>
                                <TextField
                                    sx={{ m: 1, width: "30ch" }}
                                    label="Código Producto"
                                    margin="dense"
                                    value={info ? info.codProd : ""}
                                    disabled
                                />
                                <TextField
                                    sx={{ m: 1, width: "30ch" }}
                                    label="Código Producto"
                                    margin="dense"
                                    value={info ? info.nombreProducto : ""}
                                    disabled
                                />
                            </div>
                            <TextField
                                sx={{ m: 1, width: "62ch" }}
                                multiline
                                label="Descripción"
                                margin="dense"
                                value={info ? info.descripcion : ""}
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
                                sx={{ m: 1, width: "20ch" }}
                                label="Precio Venta"
                                margin="dense"
                                defaultValue={info && info.precioVenta}
                            />
                            <TextField
                                sx={{ m: 1, width: "20ch" }}
                                margin="dense"
                                id="outlined-disabled"
                                label="Ubicación"
                                value={info ? info.ubicacion : ""}
                                disabled
                            />
                            <TextField
                                sx={{ m: 1, width: "15ch" }}
                                margin="dense"
                                id="outlined-disabled"
                                label="Modelo"
                                value={info ? info.modelo : ""}
                                disabled
                            />
                            <TextField
                                sx={{ m: 1, width: "15ch" }}
                                margin="dense"
                                id="outlined-disabled"
                                label="Marca"
                                value={info ? info.marca : ""}
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

export default DialogAddEdit;
