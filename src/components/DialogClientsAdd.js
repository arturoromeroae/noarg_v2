import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import defaultImage from "../image/client.png";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogClientsAdd = ({ close, action }) => {
  const [tipoDocumento, setTipoDocumento] = useState();
  const [nroDocumento, setNroDocumento] = useState();
  const [nombres, setNombres] = useState();
  const [telefono, setTelefono] = useState();
  const [email, setEmail] = useState();
  const [direccion, setDireccion] = useState();
  const [referencia, setReferencia] = useState();
  const [add, setAdd] = useState();

  const handleClose = () => {
    close(false);
    setAdd(false);
    setTipoDocumento(0);
    setNroDocumento("");
    setNombres("");
    setTelefono("");
    setEmail("");
    setDireccion("");
    setReferencia("");
  };

  const handleClientType = (e) => {
    setTipoDocumento(e.target.value);
  };

  const handleChangeDocumento = (e) => {
    setNroDocumento(e.target.value);
  };

  const handleChangeNombres = (e) => {
    setNombres(e.target.value);
  };

  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };

  const handleChangeReferencia = (e) => {
    setReferencia(e.target.value);
  };

  const handleAdd = () => {
    setAdd(true);
  };

  // Actualizar cliente
  useEffect(() => {
    const infoClient = {
      idCliente: 0,
      idTipoCliente: 0,
      rucCliente: tipoDocumento === 1 ? nroDocumento : "",
      razonSocial: tipoDocumento === 1 ? nombres : "",
      direccion: direccion ? direccion : "",
      dni: tipoDocumento === 2 ? nroDocumento : "",
      apellidos: "string",
      nombres: nombres,
      email: email ? email : "",
      teléfono: telefono ? telefono : "",
      referencia: referencia ? referencia : "",
    };

    if (infoClient && add === true) {
      fetch("http://appdemo1.solarc.pe/api/Cliente/Registrar%20Clientes", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoClient),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          close(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [add]);

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
        <DialogTitle sx={{ textAlign: "center" }}>Agregar Cliente</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = defaultImage;
                }}
                alt="Logo cliente"
                width={250}
                src={defaultImage}
              />
            </Grid>
            <Grid item xs={8}>
              <div style={{ display: "flex" }}>
                <FormControl sx={{ m: 1, width: "22ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Documento
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo de Comprobante"
                    onChange={handleClientType}
                    value={tipoDocumento}
                  >
                    <MenuItem key="dni" value={2}>
                      DNI
                    </MenuItem>
                    <MenuItem key="ruc" value={1}>
                      RUC
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{ m: 1, width: "38ch" }}
                  label="Numero de documento"
                  margin="dense"
                  onChange={handleChangeDocumento}
                  value={nroDocumento}
                />
              </div>
              <TextField
                sx={{ m: 1, width: "30ch" }}
                label="Nombres / Razón Social"
                margin="dense"
                onChange={handleChangeNombres}
                value={nombres}
              />
              <TextField
                sx={{ m: 1, width: "30ch" }}
                label="Teléfono"
                margin="dense"
                onChange={handleChangeTelefono}
                value={telefono}
              />
              <TextField
                sx={{ m: 1, width: "62ch" }}
                label="Email"
                margin="dense"
                onChange={handleChangeEmail}
                value={email}
              />
              <TextField
                sx={{ m: 1, width: "62ch" }}
                multiline
                label="Direccion"
                margin="dense"
                onChange={handleChangeDireccion}
                value={direccion}
              />
              <TextField
                sx={{ m: 1, width: "62ch" }}
                margin="dense"
                id="outlined-disabled"
                label="Referencia"
                onChange={handleChangeReferencia}
                value={referencia}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogClientsAdd.propTypes = {
  close: PropTypes.bool,
  action: PropTypes.bool,
};

export default DialogClientsAdd;
