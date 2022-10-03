import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/userName.slice';
import pokemonLogo from '../assets/pokemonLogo.png' 

const UserInput = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const [ userName, setUserName ] = useState('')

    const dispatchUserName = () => {
        dispatch(changeName(userName))
        navigate('/characters')
    }

    return (
        <div className='login'>
            <div className="login-container">
                <img 
                    src={pokemonLogo}
                    alt="pokemon-png" 
                    className='login-img'
                />
                <h1 className='login-title'>¡Introduce tu nombre!</h1>
                <input 
                    type="text" 
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className='login-input' 
                    placeholder='Your name'
                />
                <button onClick={dispatchUserName} className='login-button'>Next</button>
            </div>
        </div>
    );
};

export default UserInput;