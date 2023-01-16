/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Spinner from "./Spinner";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import print from "../components/PdfPrint";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogVentasImprimir = ({
  openPrintModal,
  setPrint,
  dataPrint,
  load,
  setLoad,
}) => {
  const [cartPrint, setCartPrint] = useState();

  const handleClose = () => {
    setPrint(false);
    setLoad(false);
  };

  const handlePrint = () => {
    if (dataPrint && cartPrint) {
      let sum = "";
      let productsCookies = "";
      let cl = "";
      let pay = 0;
      let billNumber = "";
      let billType = "";
      let discount = 0;
      let ruc = "";
      let razonSocial = "";

      const completeSell = [...cartPrint];

      // Ordenar alfabeticamente
      completeSell.sort((a, b) => a.codProd.localeCompare(b.codProd));
      print(
        (productsCookies = completeSell),
        (cl = dataPrint.razonSocial),
        (pay = 0),
        (billNumber = dataPrint.numero),
        (billType = dataPrint.comprobante),
        (sum = dataPrint.total),
        (discount = 0),
        (ruc = cartPrint[0].ruc),
        (razonSocial = dataPrint.razonSocial)
      );
    }
  };

  useEffect(() => {
    if (dataPrint) {
      fetch(
        `http://appdemo1.solarc.pe/api/Venta/GetVenta?IdVentaCab=${dataPrint.idVentaCab}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setLoad(false);
            if (result.data) {
              setCartPrint(result.data);
            }
          },
          (error) => {
            setLoad(false);
            console.log(error);
          }
        );
    }
  }, [dataPrint]);

  return (
    <div>
      <Dialog
        open={openPrintModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Datos de la venta N°${dataPrint.numero}?`}</DialogTitle>
        {!load && (
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <div style={{ display: "flex" }}>
                  <div style={{ marginInline: "30px" }}>
                    <h3>Vendedor:</h3>
                    <p>{dataPrint.usuario}</p>
                  </div>
                  <div style={{ marginInline: "30px" }}>
                    <h3>Razon Social:</h3>
                    <p>{dataPrint.razonSocial}</p>
                  </div>
                </div>
                <h3>Productos de la venta:</h3>
                <ul>
                  {cartPrint &&
                    cartPrint.map((value) => (
                      <li key={value.nombreProducto}>{value.nombreProducto}</li>
                    ))}
                </ul>
                <h3>Total de la venta:</h3>
                <p>
                  S/ <strong>{dataPrint.total}</strong>
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Cerrar
              </Button>
              <Button onClick={handlePrint}>Imprimir</Button>
            </DialogActions>
          </>
        )}
        {load && <Spinner />}
      </Dialog>
    </div>
  );
};

DialogVentasImprimir.propTypes = {
  openPrintModal: PropTypes.bool,
  setPrint: PropTypes.any,
  dataPrint: PropTypes.array,
  load: PropTypes.bool,
  setLoad: PropTypes.bool,
};

export default DialogVentasImprimir;
