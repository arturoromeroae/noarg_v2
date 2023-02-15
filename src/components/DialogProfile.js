import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DialogProfile = ({ data, action, set }) => {
  const [load, setLoad] = useState(false);
  const [nameUser, setNameUser] = useState();
  const [loginUser, setLoginUser] = useState();
  const [passUser, setPassUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setNameUser(data.nombres);
    setLoginUser(data.userName);
    setPassUser("");
  }, []);

  const handleClose = () => {
    set(false);
    setPassUser("");
  };

  const handleChangeName = (e) => {
    setNameUser(e.target.value);
  };

  const handleChangeLogin = (e) => {
    setLoginUser(e.target.value);
  };

  const handleChangePass = (e) => {
    setPassUser(e.target.value);
  };

  const handleUpdateProfile = () => {
    // Actualizar usuario
    let us = {
      userName: loginUser,
      userPass: passUser,
      nombres: nameUser,
      idPerfil: data.idPerfil,
      idTienda: 1,
      estadoReg: 1,
    }

    if (us && passUser && nameUser && loginUser) {
      setLoad(true);
      fetch("https://appdemo1.solarc.pe/api/Account/UsuariosActualizar", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(us),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          set(false);
          setLoad(false);
          setPassUser("");
          Cookies.remove("user");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <Dialog
        open={action}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          Editar mi perfil
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Inserte la información que desea modificar.
            <br />
            Al presionar &quot;Actualizar&quot; se cerrara su sesión.
            <br />
            (Los campos con * son requeridos)
          </DialogContentText>
          <TextField
            sx={{ m: 1, width: "50ch" }}
            label="Nombre"
            margin="dense"
            value={nameUser}
            onChange={handleChangeName}
            required
          />
          <TextField
            sx={{ m: 1, width: "50ch" }}
            label="Usuario"
            margin="dense"
            value={loginUser}
            onChange={handleChangeLogin}
            required
          />
          <TextField
            sx={{ m: 1, width: "50ch" }}
            label="Contraseña"
            margin="dense"
            value={passUser}
            type="password"
            onChange={handleChangePass}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={load} onClick={handleClose} color="error">
            Cancelar
          </Button>
          {!load ? (
            <Button onClick={handleUpdateProfile} autoFocus>
              Actualizar
            </Button>
          ) : (
            <LoadingButton loading>Crear</LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogProfile.propTypes = {
  action: PropTypes.bool,
  set: PropTypes.bool,
  data: PropTypes.json,
};

export default DialogProfile;
