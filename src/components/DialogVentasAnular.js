import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import { yellow } from "@mui/material/colors";
import Button from "@mui/material/Button";

const DialogVentasAnular = ({ open, set, data }) => {
    const handleClose = () => {
        set(false);
    };

    const handleDelete = () => {
        console.log(false);
    };
    console.log(data)
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