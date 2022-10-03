import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import Loading from './Loading';

const Characters = () => {

    const navigate = useNavigate();
    const name = useSelector(state => state.userName)
    
    const [ charactersList, setCharactersList ] = useState([]);
    const [ typesList, setTypesList ] = useState([])
    const [ nameInput, setNameInput ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1155/')
            .then(res => {
                setCharactersList(res.data.results)
                setIsLoading(false)
            })

        axios.get('https://pokeapi.co/api/v2/type')
            .then(res => {
                setTypesList(res.data.results)
            })
    }, [])

    const searchPokemon = () => {
        navigate(`/characters/${nameInput.toLowerCase()}`)
    }

    const selectType = (locationUrl) => {
        axios.get(locationUrl)
            .then(res => setCharactersList(res.data.pokemon))
    }

    const [ page, setPage ] = useState(1);
    const charactersPerPage = 12;
    const lastCharacterIndex = page * charactersPerPage; // 12
    const firstCharacterIndex = lastCharacterIndex - charactersPerPage // 0
    const charactersPaginated = charactersList.slice(
        firstCharacterIndex,
        lastCharacterIndex
    );
    const totalPages = Math.ceil(charactersList.length / charactersPerPage)

    console.log(isLoading)

    return (
        <div>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                    <div className="characters-back-btn-container">
                        <button onClick={() => navigate('/')} className='characters-back-btn'>
                            <i className="fa-solid fa-arrow-left characters-back-btn-icon"></i>
                        </button>
                    </div>
                    <h1 className='characters-title'>¡Bienvenido a tu Pokédex {name}!</h1>
                    <div className="search-container">
                        <input 
                            type="text"
                            placeholder='Nombre del pokémon'
                            value={nameInput}
                            onChange={e => setNameInput(e.target.value)} 
                            className='characters-input'
                        />
                        <button onClick={searchPokemon} className='characters-search-btn'>
                            <i className="fa-solid fa-magnifying-glass characters-search-btn-icon"></i>
                        </button>
                    </div>
                    <select onChange={e => selectType(e.target.value)}>
                        <option value="">Selecciona un tipo</option>
                        {
                            typesList.map(type => (
                                <option value={type.url} key={type.url}>
                                    {type.name}
                                </option>
                            ))
                        }
                    </select>
                    <div className="characters-list-container">
                    {
                        charactersPaginated.map(character => (
                            <CharacterCard 
                                key={character.url ? character.url : character.pokemon.url} 
                                url={character.url ? character.url : character.pokemon.url} 
                            />
                        ))
                    }
                    </div>
                    <div className="characters-pages-btns-container">
                                <button 
                                    className='characters-pages-btns'
                                    onClick={() => setPage(page-1)}
                                    disabled={page === 1}
                                >
                                    <i className="fa-solid fa-angle-left characters-pages-btns-icon"></i>
                                </button>
                                <div className="characters-pages-btns page-indicator">
                                    {page}
                                </div>
                                <button 
                                    className='characters-pages-btns'
                                    onClick={() => setPage(page+1)}
                                    disabled={page === totalPages}
                                >
                                    <i className="fa-solid fa-angle-right characters-pages-btns-icon"></i>
                                </button>
                    </div>
                    </>
                )
            }
        </div>
    );
};

export default Characters;