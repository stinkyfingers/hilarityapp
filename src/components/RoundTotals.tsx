import React from 'react';
import Totals from './Totals';
import {Game} from '../lib/types';

interface params {
    game: Game
    onComplete: React.MouseEventHandler<HTMLButtonElement>;
}

const RoundTotals = (params: params) => {
    return (
        <div className="roundTotals">
            <h6>Totals for this round:</h6>
            <Totals game={params.game} />
            <button onClick={params.onComplete}>OK</button>
        </div>
    )
};

export default RoundTotals;