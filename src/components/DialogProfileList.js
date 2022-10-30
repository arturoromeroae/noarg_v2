import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import DialogProfileListDelete from "./DialogProfileListDelete";

const DialogProfileList = ({ data, action, set, actionAlert, text }) => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleClose = () => {
    set(false);
  };

  const handleOpen = (prop) => {
    setOpen(true);
    setProfile(prop);
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
          Lista de Usuarios
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Presione el boton para eliminar el usuario.
          </DialogContentText>
          <List>
            {data &&
              data.map((u) => (
                <>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleOpen(u)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "green",
                        }}
                      >
                        {u.userName.substring(0, 1).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={u.userName} />
                  </ListItem>
                </>
              ))}
            <Divider />
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <DialogProfileListDelete
        open={open}
        set={setOpen}
        data={profile}
        actionAlert={actionAlert}
        text={text}
      />
    </div>
  );
};

DialogProfileList.propTypes = {
  action: PropTypes.bool,
  set: PropTypes.bool,
  data: PropTypes.json,
  actionAlert: PropTypes.bool,
  text: PropTypes.string,
};

export default DialogProfileList;
