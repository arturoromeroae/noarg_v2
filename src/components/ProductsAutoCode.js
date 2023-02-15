import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from 'prop-types';

const ProductsAutoCode = ({ pr }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
    fetch("https://appdemo1.solarc.pe/api/Productos/GetProductos")
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
        sx={{ m: 1, width: "210px" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, value) => pr(value)}
        isOptionEqualToValue={(option, value) => option.codProd === value.codProd}
        getOptionLabel={(option) => option.codProd}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Código de Producto"
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

ProductsAutoCode.propTypes = {
  pr: PropTypes.any
};

export default ProductsAutoCode;
