import React from 'react';
import styled from "styled-components";
import Button from "@mui/material/Button";


const Paginate = ({ allPokemons, pokemonsOnThePage, paginatePage }) => {
  const numberOfPage = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsOnThePage); i++) {
    numberOfPage.push(i);
  }
  return (
    <PageBar>
      {numberOfPage.map((number) => (
        <MyButtonPage
          key={number}
          size="small"
          onClick={() => paginatePage(number)}
        >
          {number}
        </MyButtonPage>
      ))}
    </PageBar>
  );
};
 
const PageBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6%;
  margin-bottom: 2%;
  width: auto;
`;

const MyButtonPage = styled(Button)`
  && {
    background-color: #e3eaa7;
    border-radius: 10px;
    border: 2px solid #86af49;
    font-size: 1.5rem;
    margin: 1%;
  }
`;

export default Paginate;
