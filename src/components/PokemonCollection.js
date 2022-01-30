import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Paginate from "./Paginate";
import Loader from "./Loader";
import MyPokemonList from "./MyPokemonList";
import TextField from "@mui/material/TextField";

const limit = "151";
const BASE_URL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;

const PokemonCollection = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsOnThePage] = useState(15);

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((result) => {
        return result.data.results;
      })
      .then((result) => {
        return Promise.all(result.map((results) => axios.get(results.url)));
      })
      .then((results) => {
        setPokemons(results.map((result) => result.data));
      });
  }, []);

  const searchPokemonsName = pokemons.filter((pokemons) => {
    if (search === "") {
      return pokemons;
    } else if (pokemons.name.includes(search)) {
      return pokemons.name;
    }
    return null;
  });

  const paginatePage = (page) => setCurrentPage(page);

  const lastPokemonOfPage = currentPage * pokemonsOnThePage;
  const firstPokemonOfPage = lastPokemonOfPage - pokemonsOnThePage;
  const currentPokemons = searchPokemonsName.slice(
    firstPokemonOfPage,
    lastPokemonOfPage
  );

  if (pokemons.length === 0) {
    return (
      <Contain>
        <Loader />
      </Contain>
    );
  } else
    return (
      <Contain>
        <TextField
          id="outlined-basic"
          label="Search Pokemon"
          variant="outlined"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <MyPokemonList myPokemon={currentPokemons} />
        <Paginate
          allPokemons={searchPokemonsName.length}
          pokemonsOnThePage={pokemonsOnThePage}
          paginatePage={paginatePage}
        />
      </Contain>
    );
};

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 8%;
  padding-bottom: 3%;
`;

export default PokemonCollection;
