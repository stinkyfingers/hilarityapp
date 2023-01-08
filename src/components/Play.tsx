import React from 'react';
import {Context} from "../Context";
import '../css/play.css';

interface params {
    answers: Array<string>
    question: string;
    submit: Function;
};

const Play = (params: params) => {
    const { setErr } = React.useContext(Context);
    const [plays, setPlays] = React.useState<Array<string>>(['','','']);
    const [disabled, setDisabled] = React.useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.target.name, 10);
        setPlays((current) => (current.map((v, i) => i === index ? e.target.value : v)));
    };
    
    React.useEffect(() => {
        const ok = plays.find((play) => play.length < 1);
        setDisabled(ok !== undefined);
    }, [plays]);
    
    React.useEffect(() => {
        setErr(null);
    }, [setErr]);

    return (
        <div className='play'>
            <h5 className='question'>List your Top 3 {params.question}:</h5>
            <div className='playInputs'>
                <div>
                    <span className='index'>1</span>
                    <input className='play' type='text' name='0' value={plays[0]} onChange={handleChange} />
                </div>
                <div>
                    <span className='index'>2</span>
                    <input className='play' type='text' name='1' value={plays[1]} onChange={handleChange} />
                </div>
                <div>
                    <span className='index'>3</span>
                    <input className='play' type='text' name='2' value={plays[2]} onChange={handleChange} />
                </div>
            </div>
            <button onClick={() => params.submit(plays)} disabled={disabled}>Submit</button>
        </div>
    );
};

export default Play;