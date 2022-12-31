import React from 'react';

interface params {
    msg: string;
}
const Error = (params: params) => (
    <div className='error'>{params.msg}</div>
);

export default Error;