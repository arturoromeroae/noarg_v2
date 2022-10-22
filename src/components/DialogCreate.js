import React, { useEffect, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCreate = ({ open, setOpen, actionAlert, actionAlertError }) => {
  const [itemsModels, setItemsModels] = useState([]);
  const [itemsBrands, setItemsBrands] = useState([]);
  const [itemCod, setItemCod] = useState();
  const [itemNom, setItemNom] = useState();
  const [itemDes, setItemDes] = useState();
  const [itemStk, setItemStk] = useState();
  const [itemPb, setItemPb] = useState();
  const [itemPv, setItemPv] = useState();
  const [itemBr, setItemBr] = useState();
  const [itemMd, setItemMd] = useState();
  const [itemUb, setItemUb] = useState();
  const [errorCd, setErrorCd] = useState(false);
  const [errorNm, setErrorNm] = useState(false);
  const [errorBr, setErrorBr] = useState(false);
  const [errorMd, setErrorMd] = useState(false);
  const [errorPb, setErrorPb] = useState(false);
  const [errorPv, setErrorPv] = useState(false);
  const [errorStk, setErrorStk] = useState(false);
  //const [loading, setLoading] = useState(false);

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
  }, []);

  const handleClose = () => {
    setOpen(false);
    setItemCod("");
    setItemNom("");
    setItemDes("");
    setItemStk("");
    setItemPb("");
    setItemPv("");
    setItemBr("");
    setItemMd("");
    setItemUb("");
  };

  const handleCodPr = (e) => {
    setItemCod(e.target.value);
    setErrorCd(false);
  };

  const handlePr = (e) => {
    setItemNom(e.target.value);
    setErrorNm(false);
  };

  const handleDes = (e) => {
    setItemDes(e.target.value);
  };

  const handleCant = (e) => {
    setItemStk(e.target.value);
    setErrorStk(false);
  };

  const handlePb = (e) => {
    setItemPb(e.target.value);
    setErrorPb(false);
  };

  const handlePv = (e) => {
    setItemPv(e.target.value);
    setErrorPv(false);
  };

  const handleBrand = (e) => {
    setItemBr(
      itemsBrands.filter((p) => p.descripcion === e.target.value)[0].codigo
    );
    setErrorBr(false);
  };

  const handleModel = (e) => {
    setItemMd(
      itemsModels.filter((p) => p.descripcion === e.target.value)[0].codigo
    );
    setErrorMd(false);
  };

  const handleUbicacion = (e) => {
    setItemUb(e.target.value);
  };

  const handleCreate = () => {
    if (!itemCod) {
      setErrorCd(true);
    } else if (!itemNom) {
      setErrorNm(true);
    } else if (!itemStk) {
      setErrorStk(true);
    } else if (!itemPb) {
      setErrorPb(true);
    } else if (!itemPv) {
      setErrorPv(true);
    } else if (!itemBr) {
      setErrorBr(true);
    } else if (!itemMd) {
      setErrorMd(true);
    }

    let pr = {
      codProd: itemCod,
      nombreProducto: itemNom,
      descripcion: itemDes,
      idMarca: parseInt(itemBr),
      idModelo: parseInt(itemMd),
      idUnidadMedida: 1,
      idTienda: 1,
      precioBase: parseFloat(itemPb),
      imagen: "string",
      rutaImagen: "string",
      idProducto: 0,
      cantidad: parseFloat(itemStk),
      precioVenta: parseFloat(itemPv),
      ubicacion: itemUb,
    };

    if (
      pr &&
      itemCod &&
      itemNom &&
      itemPb &&
      itemStk &&
      itemPv &&
      itemBr &&
      itemMd
    ) {
      //setLoading(true);
      console.log(pr);
      fetch("http://appdemo1.solarc.pe/api/Productos/Productos", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pr),
      })
        .then((response) => response.json())
        .then(() => {
          //setLoading(false);
          actionAlert(true);
          setOpen(false);
          setItemCod("");
          setItemNom("");
          setItemDes("");
          setItemStk("");
          setItemPb("");
          setItemPv("");
          setItemBr("");
          setItemMd("");
          setItemUb("");
        })
        .catch((error) => {
          console.error("Error:", error);
          actionAlertError(true);
        });
    }
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
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <p style={{ textAlign: "center" }}>Los campos con * son requeridos</p>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <img
                  width={250}
                  src={addImage}
                  style={{ border: "black 2px solid", borderRadius: "20px" }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  sx={{ m: 1, width: "25ch" }}
                  label="Código Producto"
                  margin="dense"
                  value={itemCod}
                  error={errorCd}
                  onChange={handleCodPr}
                  required
                />
                <TextField
                  sx={{ m: 1, width: "34ch" }}
                  label="Producto"
                  margin="dense"
                  value={itemNom}
                  error={errorNm}
                  onChange={handlePr}
                  required
                />
                <TextField
                  sx={{ m: 1, width: "62ch" }}
                  multiline
                  label="Descripción"
                  margin="dense"
                  value={itemDes}
                  onChange={handleDes}
                />
                <TextField
                  sx={{ m: 1, width: "17ch" }}
                  label="Cantidad"
                  margin="dense"
                  value={itemStk}
                  error={errorStk}
                  onChange={handleCant}
                  required
                />
                <TextField
                  sx={{ m: 1, width: "20ch" }}
                  label="Precio Base"
                  margin="dense"
                  value={itemPb}
                  error={errorPb}
                  onChange={handlePb}
                  required
                />
                <TextField
                  sx={{ m: 1, width: "20ch" }}
                  label="Precio Venta"
                  margin="dense"
                  value={itemPv}
                  error={errorPv}
                  onChange={handlePv}
                  required
                />
                <br />
                <IconButton
                  sx={{ m: 1 }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  size="large"
                >
                  <input hidden accept=".jpg" type="file" />
                  <PhotoCamera />
                </IconButton>
                <FormControl sx={{ m: 1, width: "26ch" }}>
                  <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Marca"
                    value={itemBr}
                    error={errorBr}
                    onChange={handleBrand}
                    required
                  >
                    {itemsBrands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.descripcion}>
                        {brand.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: "26ch" }}>
                  <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Modelo"
                    value={itemMd}
                    error={errorMd}
                    onChange={handleModel}
                    required
                  >
                    {itemsModels.map((model) => (
                      <MenuItem key={model.id} value={model.descripcion}>
                        {model.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  sx={{ m: 1 }}
                  margin="dense"
                  id="outlined-disabled"
                  label="Ubicación"
                  value={itemUb}
                  onChange={handleUbicacion}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleCreate}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogCreate.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
  actionAlert: PropTypes.bool,
  actionAlertError: PropTypes.bool,
  loading: PropTypes.bool,
};

export default DialogCreate;
