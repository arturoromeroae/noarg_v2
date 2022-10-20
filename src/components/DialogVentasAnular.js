import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import { yellow } from "@mui/material/colors";
import Button from "@mui/material/Button";

const DialogVentasAnular = ({ open, set, data, reload }) => {
    const [deleteBill, setDeleteBill] = useState();
    
    const handleClose = () => {
        set(false);
    };

    const handleDelete = () => {
        setDeleteBill(1);
        set(false);
    };

    console.log(data)
    // Insertar venta
    let NullData = {
        "fecha": "2022-10-10T20:57:10.880Z",
        "idCliente": 0,
        "tipoVenta": 0,
        "subTotal": 0,
        "igv": 0,
        "total": 0,
        "vuelto": 0,
        "porcDscto": 0,
        "valorDscto": 0,
        "valorVenta": 0,
        "idSede": 0,
        "idPedCab": 0,
        "usuario": "string",
        "rucCliente": "string",
        "razonSocial": data.razonSocial,
        "idOrigen": 1,
        "isAnulado": 1,
        "idVentaCab": data.idVentaCab,
    };

    useEffect(() => {
        if (data) {
            fetch("http://appdemo1.solarc.pe/api/Venta/InsertaVenta", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(NullData),
            })
                .then((response) => response.json())
                .then((data) => {
                    setDeleteBill();
                    reload();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [deleteBill]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
                    <ReportProblemTwoToneIcon sx={{ color: yellow[800], fontSize: 50 }} /><br />
                    {` ¿Desea anualar la venta N°${data && data.numero}?`}
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center" }}>
                    <DialogContentText id="alert-dialog-description">
                        Si presiona <strong>"Aceptar"</strong> la venta sera anulada de la lista y no
                        podra revertir el proceso.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogVentasAnular