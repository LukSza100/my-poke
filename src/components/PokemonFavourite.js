import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import MyPokemonList from "./MyPokemonList";
import Paginate from "./Paginate";

const DB_URL = "http://localhost:3000";

function PokemonFavourite() {
  const [myPoke, setMyPoke] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsOnThePage] = useState(15);

  useEffect(() => {
    axios.get(`${DB_URL}/favourites`).then((res) => {
      setMyPoke(res.data);
    });
  }, []);

  const paginatePage = (page) => setCurrentPage(page);

  const lastPokemonOfPage = currentPage * pokemonsOnThePage;
  const firstPokemonOfPage = lastPokemonOfPage - pokemonsOnThePage;
  const currentPokemons = myPoke.slice(firstPokemonOfPage, lastPokemonOfPage);

  if (myPoke.length === 0) {
    return (
      <Contain>
        <Title>Ulubione Pokemony</Title>
        <Info>NIE MASZ JESZCZE ULUBIONYCH POKEMONÓW</Info>
      </Contain>
    );
  } else
    return (
      <Contain>
        <Title>Ulubione Pokemony</Title>
        <MyPokemonList myPokemon={currentPokemons} />
        <Paginate
          pokemonsOnThePage={pokemonsOnThePage}
          allPokemons={myPoke.length}
          paginatePage={paginatePage}
        />
      </Contain>
    );
}

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding-top: 7%;
  padding-bottom: 3%;
`;

const Title = styled.h1`
  color: #92a8d1;
  letter-spacing: 2px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  color: #c94c4c;
  height: 60vh;
  font-size: 2rem;
`;

export default PokemonFavourite;
