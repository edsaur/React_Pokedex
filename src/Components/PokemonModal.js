import './modal.css';

export default function PokemonModal({pokemon, onModalToggle, isLiked, onLikedPokemon}) {
    return (
      <div className='modal'>
        <div className="overlay" onClick={onModalToggle}></div>
        <div className='modal-content'>
          <img src={pokemon.image} alt={pokemon.name} />
          <h1>{pokemon.name}</h1>
          <div>
            <h2>Pokemon Type:</h2>
            {pokemon.type.map(type => <h3 className='type' key={type}>{type}</h3>)}
          </div>
          <button className="heart-button" onClick={onLikedPokemon}>
            {isLiked ? "❤️" : "♡"}
          </button>
        </div>
      </div>
    );
  }
  
