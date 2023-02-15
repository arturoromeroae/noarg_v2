import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import Cookies from "js-cookie";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DialogProfileDelete = ({ data, action, set }) => {
  const [load, setLoad] = useState(false);
  const [us, setUs] = useState();
  const navigate = useNavigate();
  const handleClose = () => {
    set(false);
  };

  // Eliminar usuario
  useEffect(() => {
    if (us) {
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
          Cookies.remove("user");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [us]);

  const handleDelete = () => {
    setUs({
      userName: data.userName,
      userPass: 0,
      nombres: "string",
      idPerfil: data.idPerfil,
      idTienda: 1,
      estadoReg: 0,
    });
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
          <ReportProblemTwoToneIcon sx={{ color: yellow[800], fontSize: 50 }} />
          <br />
          {` ¿Desea eliminar el usuario ${data && data.userName}?`}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Si presiona <strong>&quot;Aceptar&quot;</strong> el usuario sera
            eliminado y no podra revertir el proceso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={load} onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogProfileDelete.propTypes = {
  data: PropTypes.array,
  action: PropTypes.bool,
  set: PropTypes.bool,
};

export default DialogProfileDelete;
