import React, { useState, useEffect } from "react";
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
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAlmacenEdit = ({
  open,
  set,
  data,
  actionAlert,
  actionAlertError,
  text,
}) => {
  const [load, setLoad] = useState(false);
  const [itemsModels, setItemsModels] = useState([]);
  const [itemsBrands, setItemsBrands] = useState([]);
  const [itemBr, setItemBr] = useState();
  const [itemMd, setItemMd] = useState();
  const [itemStk, setItemStk] = useState();
  const [itemPb, setItemPb] = useState();
  const [stock, setStock] = useState();
  const [base, setBase] = useState();

  const handleCant = (e) => {
    setItemStk(parseInt(e.target.value));
    setStock(stock + parseInt(e.target.value));
  };

  const handlePb = (e) => {
    setItemPb(parseFloat(e.target.value));
    itemPb &&
      setBase(
        (
          (data.precioBase * parseFloat(e.target.value)) / 100 +
          data.precioBase
        ).toFixed(2)
      );
    !e.target.value && setBase(data.precioBase);
  };

  const handleClose = () => {
    set(false);
  };

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

  useEffect(() => {
    if (open) {
      itemsModels &&
        setItemMd(
          itemsModels.filter((p) => p.descripcion === data.modelo)[0].codigo
        );

      itemsBrands &&
        setItemBr(
          itemsBrands.filter((p) => p.descripcion === data.marca)[0].codigo
        );

      data && (setStock(data.stock), setBase(data.precioBase));
    }
  }, [open]);

  const handleEdit = () => {
    text("¡Se modificó el producto correctamente!");
    let pr = {
      codProd: data.codProd,
      nombreProducto: data.nombreProducto,
      descripcion: data.descripcion,
      idMarca: itemBr,
      idModelo: itemMd,
      idUnidadMedida: 1,
      idTienda: 1,
      precioBase: base,
      imagen: "string",
      rutaImagen: "string",
      idProducto: data.idProducto,
      cantidad: stock,
      precioVenta: data.precioVenta,
      ubicacion: data.ubicacion,
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
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography
              variant="h4"
              sx={{ textAlign: "center", m: 2 }}
              color="black"
            >
              {data.nombreProducto}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <img
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = defaultImage;
                  }}
                  width={250}
                  src={`https://appdemo1.solarc.pe/imagenes/${data.codProd}.JPG`}
                  alt={data.nombreProducto}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Código Producto"
                  value={data.codProd ? data.codProd : 0}
                  margin="dense"
                  disabled
                />
                <TextField
                  fullWidth
                  label="Cantidad"
                  value={data.stock ? data.stock : 0}
                  margin="dense"
                  disabled
                />
                <TextField
                  fullWidth
                  label="Precio Base"
                  value={data.precioBase ? data.precioBase : 0}
                  margin="dense"
                  disabled
                />
                <TextField
                  fullWidth
                  label="Aumento de stock"
                  margin="dense"
                  onChange={handleCant}
                  value={itemStk}
                />
                <TextField
                  label="Aumento sobre el precio base"
                  id="outlined-start-adornment"
                  margin="dense"
                  onChange={handlePb}
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
                  value={base}
                  InputLabelProps={{
                    shrink: true,
                  }}
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

DialogAlmacenEdit.propTypes = {
  open: PropTypes.bool,
  set: PropTypes.bool,
  data: PropTypes.array,
  text: PropTypes.string,
  actionAlert: PropTypes.bool,
  actionAlertError: PropTypes.bool,
};

export default DialogAlmacenEdit;
