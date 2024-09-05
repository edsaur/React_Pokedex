import { useState, useEffect } from "react";
import PokemonModal from "./Components/PokemonModal";

    // POKEDEX
  /* 
    [✅] - create layouts (Components...)
      [✅] - have dummy poke info 
    [✅] - create state for pokemon datas
    [✅] - create state for favorite pokemons
    [] - create sideEffect for pokemonAPI to load
       - 
    [] - 
  
  */
export default function App(){
  const [pokemonList, setPokemonList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [favoritePokemon, setFavoritePokemon] = useState(() => {
  const storedFavorites = localStorage.getItem('likedPokemons');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
});


  const [isLiked, setIsLiked] = useState(() => JSON.parse(localStorage.getItem("isLiked")) || {});
  const [page, setPage] = useState("home");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
        const data = await res.json();
        // Call fetchPokemonDetails for each Pokémon URL
        const details = await Promise.all(data.results.map(pokemon => fetchPokemonDetails(pokemon.url)));
        setPokemonList(details);
      } catch (error) {
        console.error(error.message);
      }
    }

    async function fetchPokemonDetails(url) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.types);
        return {id: data.id, name: data.species.name, img: data.sprites.front_default, stats: data.stats, types: data.types}; // Return the data from the individual Pokémon fetch
      } catch (error) {
        console.error(error.message);
        return null; // Return null or some default value in case of an error
      }
    }
    fetchPokemon();
  }, []);

  function handleLikedPokemon(pokemon) {
  const isCurrentlyLiked = isLiked[pokemon.id] || false;
  const newIsLiked = { ...isLiked, [pokemon.id]: !isCurrentlyLiked };

  setIsLiked(newIsLiked);
  localStorage.setItem('isLiked', JSON.stringify(newIsLiked));
    if (!isCurrentlyLiked) {
      // If not liked, add it to favorites
      const likedPokemons = [...favoritePokemon, selectedPokemon]
      setFavoritePokemon(likedPokemons);
      localStorage.setItem("likedPokemons", JSON.stringify(likedPokemons));
    } else {
      // If already liked, remove it from favorites
      const updatedPokemons = favoritePokemon.filter(favPokemon => favPokemon.id !== selectedPokemon.id);
      setFavoritePokemon(updatedPokemons);
      localStorage.setItem("likedPokemons", updatedPokemons);
    }
  }
  
  function handleModalToggle(pokemon = null) {
    setSelectedPokemon(pokemon);
    setModal(!modal);
  }

  function handleSetPage(){
    setPage("home");
  }
  return (
    <>
      <Header>
          <h1 className="logo">PokeDex</h1>
        </Header> 

        <NavBar setPage={setPage} />
    { page === "home" ?
      <>
        <Main pokemonDex={pokemonList} modal={modal} onModalToggle={handleModalToggle} />
        {
          modal && selectedPokemon && 
          <Pokemon 
              pokemon={selectedPokemon} 
              onModalToggle={handleModalToggle} 
              isLiked={isLiked[selectedPokemon.id]} 
              onLikedPokemon={() => handleLikedPokemon(selectedPokemon)}
          />
        }
      </>
      : 
      <>
        <FavoritePokemon favoritePokemon={favoritePokemon} modal={modal} onModalToggle={handleModalToggle} onSetPage={handleSetPage}/>
        {
          modal && selectedPokemon && 
          <Pokemon 
              pokemon={selectedPokemon} 
              onModalToggle={handleModalToggle} 
              isLiked={isLiked[selectedPokemon.id]} 
              onLikedPokemon={() => handleLikedPokemon(selectedPokemon)}
          />
        }
      </>
    }
    </>
  )
}

 
// LAYOUT
  function Header({children}){
    return (
      <div className="header">
          {children}
      </div>
    )
  }
  
  function NavBar({setPage}){
    // includes Home/Favorite/

    function changePage(page) {
      setPage(page);
    }
    return (
      <div className="navbar">
          <ul>
            <li onClick={() => changePage("home")}>Home</li>
            <li onClick={() => changePage("favorite")}>Favorite Pokemon</li>
          </ul>
      </div>
    )

  }
  function Main({pokemonDex, modal, onModalToggle}){
    // includes the Pokemon Component
    console.log(pokemonDex);
    return (
      <div className="main">
        <div className="pokemonList">
         {pokemonDex.map(pokemon => (
            <PokemonList key={pokemon.id} pokemons={pokemon} onModalToggle={() => onModalToggle(pokemon)}/>
          ))}

        </div>
      </div>
    )
  }


// FUNCTIONABILITY
  function PokemonList({pokemons, onModalToggle}) {
    // Load List of Pokemons here
    return (
      <>
        <div className="pokemonCard" onClick={onModalToggle}>
          <img src={pokemons.img} alt={pokemons.name} />
          {pokemons.name.charAt(0).toUpperCase() + pokemons.name.slice(1).toLowerCase()}
        </div>
      </>
    )
  }

  function Pokemon ({pokemon, onModalToggle, onLikedPokemon, isLiked}) {
    // Loads particular pokemon
    return (
      <PokemonModal 
        pokemon={pokemon} 
        onModalToggle={onModalToggle} 
        isLiked={isLiked} 
        onLikedPokemon={onLikedPokemon} 
      />
    );
  }

  function FavoritePokemon({favoritePokemon, onModalToggle, onSetPage}) {  
    return (
      <div className="main">
        { favoritePokemon.length > 0 && favoritePokemon ?
          <div className="pokemonList">
          {favoritePokemon.map(pokemon => 
            <FavoritePokemonList 
              key={pokemon.id}  // Ensure each item has a unique key
              pokemons={pokemon} 
              onModalToggle={() => onModalToggle(pokemon)}  // Pass a callback function
            />
          )}
        </div>
        : 
        <div className="empty">
          <h1 className="logo">Such empty! <span onClick={onSetPage}>Go Home!</span></h1>
        </div>
        }
      </div>
    )
  }
  function FavoritePokemonList({pokemons, onModalToggle}) {
    return (
      <div className="pokemonCard" onClick={onModalToggle}>
      <img src={pokemons.img} alt={pokemons.name} />
      {pokemons.name}
    </div>
    )
  }