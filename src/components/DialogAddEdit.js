import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import defaultImage from "../image/default-image.jpg";
import LoadingSpinner from "../components/LoadingSpinner";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAddEdit = ({ info, infoEdit, setAction, action }) => {
    const [prod, setProd] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        if (info) {
            setPrice(info.precioVenta)
        }
    }, [info])

    const handleClose = () => {
        setAction(false);
        setQuantity("");
        setProd(info);
    };

    const handleQuantity = (event) => {
        const newProduct = info;
        if (event.target.value > 0) {
            newProduct.cantidad = parseInt(event.target.value);
            setProd(newProduct);
            setQuantity(event.target.value);
        }
    };

    const handleSave = (params) => {
        params.precioVenta = price;
        infoEdit(params);
        setQuantity("");
        setAction(false);
    }

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
                                value={quantity}
                                onChange={handleQuantity}
                            />
                            <TextField
                                sx={{ m: 1, width: "20ch" }}
                                label="Precio Venta"
                                margin="dense"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                    <Button onClick={() => handleSave(info)}>Agregar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogAddEdit;
