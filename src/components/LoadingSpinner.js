import React from 'react';
import Spinner from "../components/Spinner";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 400px;
`;

const LoadingSpinner = () => {
  return (
    <>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
    </>
  )
}

export default LoadingSpinner