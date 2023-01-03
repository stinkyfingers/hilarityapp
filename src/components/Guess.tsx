import React from 'react';
import { Plays } from '../lib/types';
import { Context } from '../Context';

import '../css/guess.css';

interface params {
    answers: Plays;
    question: string;
    submit: Function;
};

// reversMap swaps keys for values in an object
const reverseMap = (guesses: Object): Object => {
    const out = {};
    Object.keys(guesses).forEach((guess) => {
        // @ts-ignore
        out[guesses[guess]] = guess
    });
    return out;
};

// shuffle randomly orders ReactNodes
const shuffle = (array: Array<string>): Array<string> => {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
};

const Guess = (params: params) => {
    const ctx = React.useContext(Context);
    const plays = params.answers;
    const [guesses, setGuesses] = React.useState<Object>({});
    const [options, setOptions] = React.useState<Array<string>>([]);
    const [disabled, setDisabled] = React.useState<string>('');
    
    // disabled
    React.useEffect(() => {
        const incomplete = (Object.keys(guesses).length !== options.length);
        const duplicates =  (Object.keys(reverseMap(guesses)).length !== Object.keys(guesses).length);
        const novalue = Object.values(guesses).filter((value) => value === '').length > 0;
        if (incomplete) {
            setDisabled('missing answers');
        } else if (duplicates) {
            setDisabled('duplicate answers');
        } else if (novalue) {
            setDisabled('incomplete answers');
        } else {
            setDisabled('');
        }
    }, [guesses, plays, options]);
    
    // options - filter & shuffle
    React.useEffect(() => {
        setOptions(shuffle(Object.keys(plays)
            .filter((user) => {
                return ctx.user && user !== ctx.user.name;
            })));
    }, [params, ctx.user, plays])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, correctOption: string) => {
        ctx.setErr(null);
        const guess = e.target.value
        setGuesses((current: Map<string, string>) => ({
            ...current, [correctOption]: guess, // this is backwards from api; call reverseMap() before sending to API
        }))
    };
    
    const renderOptions = (correctOption: string) => {
        return <select onChange={(e) => handleChange(e, correctOption)}>
            <option value=''>--Select--</option>
            {options.map((option) => (
                <option value={option} key={option}>{option}</option>
            ))}
        </select>;
    };
    
    const handleSubmit = () => {
        const out = reverseMap(guesses);
        params.submit(out);
    };

    const renderPlays = () => {
        const opts = options.map((option) => {
            if (!plays[option] || !plays[option].answers) return null;
            return <div className='response' key={`response-${option}`}>
                { renderOptions(option) }
                <ol>
                    {plays[option].answers.map((answer, i) => (
                        <li key={`${answer}-${i}`}>{answer}</li>
                    ))}
                </ol>
            </div>
        });
        return opts
    };
    return (
        <div className='guess'>
            <div className='instructions'>
                Select each player that you think supplied each response set:
            </div>
            <div className='userPlays'>{renderPlays()}</div>
            <button onClick={handleSubmit} disabled={disabled !== ''}>Submit Guesses</button>
            <div className='warning'>{ disabled !== '' && disabled}</div>
        </div>
    );
};

export default Guess;