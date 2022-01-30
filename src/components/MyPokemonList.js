import React from "react";
import styled from "styled-components";
import PokemonCard from "./PokemonCard";

const MyPokemonList = ({ myPokemon }) => {
  return (
    <CardsBox>
      {myPokemon.map(
        ({ name, height, weight, base_experience, abilities, sprites }) => (
          <CardContent key={name}>
            <PokemonCard
              name={name}
              height={height}
              weight={weight}
              abilities={abilities}
              base_experience={base_experience}
              sprites={sprites}
            />
          </CardContent>
        )
      )}
    </CardsBox>
  );
};

const CardsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const CardContent = styled.div`
  width: 17vw;
`;

export default MyPokemonList;
