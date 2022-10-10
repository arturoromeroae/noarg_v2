import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Slide from "@mui/material/Slide";
import defaultImage from "../image/default-image.jpg";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMaintanceEdit = ({ data, action, set }) => {
    const [itemsModels, setItemsModels] = useState([]);
    const [itemsBrands, setItemsBrands] = useState([]);

    const handleClose = () => {
        set(false);
    }

    useState(() => {
        fetch("http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=modelo")
            .then((res) => res.json())
            .then(
                (result) => {
                    setItemsModels(result.data);
                },
                (error) => {
                    console.log(error);
                }
            );

        fetch("http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=marca")
            .then((res) => res.json())
            .then(
                (result) => {
                    setItemsBrands(result.data);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, [])

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
                                    alt={
                                        data.nombreProducto
                                            ? data.nombreProducto
                                            : "Imagen por defeto"
                                    }
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    sx={{ width: "30ch" }}
                                    label="Código Producto"
                                    value={data.codProd ? data.codProd : 0}
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ m: 1, width: "31ch" }}
                                    label="Producto"
                                    value={
                                        data.nombreProducto
                                            ? data.nombreProducto
                                            : ""
                                    }
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ width: "62ch" }}
                                    multiline
                                    label="Descripción"
                                    value={
                                        data.descripcion ? data.descripcion : ""
                                    }
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ width: "20ch" }}
                                    label="Cantidad"
                                    value={data.stock ? data.stock : 0}
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ m: 1, width: "20ch" }}
                                    label="Precio Base"
                                    value={
                                        data.precioBase ? data.precioBase : 0
                                    }
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ width: "20ch" }}
                                    label="Precio Venta"
                                    value={
                                        data.precioVenta ? data.precioVenta : 0
                                    }
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ width: "41ch" }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    type="file"
                                    inputProps={{
                                        multiple: true,
                                    }}
                                />
                                <FormControl sx={{ ml: 1, width: "20ch" }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Marca
                                    </InputLabel>
                                    {data.marca && (
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Marca"
                                            value={data.marca}
                                        >
                                            {itemsBrands.map((brand) => (
                                                <MenuItem key={brand.id} value={brand.descripcion}>
                                                    {brand.descripcion}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </FormControl>
                                <FormControl sx={{ my: 1, width: "20ch" }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Modelo
                                    </InputLabel>
                                    {data.modelo && (
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Modelo"
                                            value={data.modelo}
                                        >
                                            {itemsModels.map((model) => (
                                                <MenuItem key={model.id} value={model.descripcion}>
                                                    {model.descripcion}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </FormControl>
                                <TextField
                                    sx={{ m: 1, width: "41ch" }}
                                    margin="dense"
                                    id="outlined-disabled"
                                    label="Ubicación"
                                    value={data.ubicacion ? data.ubicacion : 0}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Modificar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogMaintanceEdit