import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import PersonOffTwoToneIcon from "@mui/icons-material/PersonOffTwoTone";
import DialogProfile from "../components/DialogProfile";
import DialogProfileList from "../components/DialogProfileList";
import DialogProfileDelete from "../components/DialogProfileDelete";
import SuccessAlert from "../components/SuccessAlert";

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const Cuenta = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [userList, setUserList] = useState();
  const [successCreated, setSuccessCreated] = useState(false);
  const [textAlert, setTextAlert] = useState();
  let getUserInfo = Cookies.get("user");
  let user = getUserInfo && JSON.parse(getUserInfo);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleClickList = () => {
    setOpenList(true);
  };

  useEffect(() => {
    fetch("http://appdemo1.solarc.pe/api/Account/Usuarios")
      .then((res) => res.json())
      .then(
        (result) => {
          setUserList(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [openList, successCreated]);
  return (
    <>
      <Header />
      <Typography sx={{ m: 1, textAlign: "center" }} variant="h2" gutterBottom>
        Mi Cuenta
      </Typography>
      <AvatarContainer>
        <div>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              bgcolor: "green",
              fontSize: "100px",
            }}
          >
            {user.userName.substring(0, 1).toUpperCase()}
          </Avatar>
        </div>
      </AvatarContainer>
      <Typography sx={{ m: 1, textAlign: "center" }} variant="h4" gutterBottom>
        <strong>Nombre:</strong> {user.nombres}
        <br />
        <strong>Usuario:</strong> {user.userName}
      </Typography>
      <AvatarContainer>
        <Button
          variant="contained"
          startIcon={<AccountCircleTwoToneIcon />}
          color="success"
          onClick={handleClick}
          sx={{ m: 1 }}
        >
          Editar Información
        </Button>
        <Button
          variant="contained"
          startIcon={<PersonOffTwoToneIcon />}
          color="error"
          onClick={handleClickDelete}
          sx={{ m: 1 }}
        >
          Eliminar Usuario
        </Button>
        {user.userName === "JGONZALES" ||
          (user.userName === "arturo" && (
            <Button
              variant="contained"
              startIcon={<PeopleAltTwoToneIcon />}
              color="primary"
              onClick={handleClickList}
              sx={{ m: 1 }}
            >
              Lista de Usuarios
            </Button>
          ))}
      </AvatarContainer>
      {/* Editar perfil */}
      <DialogProfile data={user} action={open} set={setOpen} />
      {/* Eliminar perfil */}
      <DialogProfileDelete
        data={user}
        action={openDelete}
        set={setOpenDelete}
      />
      {/* Ver lista de usuarios */}
      <DialogProfileList
        data={userList}
        action={openList}
        set={setOpenList}
        actionAlert={setSuccessCreated}
        text={setTextAlert}
      />
      {/* Alerta */}
      <SuccessAlert
        actionSuccess={setSuccessCreated}
        success={successCreated}
        text={textAlert}
      />
    </>
  );
};

export default Cuenta;
