import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Alert from "../components/Alert";
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner'

const DivForm = styled.div`
  position: absolute;
  padding: 50px;
  width: 500px;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: 5px 5px 10px 0 #c9c8e0;
  border-radius: 20px;
`;

const FormLogin = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  margin: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [customErrorUser, setCustomErrorUser] = useState(false);
  const [customErrorPass, setCustomErrorPass] = useState(false);
  const [textError, setTextError] = useState("");
  const [textErrorUser, setTextErrorUser] = useState("");
  const [textErrorPass, setTextErrorPass] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setCheck(false);
    setCustomErrorUser(false);
    setCustomErrorPass(false);
    setTextErrorUser("");
    setTextErrorPass("");
    if(user.length > 0 && pass.length > 0){
      try {
        setLoading(true);
        let result = await fetch(
          `http://appdemo1.solarc.pe/api/Account/Login?UserName=${user}&UserPass=${pass}`
        );
        result = await result.json();
        // console.log(result);
    
        if (result) {
          // minutes
          // let inFifteenMinutes = new Date(new Date().getTime() + 2 * 60 * 1000);
          navigate("/inicio");
          Cookies.set("user", JSON.stringify(result).toString(), { expires: 0.5 })
        }
      } catch(e) {
        setLoading(false);
        setCheck(true);
        setTextError("Usuario o Contraseña incorrecta/os");
      }
    }else if(user.length === 0){
      setCustomErrorUser(true);
      setTextErrorUser("Debe introducir el usuario");
    }else if(pass.length === 0){
      setCustomErrorPass(true);
      setTextErrorPass("Debe introducir la contraseña");
    }
    
  };

  if (Cookies.get('user')) {
    return <Navigate to="/inicio" replace />
  }

  return (
    <>
      {check && <Alert text={textError} />}
      <DivForm>
        <FormLogin>
          <Typography align="center" variant="h2" gutterBottom>
            ¡Bienvenido!
          </Typography>
          <InputContainer>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "#3a34eb", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                error={customErrorUser}
                id="input-with-sx"
                onChange={(e) => setUser(e.target.value)}
                label="Usuario"
                variant="standard"
                helperText={textErrorUser}
              />
            </Box>
          </InputContainer>
          <InputContainer>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <KeyIcon sx={{ color: "#3a34eb", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                error={customErrorPass}
                onChange={(e) => setPass(e.target.value)}
                name="password"
                type="password"
                label="Contraseña"
                variant="standard"
                helperText={textErrorPass}
              />
            </Box>
          </InputContainer>
          <ButtonContainer>
            {!loading &&
              <Button
                variant="contained"
                endIcon={<LockOpenIcon />}
                onClick={login}
              >
                Iniciar Sesión
              </Button>
            }
            {loading &&
              <Spinner />
            }
          </ButtonContainer>
        </FormLogin>
      </DivForm>
    </>
  );
};

export default Login;
