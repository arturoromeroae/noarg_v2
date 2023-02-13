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
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAdd = ({ close, action, client }) => {
  const [nombres, setNombres] = useState();
  const [email, setEmail] = useState();
  const [direccion, setDireccion] = useState();
  const [referencia, setReferencia] = useState();
  const [telefono, setTelefono] = useState();
  const [idcl, setIdcl] = useState();
  const [clientType, setClientType] = useState();
  const [nroDocumento, setNroDocumento] = useState();
  //const [actualizar, setActualizar] = useState(false);
  const [errorText, setErrorText] = useState();
  const [errorTextName, setErrorTextName] = useState();

  useEffect(() => {
    if (client) {
      setDireccion(client ? client.direccion : "");
      setNombres(client ? client.razonSocial : "");
      setEmail(client ? client.email : "");
      setTelefono(client ? client.telefono : "");
      setReferencia(client ? client.referencia : "");
      setIdcl(client ? client.idCliente : "");
      setNroDocumento(client.rucCliente ? client.rucCliente : client.dni);
      client.tipoDoc == "DNI" ? setClientType(2) : setClientType(1);
    } else {
      setDireccion("");
      setNombres("");
      setEmail("");
      setTelefono("");
      setReferencia("");
      setIdcl("");
      setNroDocumento("");
    }
  }, [action]);

  const handleClose = () => {
    close(false);
    setDireccion("");
    setNombres("");
    setEmail("");
    setNroDocumento("");
    setReferencia("");
    setErrorText();
    setErrorTextName();
    setClientType("");
  };

  const handleChangeDocumento = (e) => {
    setNroDocumento(e.target.value);
    setErrorText();
  };

  const handleChangeNombres = (e) => {
    setNombres(e.target.value);
    setErrorTextName();
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };

  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
  };

  const handleChangeReferencia = (e) => {
    setReferencia(e.target.value);
  };

  const handleClientType = (e) => {
    setClientType(e.target.value);
  };

  const infoClient = {
    idCliente: idcl,
    idTipoCliente: clientType,
    rucCliente: clientType === 1 ? nroDocumento : "",
    razonSocial: client ? nombres : "",
    direccion: direccion,
    dni: clientType === 2 ? nroDocumento : "",
    apellidos: "",
    nombres: client ? nombres : "",
    email: email,
    telefono: telefono,
    referencia: referencia,
  };

  // Actualizar cliente
  const handleClick = async () => {
    if (nroDocumento && nombres) {
      try {
        console.log(infoClient);
        const response = await fetch('http://appdemo1.solarc.pe/api/Cliente/ActualizarCliente', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoClient),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            close(false);
            setDireccion("");
            setNombres("");
            setEmail("");
            setNroDocumento("");
            setErrorText();
            setErrorTextName();
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        const result = await response.json();
        console.log('result is: ', JSON.stringify(result, null, 4));
      } catch (err) {
        console.error(err.message);
      } finally {
        console.log('termino');
      }
    } else if (!nroDocumento) {
      setErrorText("Debe ingresar el numero de documento");
    } else if (!nombres) {
      setErrorTextName("Debe ingresar el nombre / razón social");
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
          Actualizar Cliente
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
                alt="Logo cliente"
                width={250}
                src={defaultImage}
              />
            </Grid>
            <Grid item xs={8}>
              {clientType && (
                <FormControl sx={{ m: 1, width: "30ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Documento
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo de Comprobante"
                    onChange={handleClientType}
                    value={clientType ? clientType : ""}
                  >
                    <MenuItem key="ruc" value={1}>
                      RUC
                    </MenuItem>
                    <MenuItem key="dni" value={2}>
                      DNI
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              <TextField
                sx={{ m: 1, width: "30ch" }}
                label="Nombres / Razón Social"
                margin="dense"
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeNombres}
                value={nombres}
                error={errorTextName ? true : false}
                helperText={errorTextName ? errorTextName : false}
              />
              <TextField
                sx={{ m: 1, width: "30ch" }}
                label="Numero de documento"
                margin="dense"
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeDocumento}
                value={nroDocumento}
                error={errorText ? true : false}
                helperText={errorText ? errorText : false}
              />
              <TextField
                sx={{ m: 1, width: "30ch" }}
                label="Teléfono"
                margin="dense"
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeTelefono}
                value={telefono}
              />
              <TextField
                sx={{ m: 1, width: "62ch" }}
                label="Email"
                margin="dense"
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeEmail}
                value={email}
              />
              <TextField
                sx={{ m: 1, width: "62ch" }}
                multiline
                label="Direccion"
                margin="dense"
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeDireccion}
                value={direccion}
              />
              <TextField
                sx={{ m: 1, width: "62ch" }}
                margin="dense"
                id="outlined-disabled"
                label="Referencia"
                InputLabelProps={{ shrink: true }}
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
          <Button disabled={!client} onClick={handleClick}>
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogAdd.propTypes = {
  close: PropTypes.bool,
  action: PropTypes.bool,
  client: PropTypes.object,
};

export default DialogAdd;
