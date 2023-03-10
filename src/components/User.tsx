import React from 'react';
import { Context } from '../Context';
import { getObject, setObject } from '../lib/storage';

const User = () => {
    const ctx = React.useContext(Context);
    const [name, setName] = React.useState<string>('');
    const setErrFn = ctx.setErr;
    const setUserFn = ctx.setUser;

    React.useEffect(() => {
        getObject('user')
            .then((resp) => {
                setName(resp.name);
                setUserFn({ name: resp.name });
            })
            .catch((err) => setErrFn(JSON.stringify(err)))
    }, [setUserFn, setErrFn])
    
    const setUser = () => {
        ctx.setUser({ name });
        setObject('user', { name })
            .catch((err) => ctx.setErr(JSON.stringify(err)))
    }; 

    return <div>
        <input
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            onBlur={setUser}
            disabled={ctx.gaming ? true : false }
            defaultValue={name}
        />
    </div>
};

export default User;