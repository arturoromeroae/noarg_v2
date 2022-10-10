import React from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import defaultImage from "../image/default-image.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAlmacenEdit = ({ open, set, data }) => {
    const handleClose = () => {
        set(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="md"
            >
                <DialogTitle>{data.nombreProducto}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <img
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = defaultImage;
                                    }}
                                    width={250}
                                    src={`http://appdemo1.solarc.pe/imagenes/${data.codProd}.JPG`}
                                    alt={data.nombreProducto}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    label="Código Producto"
                                    value={data.codProd ? data.codProd : 0}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth
                                    label="Cantidad"
                                    value={data.stock ? data.stock : 0}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth
                                    label="Precio Base"
                                    value={
                                        data.precioBase ? data.precioBase : 0
                                    }
                                    margin="dense"
                                />
                                <TextField
                                    disabled
                                    fullWidth
                                    label="Aumento de stock"
                                    margin="dense"
                                />
                                <TextField
                                    label="Aumento sobre el precio base"
                                    id="outlined-start-adornment"
                                    margin="dense"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">%</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    disabled
                                    sx={{ m: 1, width: "25ch" }}
                                    margin="dense"
                                    id="outlined-disabled"
                                    label="Total"
                                    defaultValue="0"
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogAlmacenEdit