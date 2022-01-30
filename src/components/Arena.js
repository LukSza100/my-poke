import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FightBox from "./FightBox";
import { Button } from "@material-ui/core";

const DB_URL = "http://localhost:3000";

function Arena({ isPokemon, isFight, setPokemonInArena }) {
  const [pokemonWinner, setPokemonWinner] = useState();
  const [clearArena, setClearArena] = useState(false);
  const [opacityFirstPokemon, setOpacityFirstPokemon] = useState({
    opacity: 1,
  });
  const [opacitySecondPokemon, setOpacitySecondPokemon] = useState({
    opacity: 1,
  });

  const firstPokemonPower =
    isPokemon[0]?.base_experience * isPokemon[0]?.weight;
  const secondPokemonPower =
    isPokemon[1]?.base_experience * isPokemon[1]?.weight;

  const handleStartFight = () => {
    if (firstPokemonPower > secondPokemonPower)
      return (
        setPokemonWinner(`Wygrywa: ${isPokemon[0].name}`),
        setClearArena(true),
        setOpacitySecondPokemon({
          opacity: 0.2,
        })
      );
    else if (firstPokemonPower < secondPokemonPower)
      return (
        setPokemonWinner(`Wygrywa: ${isPokemon[1].name}`),
        setClearArena(true),
        setOpacityFirstPokemon({
          opacity: 0.2,
        })
      );
  };

  const handleClearArena = () => {
    axios.delete(`${DB_URL}/arena/${isPokemon[0].id}`, setPokemonInArena());
    axios.delete(`${DB_URL}/arena/${isPokemon[1].id}`, setPokemonInArena());
    setClearArena(false);
    setPokemonWinner();
  };

  return (
    <Contain>
      <FightBox
        isPokemon={isPokemon[0]}
        setPokemonInArena={setPokemonInArena}
        isOpacity={opacityFirstPokemon}
      />
      <FightBox
        isPokemon={isPokemon[1]}
        setPokemonInArena={setPokemonInArena}
        isOpacity={opacitySecondPokemon}
      />
      <ArenaBox>
        <ArenaTitle>ARENA</ArenaTitle>
        <Results>
          {isPokemon.map(({ name, weight, base_experience }) => (
            <Power key={name}>
              {name}: {weight * base_experience}
            </Power>
          ))}
        </Results>
        <WinnerName>{pokemonWinner}</WinnerName>
        {!clearArena && (
          <MyButton
            onClick={handleStartFight}
            variant="outlined"
            size="large"
            disabled={isFight}
          >
            WALCZ
          </MyButton>
        )}
        {clearArena && (
          <MyButton
            onClick={handleClearArena}
            variant="outlined"
            size="large"
          >
            OPUŚĆ ARENĘ
          </MyButton>
        )}
      </ArenaBox>
    </Contain>
  );
}

const Contain = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #f5f5f1;
  height: 70vh;
  width: 85vw;
  border: 2px solid #36486b;
  border-radius: 10px;
`;

const ArenaBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
  width: 25vw;
  border: 2px solid #36486b;
  border-radius: 25px;
`;

const Results = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 40px;
`;

const ArenaTitle = styled.h1`
  margin: 20px;
  color: #3e4444;
`;

const Power = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  font-weight: 800;
  text-transform: uppercase;
`;

const WinnerName = styled.div`
  display: flex;
  margin: 40px;
  font-size: 1.5rem;
`;

const MyButton = styled(Button)`
  && {
    margin: 20px;
    height: 5vh;
    width: 35%;
    background-color: #e3eaa7;
    border-radius: 10px;
    border: 2px solid #86af49;
  }
`;

export default Arena;
