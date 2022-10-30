import React, { useState } from "react";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import BackdropLoad from "../components/Backdrop";
import SuccessAlert from "../components/SuccessAlert";

const ContainerIputs = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const AgregarUsuarios = () => {
  const [NameUser, setNameUser] = useState();
  const [UserName, setUserName] = useState();
  const [PassUser, setPassUser] = useState();
  const [load, setLoad] = useState();
  const [successCreated, setSuccessCreated] = useState(false);
  const [textAlert, setTextAlert] = useState();

  const handleName = (e) => {
    setNameUser(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassUser = (e) => {
    setPassUser(e.target.value);
  };

  const handleCreate = () => {
    setTextAlert("¡Se agregó el usuario correctamente!");
    setLoad(true);
    let user = {
      userName: UserName,
      userPass: PassUser,
      nombres: NameUser,
      idPerfil: 0,
      idTienda: 1,
      estadoReg: 1,
    };

    if (user) {
      fetch("http://appdemo1.solarc.pe/api/Account/UsuariosCrear", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSuccessCreated(true);
          setLoad(false);
          setNameUser("");
          setUserName("");
          setPassUser("");
        })
        .catch((error) => {
          console.error("Error:", error);
          //actionAlertError(true);
        });
    }
  };

  return (
    <>
      <Header />
      <Typography sx={{ m: 1, textAlign: "center" }} variant="h2" gutterBottom>
        Agregar Usuarios
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ bgcolor: green[500], width: "80px", height: "80px" }}>
          <AccountCircleTwoToneIcon sx={{ fontSize: "50px" }} />
        </Avatar>
      </div>
      <ContainerIputs>
        <TextField
          id="outlined-name"
          label="Nombre y Apellido"
          variant="outlined"
          sx={{ m: 2 }}
          value={NameUser}
          onChange={handleName}
          required
        />
        <TextField
          id="outlined-user"
          label="Usuario"
          variant="outlined"
          sx={{ m: 2 }}
          value={UserName}
          onChange={handleUserName}
          required
        />
        <TextField
          id="outlined-pass"
          label="Contraseña"
          variant="outlined"
          type="password"
          sx={{ m: 2 }}
          value={PassUser}
          onChange={handlePassUser}
          required
        />
      </ContainerIputs>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<PersonAddAltTwoToneIcon />}
          onClick={handleCreate}
        >
          Agregar Usuario
        </Button>
      </div>
      <BackdropLoad load={load} />
      <SuccessAlert
        actionSuccess={setSuccessCreated}
        success={successCreated}
        text={textAlert}
      />
    </>
  );
};

export default AgregarUsuarios;
