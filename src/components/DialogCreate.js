import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import addImage from "../image/add-image.jpg";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCreate = ({ open, setOpen }) => {
    const [itemsModels, setItemsModels] = useState([]);
    const [itemsBrands, setItemsBrands] = useState([]);
    const [itemBr, setItemBr] = useState();
    const [itemMd, setItemMd] = useState();

    useEffect(() => {
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
    }, [])

    const handleClose = () => {
        setOpen(false);
    }

    const handleBrand = (e) => {
        setItemBr((itemsBrands.filter((p) => p.descripcion === e.target.value))[0].id);
    }

    const handleModel = (e) => {
        setItemMd((itemsModels.filter((p) => p.descripcion === e.target.value))[0].id);
    }

    const handleCreate = () => {
        let pr = {

        }
    }

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
                <DialogTitle>Agregar Producto</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <img
                                    width={250}
                                    src={addImage}
                                    style={{ border: 'black 2px solid', borderRadius: '20px' }}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    sx={{ width: "30ch" }}
                                    label="Código Producto"
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ m: 1, width: "31ch" }}
                                    label="Producto"
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ width: "62ch" }}
                                    multiline
                                    label="Descripción"
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ width: "20ch" }}
                                    label="Cantidad"
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ m: 1, width: "20ch" }}
                                    label="Precio Base"
                                    margin="dense"
                                />
                                <TextField
                                    sx={{ width: "20ch" }}
                                    label="Precio Venta"
                                    margin="dense"
                                />
                                <IconButton sx={{ m: 1 }} color="primary" aria-label="upload picture" component="label" size="large">
                                    <input hidden accept="image/*" type="file" />
                                    <PhotoCamera />
                                </IconButton>
                                <FormControl sx={{ m: 1, width: "26ch" }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Marca
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Marca"
                                        onChange={handleBrand}
                                    >
                                        {itemsBrands.map((brand) => (
                                            <MenuItem key={brand.id} value={brand.descripcion}>
                                                {brand.descripcion}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: "25ch" }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Modelo
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Modelo"
                                        onChange={handleModel}
                                    >
                                        {itemsModels.map((model) => (
                                            <MenuItem data-value={model.id} key={model.id} value={model.descripcion}>
                                                {model.descripcion}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{ m: 1, width: "41ch" }}
                                    margin="dense"
                                    id="outlined-disabled"
                                    label="Ubicación"
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCreate}>Modificar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogCreate