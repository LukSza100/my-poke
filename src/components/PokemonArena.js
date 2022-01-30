import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Arena from "./Arena";

const DB_URL = "http://localhost:3000";

function PokemonArena() {
  const [isPokemon, setIsPokemon] = useState([]);
  const [isFight, setIsFight] = useState(true);
  const [pokemonInArena, setPokemonInArena] = useState();

  useEffect(() => {
    axios.get(`${DB_URL}/arena`).then((res) => {
      setIsPokemon(res.data);
      const arenaLength = res.data.length === 2 ? false : true;
      setPokemonInArena(arenaLength);
      setIsFight(arenaLength);
    });
  }, [pokemonInArena]);

  return (
    <Contain>
      <Arena
        isPokemon={isPokemon}
        setPokemonInArena={setPokemonInArena}
        isFight={isFight}
      />
    </Contain>
  );
}

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding-top: 5%;
`;

export default PokemonArena;