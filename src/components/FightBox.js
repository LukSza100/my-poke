import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const DB_URL = "http://localhost:3000";

function FightBox({ isPokemon, setPokemonInArena, isOpacity }) {

  const removeFromTheArena = () => {
    axios.delete(`${DB_URL}/arena/${isPokemon.id}`, setPokemonInArena());
  };

  if (!isPokemon) {
    return (
      <Contain>
        <h2>Dodaj Pokemona</h2>
      </Contain>
    );
  } else
    return (
      <Contain>
        <Image
          src={isPokemon.sprites.other.home.front_shiny}
          alt={isPokemon.name}
          style={isOpacity}
        />
        <PokemonName>{isPokemon.name}</PokemonName>
        <PokemonValue>
          <Value>
            {isPokemon.height}
            <PropertyType>Height:</PropertyType>
          </Value>
          <Value>
            {isPokemon.weight}
            <PropertyType>Weight:</PropertyType>
          </Value>
          <Value>
            {isPokemon.base_experience}
            <PropertyType>Base Experience:</PropertyType>
          </Value>
          <Value>
            {isPokemon.abilities?.[0].ability.name}
            <PropertyType>Ability:</PropertyType>
          </Value>
        </PokemonValue>
        <MyButton
          onClick={removeFromTheArena}
          variant="outlined"
          size="large"
        >
          Usuń
        </MyButton>
      </Contain>
    );
}

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  height: 85%;
  background-color: #e6e2d3;
  border-radius: 10px;
`;

const Image = styled.img`
  margin: 3%;
  width: 45%;
  height: 35%;
`;

const PokemonName = styled.h2`
  display: flex;
  text-transform: capitalize;
  color: #bd5734;
`;

const PokemonValue = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 20vh;
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #454140;
  width: 50%;
`;

const PropertyType = styled.p`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  color: #454140;
`;

const MyButton = styled(Button)`
&& {
  background-color: #e3eaa7;
  border-radius: 10px;
  border: 2px solid #86af49;
}
`;

export default FightBox;