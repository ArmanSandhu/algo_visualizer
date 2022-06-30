import './ControlPanel.css';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

export default function ControlPanel(props) {

    const onButtonTrigger = (event, text) => {
        // If the event is to choose a sort method then open a modal
        if (text === "Select Sort") {
            props.openModal();
        }
        // otherwise we need to randomize the array or start the sort animation
        else {
            props.handleButtonCallback(text);
        }
        event.preventDefault();
    }

    const handleSliderChange = (event, newValue) => {
        props.sliderChange(newValue);
    }

    const handleDelayChange = (event, newValue) => {
        props.delayChange(newValue);
    }

    return (
        <div className='control_panel'>
            <Box sx={{border: '1px solid white', borderRadius: 2, m: 2, p: 1}}>
                <Grid container spacing={2}>
                    <Grid container item xs={6} spacing={2} direction="column">
                        <Grid item>
                            <Box sx={{m: 1, px: 1}}>
                                Array Size
                                <Slider value={typeof props.array_size === 'number' ? props.array_size: 0}
                                    sx={{
                                        color: 'error.dark',
                                        '& .MuiSlider-thumb': {
                                            borderRadius: '1px',
                                        }
                                    }}
                                    min={10}
                                    max={100}
                                    step={10}
                                    onChange={handleSliderChange}
                                    aria-labelledby="input-slider"
                                    disabled={props.isDisabled}/>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{m: 1, px: 1}}>
                                Visualizer Speed
                                <Slider value={typeof props.animDelay === 'number' ? props.animDelay: 30}
                                    sx={{
                                        color: 'error.dark',
                                        '& .MuiSlider-thumb': {
                                            borderRadius: '1px',
                                        }
                                    }}
                                    min={30}
                                    max={210}
                                    step={30}
                                    onChange={handleDelayChange}
                                    aria-labelledby="input-slider"
                                    disabled={props.isDisabled}/>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{m: 1, px: 1}}>
                                Selected Sort: <b>{props.sort_method}</b>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} spacing={2} direction="column">
                        <Grid item>
                            <Box sx={{m: 1, px: 2, pt: 1}}>
                                <Button variant="contained" color="error" disabled={props.isDisabled} onClick={(e) => onButtonTrigger(e, "Randomize")}>Randomize Array</Button>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{m: 1, px: 2, pt: 1}}>
                                <Button variant="contained" color="error" disabled={props.isDisabled} onClick={(e) => onButtonTrigger(e, "Sort Array")}>Sort Array</Button>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{m: 1, px: 2, pt: 1}}>
                                <Button variant="contained" color="error" disabled={props.isDisabled} onClick={(e) => onButtonTrigger(e, "Select Sort")}>Select Sort Method</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}