import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Spinner from "./Spinner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCotizeBuy = ({ openBuy, actionBuy, dataBuy }) => {
  const [cartCotize, setCartCotize] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    actionBuy(false);
    setLoading(true);
  };

  const handleBuy = () => {
    if (cartCotize.length > 0) {
      Cookies.set("sell", JSON.stringify(cartCotize).toString(), {
        expires: 0.3,
      });
      navigate("/completar-venta");
    }
  };

  // Obtener carrito
  useEffect(() => {
    if (dataBuy) {
      fetch(
        `http://appdemo1.solarc.pe/api/Cotiza/GetCotiza?IdVentaCab=${dataBuy.idVentaCab}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setCartCotize(result["data"]);
            setLoading(false);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [dataBuy]);

  return (
    <div>
      <Dialog
        open={openBuy}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Datos de la cotizacion N° ${dataBuy.numero}?`}</DialogTitle>
        {!loading && (
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <div style={{ display: "flex" }}>
                  <div style={{ marginInline: "30px" }}>
                    <h3>Vendedor:</h3>
                    <p>{dataBuy.usuario}</p>
                  </div>
                  <div style={{ marginInline: "30px" }}>
                    <h3>Razon Social:</h3>
                    <p>{dataBuy.razonSocial}</p>
                  </div>
                </div>
                <h3>Productos de la cotización:</h3>
                <ul>
                  {cartCotize &&
                    cartCotize.map((value) => (
                      <li key={value.nombreProducto}>{value.nombreProducto}</li>
                    ))}
                </ul>
                <h3>Total de la Venta:</h3>
                <p>
                  S/ <strong>{dataBuy.total}</strong>
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Cerrar
              </Button>
              <Button onClick={handleBuy}>Vender</Button>
            </DialogActions>
          </>
        )}
        {loading && <Spinner />}
      </Dialog>
    </div>
  );
};

DialogCotizeBuy.propTypes = {
  dataBuy: PropTypes.array,
  openBuy: PropTypes.bool,
  actionBuy: PropTypes.bool,
};

export default DialogCotizeBuy;
