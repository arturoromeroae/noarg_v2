import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { green } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import styled from "@emotion/styled";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import Spinner from "./Spinner";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const ButtonModal = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: right;
`;

const ModalNotification = ({ open, set, info }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [load, setLoad] = useState(false);
  const [items, setItems] = useState();

  const handleClose = () => {
    set(false);
    setIsLoaded(false);
  };

  const handleDismissNotification = () => {
    setLoad(true);
    if (info) {
      let not = {
        idVentaCab: info.idVentaCab,
      };

      fetch("http://appdemo1.solarc.pe/api/Venta/ModificarNotificacion", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(not),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          set(false);
          setIsLoaded(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    info &&
      fetch(
        `http://appdemo1.solarc.pe/api/Venta/ConsultaReimprimir?IdVentaCab=${info.idVentaCab}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setLoad(false);
            setItems(result.data);
          },
          (error) => {
            setIsLoaded(true);
            console.error(error);
          }
        );
  }, [info]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <CampaignTwoToneIcon
              fontSize="large"
              sx={{ mr: 2 }}
              color="error"
            />{" "}
            Venta Nro. {info && info.serie + info.nro}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Fecha de la venta:</strong> {info && info.fecha}
            <br />
            <strong>Total de la venta:</strong> S/{info && info.total}
            <br />
            <strong>Usuario vendedor:</strong> {info && info.usuario}
            {isLoaded ? (
              <List
                sx={{ overflow: "auto", maxHeight: 300, marginTop: "20px" }}
              >
                <Divider />
                {items &&
                  items.map((p) => (
                    <>
                      <ListItem key={p.nombreProducto}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: green[100] }}>
                            <ShoppingBasketTwoToneIcon color="success" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={p.nombreProducto}
                          secondary={"Cantidad: " + p.cantidad}
                        />
                      </ListItem>
                      <Divider />
                    </>
                  ))}
              </List>
            ) : (
              <Spinner />
            )}
          </Typography>
          <ButtonModal>
            {!load ? (
              <Button
                endIcon={<NotificationsOffIcon />}
                onClick={handleDismissNotification}
              >
                Marcar como leido
              </Button>
            ) : (
              <LoadingButton loading></LoadingButton>
            )}
          </ButtonModal>
        </Box>
      </Modal>
    </div>
  );
};

ModalNotification.propTypes = {
  open: PropTypes.bool,
  set: PropTypes.bool,
  info: PropTypes.object,
};

export default ModalNotification;
