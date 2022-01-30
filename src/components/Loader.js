import React from 'react';
import styled from "styled-components";


const Loader = () => {
  return(
    <LoadTheme>Loading...</LoadTheme>
  )
}

const LoadTheme = styled.div`
  display: flex;
  height: 40vh;
  justify-content: center;
  align-items: center;
  color: #3e4444;
  font-size: 50px;
`;

export default Loader;


