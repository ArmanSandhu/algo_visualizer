import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel/ControlPanel';
import ModalDialog from './components/ModalDialog/ModalDialog';
import { Snackbar, Box } from '@mui/material';
import { bubbleSort, combSort, cockTailSort, insertionSort, shellSort, selectionSort, quickSort, mergeSort } from './algorithms/algorithms';
import MuiAlert from "@mui/material/Alert"
import './App.css';

const sortMethods = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Cocktail Sort', 'Shell Sort', 'Comb Sort'];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App () {

  const [array, setArray] = useState([]);
  const [sort_selection, setSort] = useState(sortMethods[0]);
  const [modalFlag, showModal] =  useState(false);
  const [arraySize, setSize] = useState(10);
  const [playing, setPlay] = useState(false);
  const [disabled, setDisabled] = useState(false); 
  const [done, setDone] = useState(false);
  const [delay, setDelay] = useState(30);
  const [barColor, setBarColor] = useState({});
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  const [barWidth, setBarWidth] = useState(10);
  const [barMargin, setBarMargin] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    createRandomArray();
  }, []);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    let generator;
    switch(sort_selection) {
      case "Bubble Sort":
        generator = bubbleSort(array);
        break;
      case "Insertion Sort":
        console.log("Insertion");
        generator = insertionSort(array);
        break;
      case "Selection Sort":
        console.log("Selection");
        generator = selectionSort(array);
        break;
      case "Merge Sort":
        console.log("Merge");
        generator = mergeSort(0, array.length);
        break;
      case "Quick Sort":
        console.log("Quick");
        generator = quickSort(0, array.length);
        break;
      case "Cocktail Sort":
        console.log("Cocktail");
        generator = cockTailSort(0, array.length);
        break;
      case "Shell Sort":
        console.log("Shell");
        generator = shellSort(array);
        break;
      case "Comb Sort":
        console.log("Comb");
        generator = combSort(array);
        break;
      default:
        console.log("Invalid Sort Selected!");
        break;
    }
    let latestArray = array;
    let nextValue = 0;
    setBarColor({});

    if(!done && playing) {
      let timerFunc = window.setInterval(() => {
        const action = generator.next(nextValue);
        console.log(action);
        if (action.done) {
          console.log("Done!");
          setDone(true);
          return;
        } else if (action.value[0] === 'compare') {
            const a = latestArray[action.value[1]];
            const b = latestArray[action.value[2]];
            if (a > b) {
              nextValue = 1;
            } else if (a < b) {
              nextValue = -1;
            } else {
              nextValue = 0;
            }
            setBarColor({
              [action.value[1]] : '#a9cbb7',
              [action.value[2]] : '#a9cbb7',
            });
          console.log(JSON.stringify(latestArray) + `: Compared ${action.value[1]}: ${a} to ${action.value[2]}: ${b} resulting in ${nextValue}`);
          } else if (action.value[0] === 'swap') {
            latestArray = [...latestArray];
            const tmp = latestArray[action.value[1]];
            latestArray[action.value[1]] = latestArray[action.value[2]];
            latestArray[action.value[2]] = tmp;
            setBarColor({
              [action.value[1]] : '#f7ff58',
              [action.value[2]] : '#f7ff58',
            });
            setArray(latestArray);
            console.log(JSON.stringify(latestArray) + `: Swapped index ${action.value[1]} and ${action.value[2]}`);
          }
      }, delay);

      return () => {
        window.clearInterval(timerFunc)
        setDisabled(false);
      };
    }
  }, [done, playing]);

  const createRandomArray = () => {
    setArray(Array.from(Array(arraySize)).map(x => Math.floor(Math.random() * (200 - 1) + 1)));
    const width = Math.floor(dimensions.width / (arraySize * 2.5));
    const margin = determineMargin();
    setBarWidth(width);
    setBarMargin(margin);
  };

  const determineMargin = () => {
    if (arraySize < 10) {
      return 15;
    } else if (arraySize < 30) {
      return 12;
    } else if (arraySize < 50) {
      return 9;
    } else if (arraySize < 70) {
      return 6;
    } else if (arraySize < 90) {
      return 3;
    } else  {
      return 1;
    }
  };

  const openModal = () => {
    showModal(true);
  };

  const closeModal = (selection) => {
    showModal(false);
    setSort(selection);
  };

  const handleButtonCallback = (buttonEvent) => {
    console.log(buttonEvent);
    if (buttonEvent === "Sort Array") {
      if (playing && done) {
        console.log("Randomize the Array!");
        setError(true);
      } else {
        setDisabled(true);
        setPlay(true);
      }
    }
    else if (buttonEvent === "Randomize") {
      createRandomArray();
      setPlay(false);
      setDone(false);
    }
  }

  const setRandomArraySize = (value) => {
    setSize(value);
  }

  const setAnimDelay = (value) => {
    console.log("Setting Delay: " + value);
    setDelay(value);
  }

  const handleErrorClose = () => {
    setError(false);
  }

    return (
    <div>
      <div className='header'>
        <h1>
          Sorting Visualizer
        </h1>
      </div>
      <div className='container'>
        <Box sx={{display: 'grid', height: '100%', width: '100%'}}>
          {<><ControlPanel handleButtonCallback = {handleButtonCallback} 
                        sort_method = {sort_selection} 
                        openModal = {openModal}
                        array_size = {arraySize}
                        sliderChange = {setRandomArraySize}
                        animDelay = {delay}
                        delayChange = {setAnimDelay}
                        isDisabled = {disabled}/>
          <ModalDialog showState = {modalFlag}
                  sortOptions = {sortMethods}
                  selection = {sort_selection}
                  onClose = {closeModal}/></>}
          <Box>
              <div className='canvas'>
                  {array.map((value, idx) => (
                      <div className='bar' key={idx} style={{
                        height: `${value}px`, 
                        backgroundColor: barColor[idx] ?? '#ff934f', 
                        width: `${barWidth}px`,
                        marginLeft: `${barMargin}px`,
                        marginRight: `${barMargin}px`}}></div>
                  ))}
              </div> 
              <Snackbar open={error} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                  Please randomize the Array!
                </Alert>
              </Snackbar> 
          </Box>
        </Box>
      </div>
    </div>
    );
}