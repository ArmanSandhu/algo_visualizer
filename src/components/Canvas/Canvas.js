import './Canvas.css';
import React from 'react';
import Box from '@mui/material/Box';

function Canvas(props) {
    return ( 
        <Box>
            <div className='canvas'>
                {props.array.map((value, idx) => (
                    <div className='bar' key={idx} style={{height : `${value}px`}}></div>
                ))}
            </div>  
        </Box>
    )
}

export default Canvas;