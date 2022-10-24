import React from "react";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';

const ContainerIputs = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const AgregarUsuarios = () => {
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
          required
        />
        <TextField
          id="outlined-user"
          label="Usuario"
          variant="outlined"
          sx={{ m: 2 }}
          required
        />
        <TextField
          id="outlined-pass"
          label="Contraseña"
          variant="outlined"
          type="password"
          sx={{ m: 2 }}
          required
        />
      </ContainerIputs>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="success" startIcon={<PersonAddAltTwoToneIcon />}>
          Agregar Usuario
        </Button>
      </div>
    </>
  );
};

export default AgregarUsuarios;
