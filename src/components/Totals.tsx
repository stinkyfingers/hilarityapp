import React from 'react';
import { Game } from "../lib/types";

import '../css/totals.css';

interface params {
    game: Game;
};

interface winnerValues {
    user: string;
    total: number;
};

const Totals = (params: params) => {
    const renderTotals = () => {
        const correctGuesses = new Map();
        const rounds = params.game.pastRounds.map((round) => {
            const guessMap = new Map();
            Object.keys(round.guesses).forEach((guesser) => {
                Object.keys(round.guesses[guesser].responses).forEach((guessedUser) => {
                    const correctUser =  round.guesses[guesser].responses[guessedUser];
                    const cur = guessMap.get(correctUser) || [];
                    cur.push(`${guesser} guessed ${guessedUser}`);
                    guessMap.set(correctUser, cur);
                    if (correctUser === guessedUser) {
                        const userTotal = correctGuesses.get(guesser) || 0;
                        correctGuesses.set(guesser, userTotal + 1);
                    }
                });
            });
            
            const plays = Object.keys(round.plays).map((username) => {
                return (
                    <div className='plays' key={username}>
                        <h6 className='username'>{username}</h6>
                        <ol className='answers'>
                            {round.plays[username].answers.map((answer, i) => {
                                return <li key={`${username}-${answer}-${i}`}>{answer}</li>
                            })}
                        </ol>
                        <div className='guesses'>
                            {guessMap.get(username).map((guess: string, i: number) => {
                                return <div className='userGuesses' key={`${guess}-${i}`}>{guess}</div>
                            })}
                        </div>
                    </div>
                )
            });
            return (
                <div className='responses' key={round.question}>
                    <h5 className='question'>{`Top 3 ${round.question}`}</h5>
                    <div className='question'>
                        { plays }
                    </div>
                </div>

            )
        })
        const winners: winnerValues[] = [];
        correctGuesses.forEach((total, user) => {
            winners.push({ user, total });
        });
        winners.sort((a, b) => a.total > b.total ? 1 : -1);
        const tally = winners.map((winner, i) => {
            return <div key={winner.user}>{winner.user}: {winner.total}</div>
        })
        return (
            <div>
                {rounds}
                <div className='winners'>
                    <h5 className='winners'>Totals</h5>
                    {tally}
                </div>
            </div>
        );
    }
    return (
        <div className='totals'>{renderTotals()}</div>
    );
};

export default Totals;