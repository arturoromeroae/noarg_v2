import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import Typography from '@mui/material/Typography';

const NumberContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NumberInput = styled.input`
  border: 0;
  width: 30px;
  height: 30px;
  font-family: "Roboto";
  font-weight: 500;
  text-align: center;
  background-color: #f5f5ef;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
`;

const NumberPicker = () => {
  const [number, setNumber] = useState(1);

  const handleClickPlus = () => {
    setNumber(number + 1);
  };

  const handleClickMinus = () => {
    if (number > 1) setNumber(number - 1);
  };

  return (
    <div>
      <Typography variant="h7">
        Cantidad
      </Typography>
      <NumberContainer>
        <IconButton
          aria-label="minus"
          onClick={handleClickMinus}
          color="error"
          size="small"
        >
          <RemoveCircleTwoToneIcon fontSize="inherit" />
        </IconButton>
        <NumberInput disabled value={number} />
        <IconButton
          aria-label="plus"
          onClick={handleClickPlus}
          color="primary"
          size="small"
        >
          <AddCircleTwoToneIcon fontSize="inherit" />
        </IconButton>
      </NumberContainer>
    </div>
  );
};

export default NumberPicker;
