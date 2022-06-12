import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel/ControlPanel';
// import Canvas from './components/Canvas/Canvas';
import ModalDialog from './components/ModalDialog/ModalDialog';
import Box from '@mui/material/Box';
import './App.css';

const sortMethods = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Cocktail Sort'];

function compare(a, b) {
  return ['compare', a, b];
};

function swap(a, b) {
  return ['swap', a, b];
};

function* bubbleSort(array) {
  let len = array.length;
  let swapped;
  for (let i = 1; i < len; i++) {
    swapped = false;
    for (let j = 0; j < len - 1; j++) {
      if ((yield compare(j, j + 1)) > 0) {
        yield swap (j, j + 1);
        swapped = true;
      }
    }

    if (!swapped) { break; };
  }
};

function* cockTailSort(start, end) {
  let swapped = true;
  while(swapped) {
    swapped = false;
    for (let i = 0; i < end; i++) {
      if ((yield compare(i, i + 1)) > 0) {
        yield swap(i, i + 1);
        swapped = true;
      }
    }
    if (swapped == false) {
      break;
    }
    end--;
    swapped = false;
    for (let j = end - 1; j >= start; j--) {
      if ((yield compare(j, j + 1)) > 0) {
        yield swap(j, j + 1);
        swapped = true;
      }
    }
    start++;
  }
}

function* insertionSort(array) {
  let len = array.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0 && (yield compare(j, j - 1)) < 0; j--) {
			yield swap(j, j - 1);
		}
  }
};

function* selectionSort(array) {
  let len = array.length;
  let min_index;
  for (let i = 0; i < len - 1; i++) {
    min_index = i;
    for (let j = i + 1; j < len; j++) {
      if ((yield compare(min_index, j)) > 0) {
        min_index = j;
      }
    }
    yield swap(min_index, i);
  }
};

function* quickSort(start, end) {
  if (end - start <= 1) {
    return;
  }
  const pivot = end - 1;
  let i = start;
  for (let j = start; j < end; j++) {
    if ((yield compare(j, pivot)) < 0) {
      yield swap(i, j);
      i++;
    }
  }
  yield swap(pivot, i);
  yield* quickSort(start, i);
  yield* quickSort(i + 1, end);
}

function* mergeSort(start, end) {
  if (end - start <= 1) {
    return;
  }
  let mid = start + Math.floor((end - start) / 2);
  yield* mergeSort(start, mid);
  yield* mergeSort(mid, end);
  yield* merge(start, mid, end)
}

function* merge(start, mid, end) {
  let start2 = mid;
  while (start < mid && start2 < end) {
    if((yield compare(start, start2)) < 0) {
      start++;
    } else {
      let index = start2;
      while (index != start) {
        yield swap(index, index - 1);
        index--;
      }
      yield swap(start, index);
      start++;
      mid++;
      start2++;
    }
  }
};

export default function App () {

  const [array, setArray] = useState([]);
  const [sort_selection, setSort] = useState(sortMethods[0]);
  const [modalFlag, showModal] =  useState(false);
  const [arraySize, setSize] = useState(10);
  const [playing, setPlay] = useState(false);
  const [done, setDone] = useState(false);
  const [delay, setDelay] = useState(30);
  const [barColor, setBarColor] = useState({});

  useEffect(() => {
    createRandomArray();
  }, []);

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
          [action.value[1]] : 'green',
          [action.value[2]] : 'green',
        });
      console.log(JSON.stringify(latestArray) + `: Compared ${action.value[1]}: ${a} to ${action.value[2]}: ${b} resulting in ${nextValue}`);
      } else if (action.value[0] === 'swap') {
        latestArray = [...latestArray];
        const tmp = latestArray[action.value[1]];
        latestArray[action.value[1]] = latestArray[action.value[2]];
        latestArray[action.value[2]] = tmp;
        setBarColor({
          [action.value[1]] : 'blue',
          [action.value[2]] : 'blue',
        });
        setArray(latestArray);
        console.log(JSON.stringify(latestArray) + `: Swapped index ${action.value[1]} and ${action.value[2]}`);
      }
      }, delay);

      return () => window.clearInterval(timerFunc);
    }
  }, [done, playing]);

  const createRandomArray = () => {
    setArray(Array.from(Array(arraySize)).map(x => Math.floor(Math.random() * (200 - 1) + 1)));
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
      } else {
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

    return (
    <div className='container'>
      <Box sx={{display: 'grid', height: '100%', width: '100%'}}>
        {<><ControlPanel handleButtonCallback = {handleButtonCallback} 
                      sort_method = {sort_selection} 
                      openModal = {openModal}
                      array_size = {arraySize}
                      sliderChange = {setRandomArraySize}
                      animDelay = {delay}
                      delayChange = {setAnimDelay}/>
        <ModalDialog showState = {modalFlag}
                sortOptions = {sortMethods}
                selection = {sort_selection}
                onClose = {closeModal}/></>}
        {/*<Canvas array = {this.state.array}/>*/}
        <Box>
            <div className='canvas'>
                {array.map((value, idx) => (
                    <div className='bar' key={idx} style={{height : `${value}px`, backgroundColor: barColor[idx] ?? 'crimson'}}></div>
                ))}
            </div>  
        </Box>
      </Box>
    </div>
    );
}