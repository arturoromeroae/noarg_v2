import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const Clients = ({ getCl, errorCl, errorText }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

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
            setOptions(result.data);
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
        sx={{ m: 2, width: "210px" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) =>
          option.razonSocial === value.razonSocial
        }
        getOptionLabel={option => option.razonSocial}
        onBlur={(event, value) => value ? getCl(value) : getCl(event.target.value)}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cliente"
            error={errorCl}
            helperText={errorText}
            required
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

export default Clients;
