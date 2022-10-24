import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorAlert = ({ actionError, error }) => {
  const handleClose = () => {
    actionError(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          ¡Ha ocurrido un error!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

ErrorAlert.propTypes = {
  actionError: PropTypes.bool,
  error: PropTypes.bool
};

export default ErrorAlert;
