import React from 'react';
import { createGame } from '../lib/api';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';

import '../css/createGame.css';

const CreateGame = () => {
    const ctx = React.useContext(Context);
    const [name, setName] = React.useState<string>('');
    const [rounds, setRounds] = React.useState<number>(2);
    const navigate = useNavigate();

    const handleCreateGame = () => {
        if (!ctx.user) return
        createGame(ctx.user, name, rounds)
            .then((resp) => {
                if (resp.error) {
                    ctx.setErr(resp.error)
                    return;
                }
                ctx.setErr(null);
                navigate(`/play/${resp.name}`)
            })
            .catch((err) => {
                ctx.setErr(err)
            });
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        ctx.setErr(null);
        setName(e.target.value);
    }
    if (!ctx.user || !ctx.user.name) {
        return <div className="nouser">Enter your username before creating a game</div>;
    }
    return (
        <div className='createGame'>
            <table>
                <tbody>
                    <tr className='createMenuItem'>
                        <td><span className='label'>Name Your Game:</span></td>
                        <td><input type='text' value={name} onChange={handleChange} /></td>
                    </tr>
                    <tr className='createMenuItem'>                
                        <td><span className='label'>Number Of Rounds:</span></td>
                        <td><input type='number' value={rounds} onChange={(e) => setRounds(parseInt(e.target.value, 10))} min='1' max='10' /></td>
                    </tr>
                    <tr className='createMenuItem'>
                        <td><button onClick={handleCreateGame} disabled={name === ''}>Submit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CreateGame;