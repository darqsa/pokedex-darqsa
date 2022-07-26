import pokemonStats from "../../modules/pokemonStats/pokemonStats.js";
import pokemonList from "../../modules/pokemonList/pokemonList.js";
import pokedexInfo from "../../modules/info/pokedexInfo.js";
import renderPokemonCard from "../pokemonCards/renderPokemonCard.js";
import unRenderPokemonCard from "../pokemonCards/unRenderPokemonCard.js";

const renderPokemonSelector = async () => {
  const list: string[] = await pokemonList();
  let i = 0;

  for (i; i < list.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const currentPokemon = await pokemonStats(i);

    const pokemonIcon: HTMLInputElement = document.querySelector(
      `#pokemon${i}`
    );
    pokemonIcon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`;
    pokemonIcon.alt = `pokemon ${currentPokemon.name} image`;

    document
      .querySelector(`#pokemon${i}`)
      .addEventListener("click", async () => {
        pokedexInfo.pokemonRender.current =
          (currentPokemon.id - 1) % pokedexInfo.pokemonList.urlOffsetLimit;
        unRenderPokemonCard();
        renderPokemonCard();
      });
  }
};

export default renderPokemonSelector;
