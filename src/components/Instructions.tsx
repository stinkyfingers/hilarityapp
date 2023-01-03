import React from 'react';
import '../css/instructions.css';
const Instructions = () => {
    return (
        <div className="instructions">
            This is a party guessing game in which each participant plays on their own device.
            After entering your name above, you can create a game or join one that a friend created.
            In each round, you will be first asked to enter your "top 3" of a random category. After all players have
            done the same, you will then be presented with all other players answers and have to guess which player
            created each "top 3" list. At the game's end, you'll see who guessed correctly most often.
        </div>
    )
};

export default Instructions;