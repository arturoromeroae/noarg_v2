import React from 'react';
import styled from "styled-components";
import Header from '../components/Header';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import logo from '../image/LOGO.png';

const TitleContainer = styled.div`
  text-align: center;
  padding: 20px;
`

const Home = () => {
  let getUserInfo = Cookies.get('user');
  let user = getUserInfo && JSON.parse(getUserInfo);
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <>
        <Header />
        <TitleContainer>
          <Typography variant="h2" gutterBottom>
            ¡Bienvenido {user.userName}!
          </Typography>
          <Typography variant="h4" gutterBottom>
            Fecha: {dd}/{mm}/{yyyy}
          </Typography>
          <br />
          <img width={500} src={logo} alt="Logo NOARG" />
        </TitleContainer>
    </>
  )
};

export default Home;