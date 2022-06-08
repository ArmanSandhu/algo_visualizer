import './ControlPanel.css';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Button from '@mui/material/Button';

export default function ControlPanel(props) {

    const onButtonTrigger = (event, text) => {
        // If the event is to choose a sort method or show pseudocode, then open a modal
        if (text === "Select Sort") {
            props.openModal();
        }
        else if (text === "Pseudocode") {
            console.log("Pseudocode");
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

    const handleInputChange = (event) => {
        console.log(event);
        props.sliderChange(event.target.value === '' ? '' : Number(event.target.value));
    }

    const handleDelayChange = (event, newValue) => {
        props.delayChange(newValue);
    }

    const handleBlur = () => {
        if (props.array_size < 0) {
            props.sliderChange(0);
        }
        else if (props.array_size > 100) {
            props.sliderChange(100);
        }
    }

    const handleDelayBlur = () => {
        if (props.delayChange < 30) {
            props.delayChange(30);
        }
        else if (props.delayChange > 6000) {
            props.delayChange(6000);
        }
    }

    return (
        <div className='control_panel'>
            <Box sx={{border: '1px solid grey', borderRadius: 2, m: 6, p: 1}}>
                Control Panel
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Grid container item spacing={2}>
                            <Grid item>
                                <Box sx={{width: 250}}>
                                <Slider value={typeof props.array_size === 'number' ? props.array_size: 0}
                                    min={0}
                                    max={100}
                                    step={10}
                                    onChange={handleSliderChange}
                                    aria-labelledby="input-slider"/>
                                </Box>
                            </Grid>
                            <Grid item>
                                <MuiInput value={props.array_size}
                                    size="small"
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                        step: 10,
                                        min: 0,
                                        max: 100,
                                        type: 'number',
                                        "aria-labelledby": 'input-slider',
                                    }}
                                    />
                            </Grid>
                            <Grid item>
                                <MuiInput value={props.animDelay}
                                    size="small"
                                    onChange={handleDelayChange}
                                    onBlur={handleDelayBlur}
                                    inputProps={{
                                        step: 30,
                                        min: 30,
                                        max: 6000,
                                        type: 'number',
                                        "aria-labelledby": 'input-slider',
                                    }}
                                    />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Button variant="contained" onClick={(e) => onButtonTrigger(e, "Randomize")}>Randomize Array</Button>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={4} md={4}>
                            Selected Sort: {props.sort_method}
                            <Button variant="contained" onClick={(e) => onButtonTrigger(e, "Select Sort")}>Select Sort Method</Button>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Button variant="contained" onClick={(e) => onButtonTrigger(e, "Pseudocode")}>Show Pseudocode</Button>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Button variant="contained" onClick={(e) => onButtonTrigger(e, "Sort Array")}>Sort Array</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}