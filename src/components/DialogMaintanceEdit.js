import React, { useState, useEffect } from "react";
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
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMaintanceEdit = ({
  data,
  action,
  set,
  actionAlert,
  actionAlertError,
  text,
}) => {
  const [dataProducts, setDataProducts] = useState([]);
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
  const [itemImg, setItemImg] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (data) {
      setDataProducts(data);
      setItemCod(data.codProd);
      setItemNom(data.nombreProducto);
      setItemDes(data.descripcion);
      setItemStk(data.stock);
      setItemPb(data.precioBase);
      setItemPv(data.precioVenta);
      setItemUb(data.ubicacion);
      itemsModels &&
        data.modelo &&
        setItemMd(
          itemsModels.filter((p) => p.descripcion === data.modelo)[0].codigo
        );
      itemsBrands &&
        data.marca &&
        setItemBr(
          itemsBrands.filter((p) => p.descripcion === data.marca)[0].codigo
        );

      !data.modelo && setItemMd(0);
      !data.marca && setItemBr(0);
    }
  }, [data]);

  const handleClose = () => {
    set(false);
    setDataProducts("");
  };

  const handleCodPr = (e) => {
    setItemCod(e.target.value);
  };

  const handlePr = (e) => {
    setItemNom(e.target.value);
  };

  const handleDes = (e) => {
    setItemDes(e.target.value);
  };

  const handleCant = (e) => {
    setItemStk(e.target.value);
  };

  const handlePb = (e) => {
    setItemPb(e.target.value);
  };

  const handlePv = (e) => {
    setItemPv(e.target.value);
  };

  const handleModel = (e) => {
    itemsModels &&
      setItemMd(
        itemsModels.filter((p) => p.descripcion === e.target.value)[0].codigo
      );
  };

  const handleBrand = (e) => {
    itemsBrands &&
      setItemBr(
        itemsBrands.filter((p) => p.descripcion === e.target.value)[0].codigo
      );
  };

  const handleUbicacion = (e) => {
    setItemUb(e.target.value);
  };

  const handleImage = (e) => {
    setItemImg(e.target.files[0]);
  };

  // Formulario editar producto
  let formdata = new FormData();
  if (itemImg) {
    formdata.append("FileData", itemImg);
    formdata.append("CodigoProducto", itemCod);
  }

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(
      "https://appdemo1.solarc.pe/api/Productos/UploadFilePNG",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, [itemImg])

  useEffect(() => {
    fetch("https://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=modelo")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsModels(result.data);
        },
        (error) => {
          console.log(error);
        }
      );

    fetch("https://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=marca")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsBrands(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const handleEdit = () => {
    text("¡Se modificó el producto correctamente!");
    let pr = {
      codProd: itemCod,
      nombreProducto: itemNom,
      descripcion: itemDes,
      idMarca: itemBr,
      idModelo: itemMd,
      idUnidadMedida: 0,
      idTienda: 1,
      precioBase: parseFloat(itemPb),
      imagen: "string",
      rutaImagen: "string",
      idProducto: data.idProducto,
      cantidad: parseInt(itemStk),
      precioVenta: parseFloat(itemPv),
      ubicacion: itemUb,
    };
    // Editar producto

    if (pr) {
      setLoad(true);
      fetch("https://appdemo1.solarc.pe/api/Productos/ActualizarProducto", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pr),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoad(false);
          actionAlert(true);
          set(false);
          setDataProducts("");
          console.log(data);
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
        open={action}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >
        <DialogTitle>{dataProducts.nombreProducto}</DialogTitle>
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
                  src={`https://appdemo1.solarc.pe/imagenes/${dataProducts.codProd}.JPG`}
                  alt={
                    dataProducts.nombreProducto
                      ? dataProducts.nombreProducto
                      : "Imagen por defeto"
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  sx={{ width: "30ch" }}
                  label="Código Producto"
                  value={itemCod}
                  margin="dense"
                  onChange={handleCodPr}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  sx={{ m: 1, width: "31ch" }}
                  label="Producto"
                  value={itemNom}
                  margin="dense"
                  onChange={handlePr}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  sx={{ width: "62ch" }}
                  multiline
                  label="Descripción"
                  value={itemDes}
                  margin="dense"
                  onChange={handleDes}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  sx={{ width: "20ch" }}
                  label="Cantidad"
                  value={itemStk}
                  margin="dense"
                  onChange={handleCant}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  sx={{ m: 1, width: "20ch" }}
                  label="Precio Base"
                  value={itemPb}
                  margin="dense"
                  onChange={handlePb}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  sx={{ width: "20ch" }}
                  label="Precio Venta"
                  value={itemPv}
                  margin="dense"
                  onChange={handlePv}
                  InputLabelProps={{ shrink: true }}
                />
                <IconButton
                  sx={{ m: 1 }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  size="large"
                >
                  <input hidden accept=".jpg" type="file" onChange={handleImage} />
                  <PhotoCamera />
                </IconButton>
                <FormControl sx={{ m: 1, width: "26ch" }}>
                  <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                  {dataProducts.marca && (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Marca"
                      defaultValue={dataProducts.marca}
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
                <FormControl sx={{ m: 1, width: "26ch" }}>
                  <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
                  {dataProducts.modelo && (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Modelo"
                      defaultValue={dataProducts.modelo}
                      onChange={handleModel}
                    >
                      {itemsModels.map((model) => (
                        <MenuItem
                          data-value={model.id}
                          key={model.id}
                          value={model.descripcion}
                        >
                          {model.descripcion}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  {!dataProducts.modelo && (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Modelo"
                      onChange={handleModel}
                    >
                      {itemsModels.map((model) => (
                        <MenuItem
                          data-value={model.id}
                          key={model.id}
                          value={model.descripcion}
                        >
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
                  value={itemUb}
                  onChange={handleUbicacion}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" disabled={load} onClick={handleClose}>
            Cancelar
          </Button>
          {!load ? (
            <Button onClick={handleEdit}>Modificar</Button>
          ) : (
            <LoadingButton loading></LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogMaintanceEdit.propTypes = {
  data: PropTypes.array,
  action: PropTypes.bool,
  set: PropTypes.bool,
  actionAlert: PropTypes.bool,
  actionAlertError: PropTypes.bool,
  text: PropTypes.string,
};

export default DialogMaintanceEdit;
