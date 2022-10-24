import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";
import { pink, green, blue } from "@mui/material/colors";
import print from "../components/PdfStock";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAlmacenStock = ({ open, set }) => {
  let date = dayjs();
  let dd = date.$D;
  let mm = date.$M + 1;
  let yyyy = date.$y;
  let today = yyyy + "." + mm + "." + dd;
  const [data, setData] = useState();
  const [repStock, setRepStock] = useState();
  const [dateStart, setDateStart] = useState(today);
  const [dateEnd, setDateEnd] = useState(today);

  let url = `http://appdemo1.solarc.pe/api/Venta/ConsultaGanancia?FechaDesde=${dateStart}&FechaHasta=${dateEnd}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setRepStock(result.data[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [url]);

  useEffect(() => {
    fetch("http://appdemo1.solarc.pe/api/Productos/GetRepStock")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const handleClose = () => {
    set(false);
  };

  const handleChangeInicio = (newValue) => {
    let dd = String(newValue.$D).padStart(2, "0");
    let mm = String(newValue.$M + 1).padStart(2, "0");
    let yyyy = newValue.$y;
    let start = yyyy + "." + mm + "." + dd;
    setDateStart(start);
  };

  const handleChangeFinal = (newValue) => {
    let dd = String(newValue.$D).padStart(2, "0");
    let mm = String(newValue.$M + 1).padStart(2, "0");
    let yyyy = newValue.$y;
    let end = yyyy + "." + mm + "." + dd;
    setDateEnd(end);
  };

  const handlePrint = () => {
    set(false);
    print(data, repStock, dateStart, dateEnd);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Imprimir Reporte de Stock
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ m: 2, textAlign: "center" }}
          >
            Seleccione el rango de fecha a consultar.<br />(Fecha actual esta
            activada por defecto)
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Fecha de inicio"
              inputFormat="MM-DD-YYYY"
              renderInput={(params) => <TextField sx={{ m: 1 }} {...params} />}
              onChange={handleChangeInicio}
              value={dateStart}
            />
            <DesktopDatePicker
              label="Fecha de fin"
              inputFormat="MM-DD-YYYY"
              renderInput={(params) => <TextField sx={{ m: 1 }} {...params} />}
              onChange={handleChangeFinal}
              value={dateEnd}
            />
          </LocalizationProvider>
          {repStock && (
            <List sx={{ width: "20%", bgcolor: "background.paper" }}>
              <ListItem>
                <ListItemAvatar sx={{ textAlign: "center" }}>
                  <Avatar sx={{ bgcolor: green[100] }}>
                    <SavingsTwoToneIcon color="success" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Ganancia"
                  secondary={"S/" + repStock.ganancia}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: pink[100] }}>
                    <PaymentsTwoToneIcon sx={{ color: pink[500] }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Invertido"
                  secondary={"S/" + repStock.invertido}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100] }}>
                    <ReceiptLongTwoToneIcon color="primary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Venta"
                  secondary={"S/" + repStock.venta}
                />
              </ListItem>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handlePrint}>Imprimir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogAlmacenStock.propTypes = {
  open: PropTypes.bool,
  set: PropTypes.bool,
};

export default DialogAlmacenStock;
