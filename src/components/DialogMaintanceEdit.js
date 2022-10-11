import React, { useState, useEffect } from 'react';
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
    const [itemCod, setItemCod] = useState(data.codProd);
    const [itemNom, setItemNom] = useState(data.nombreProducto ? data.nombreProducto : "");
    const [itemDes, setItemDes] = useState(data.descripcion ? data.descripcion : "");
    const [itemStk, setItemStk] = useState(data.stock ? data.stock : 0);
    const [itemPb, setItemPb] = useState(data.precioBase ? data.precioBase : 0);
    const [itemPv, setItemPv] = useState(data.precioVenta ? data.precioVenta : 0);
    const [itemBr, setItemBr] = useState(data.marca ? data.marca : 0);
    const [itemMd, setItemMd] = useState(data.modelo ? data.modelo : 0);
    const [itemUb, setItemUb] = useState(data.ubicacion ? data.ubicacion : 0);

    const handleClose = () => {
        set(false);
    }

    const handleCodPr = (e) => {
        setItemCod(e.target.value)
    }

    const handlePr = (e) => {
        setItemNom(e.target.value)
    }

    const handleDes = (e) => {
        setItemDes(e.target.value)
    }

    const handleCant = (e) => {
        setItemStk(e.target.value)
    }

    const handlePb = (e) => {
        setItemPb(e.target.value)
    }

    const handlePv = (e) => {
        setItemPv(e.target.value)
    }

    const handleModel = (e) => {
        setItemMd((itemsModels.filter((p) => p.descripcion === e.target.value))[0].id);
    }

    const handleBrand = (e) => {
        setItemBr((itemsModels.filter((p) => p.descripcion === e.target.value))[0].id);
    }

    const handleUbicacion = (e) => {
        setItemUb(e.target.value)
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

    const handleEdit = () => {
        let pr = {
            "codProd": itemCod,
            "nombreProducto": itemNom,
            "descripcion": itemDes,
            "idMarca": itemBr,
            "idModelo": itemMd,
            "idUnidadMedida": 0,
            "idTienda": 1,
            "precioBase": itemPb,
            "imagen": "string",
            "rutaImagen": "string",
            "idProducto": data.idProducto,
            "cantidad": itemStk,
            "precioVenta": itemPv,
            "ubicacion": itemUb
        }
        // Editar producto
        
            // if (data) {
            //     fetch("http://appdemo1.solarc.pe/api/Productos/ActualizarProducto", {
            //         method: "POST", // or 'PUT'
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(pr),
            //     })
            //         .then((response) => response.json())
            //         .then((data) => {
            //             console.log(data)
            //         })
            //         .catch((error) => {
            //             console.error("Error:", error);
            //         });
            // }
            console.log(pr)
        
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
                                    onChange={handleCodPr}
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
                                    onChange={handlePr}
                                />
                                <TextField
                                    sx={{ width: "62ch" }}
                                    multiline
                                    label="Descripción"
                                    defaultValue={
                                        data.descripcion ? data.descripcion : ""
                                    }
                                    margin="dense"
                                    onChange={handleDes}
                                />
                                <TextField
                                    sx={{ width: "20ch" }}
                                    label="Cantidad"
                                    value={data.stock ? data.stock : 0}
                                    margin="dense"
                                    onChange={handleCant}
                                />
                                <TextField
                                    sx={{ m: 1, width: "20ch" }}
                                    label="Precio Base"
                                    value={
                                        data.precioBase ? data.precioBase : 0
                                    }
                                    margin="dense"
                                    onChange={handlePb}
                                />
                                <TextField
                                    sx={{ width: "20ch" }}
                                    label="Precio Venta"
                                    value={
                                        data.precioVenta ? data.precioVenta : 0
                                    }
                                    margin="dense"
                                    onChange={handlePv}
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
                                            defaultValue={data.marca}
                                            onChange={handleBrand}
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
                                            defaultValue={data.modelo}
                                            onChange={handleModel}
                                        >
                                            {itemsModels.map((model) => (
                                                <MenuItem data-value={model.id} key={model.id} value={model.descripcion}>
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
                                    onChange={handleUbicacion}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleEdit}>Modificar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogMaintanceEdit