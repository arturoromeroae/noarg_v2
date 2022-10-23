import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessAlert = ({ actionSuccess, success, text }) => {
  const handleClose = () => {
    actionSuccess(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={success} autoHideDuration={9000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

SuccessAlert.propTypes = {
  text: PropTypes.string,
  actionSuccess: PropTypes.bool,
  success: PropTypes.bool
};

export default SuccessAlert;
