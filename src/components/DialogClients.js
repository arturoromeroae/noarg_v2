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
import ClientsDniAuto from "../components/ClientsDniAuto";
import ClientsAuto from "../components/ClientsAuto";
import Divider from "@mui/material/Divider";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAdd = ({ close, action }) => {
  const [cl, setCl] = useState();
  const [clienType, setClientType] = useState();
  const [nombres, setNombres] = useState();
  const [clDni, setClDni] = useState();
  const [email, setEmail] = useState();
  const [direccion, setDireccion] = useState();
  const [referencia, setReferencia] = useState();
  const [telefono, setTelefono] = useState();
  const [idcl, setIdcl] = useState();
  const [nroDocumento, setNroDocumento] = useState();
  const [actualizar, setActualizar] = useState(false);
  const [errorText, setErrorText] = useState();
  const [errorTextName, setErrorTextName] = useState();

  useEffect(() => {
    if (clienType === 1 && cl) {
      setDireccion(cl ? cl.direccion : "");
      setNombres(cl ? cl.razonSocial : "");
      setEmail(cl ? cl.email : "");
      setTelefono(cl ? cl.telefono : "");
      setReferencia(cl ? cl.referencia : "");
      setIdcl(cl ? cl.idCliente : "");
      setNroDocumento(cl ? cl.rucCliente : "");
      setClDni("");
    } else if (clienType === 2 && clDni) {
      setDireccion(clDni ? clDni.direccion : "");
      setNombres(clDni ? clDni.nombres : "");
      setEmail(clDni ? clDni.email : "");
      setTelefono(clDni ? clDni.telefono : "");
      setReferencia(clDni ? clDni.referencia : "");
      setIdcl(clDni ? clDni.idCliente : "");
      setNroDocumento(clDni ? clDni.dni : "");
      setCl("");
    } else {
      setDireccion("");
      setNombres("");
      setEmail("");
      setTelefono("");
      setReferencia("");
      setIdcl("");
      setNroDocumento("");
    }
  }, [clDni, cl]);

  const handleClose = () => {
    close(false);
    setDireccion("");
    setNombres("");
    setEmail("");
    setNroDocumento("");
    setCl("");
    setClDni("");
    setErrorText();
    setErrorTextName();
  };

  const handleClientType = (event) => {
    setClientType(event.target.value);
    setDireccion("");
    setNombres("");
    setEmail("");
    setNroDocumento("");
    setCl("");
    setClDni("");
    setErrorText();
    setErrorTextName();
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

  const handleChangeUpdate = () => {
    if (nroDocumento && nombres) {
      setActualizar(true);
    } else if (!nroDocumento) {
      setErrorText("Debe ingresar el numero de documento");
    } else if (!nombres) {
      setErrorTextName("Debe ingresar el nombre / razón social");
    }
  };

  const infoClient = {
    idCliente: idcl,
    idTipoCliente: clienType,
    rucCliente: cl ? nroDocumento : "",
    razonSocial: cl ? nombres : "",
    direccion: direccion,
    dni: clDni ? nroDocumento : "",
    apellidos: "",
    nombres: clDni ? nombres : "",
    email: email,
    telefono: telefono,
    referencia: referencia,
  };

  // Actualizar cliente
  useEffect(() => {
    if (infoClient) {
      fetch("http://appdemo1.solarc.pe/api/Cliente/ActualizarCliente", {
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
          setDireccion("");
          setNombres("");
          setEmail("");
          setNroDocumento("");
          setCl("");
          setClDni("");
          setErrorText();
          setErrorTextName();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [actualizar]);

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
              <p style={{ margin: 8 }}>
                <strong>Buscar clientes:</strong> seleccione el tipo de
                documento e ingrese el nro de documento
              </p>
              <Divider sx={{ my: 2 }} />
              <div style={{ display: "flex" }}>
                <PersonSearchIcon
                  sx={{ fontSize: 45, my: 1 }}
                  color="primary"
                />
                <FormControl sx={{ m: 1, width: "23ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Documento
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo de Comprobante"
                    onChange={handleClientType}
                  >
                    <MenuItem key="nota" value={2}>
                      DNI
                    </MenuItem>
                    <MenuItem key="boleta" value={1}>
                      RUC
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField sx={{ display: "none" }} value={idcl} />
                {clienType == 2 && <ClientsDniAuto getClDni={setClDni} />}
                {clienType == 1 && <ClientsAuto getCl={setCl} />}
                {!clienType && (
                  <TextField
                    sx={{ m: 1, width: "30ch" }}
                    label="Seleccione tipo de documento"
                    margin="dense"
                    disabled
                  />
                )}
              </div>
              <Divider sx={{ my: 2 }} />
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
                sx={{ m: 1, width: "30ch" }}
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
          <Button disabled={!cl && !clDni} onClick={handleChangeUpdate}>
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
};

export default DialogAdd;
