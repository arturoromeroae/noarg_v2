import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

const ClientsDni = ({ getClDni }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const handleChange = (e) => {
    getClDni(e.target.value);
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      fetch("http://appdemo1.solarc.pe/api/Cliente/GetClientes")
        .then((res) => res.json())
        .then(
          (result) => {
            setOptions(result.data.filter((c) => c.tipoDoc === "DNI"));
          },
          (error) => {
            console.log(error);
          }
        );
    }

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        freeSolo
        sx={{ m: 1, width: "210px" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.dni === value.dni}
        getOptionLabel={(option) => option.dni}
        onChange={(index, value) => getClDni(value)}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="DNI"
            required
            onChange={handleChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
};

ClientsDni.propTypes = {
  getClDni: PropTypes.any,
};

export default ClientsDni;
