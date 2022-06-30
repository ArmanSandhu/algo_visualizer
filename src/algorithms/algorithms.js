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
  
  function findGap(gap) {
    console.log("Finding Gap");
    gap = Math.floor(gap / 1.3);
    if (gap <= 1) {
      return 1;
    }
    return gap;
  }
  
  function* combSort(array) {
    let len = array.length;
    let gap = len;
    let swapped;
    while(true) {
      swapped = false;
      gap = findGap(gap);
      for (let j = 0; j < len - gap; j++) {
        if ((yield compare(j, j + gap)) > 0) {
          yield swap (j, j + gap);
          swapped = true;
        }
      }
  
      if (!swapped && gap === 1) { break; };
    }
  }
  
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
  
  function* shellSort(array) {
    let len = array.length;
    for (let interval = Math.floor(len/2); interval > 0; interval = Math.floor(interval/2)) {
      for (let i = interval; i < len; i++) {
        for (let j = i; j >= interval && (yield compare(j, j - interval)) < 0; j -= interval) {
          yield swap(j, j - interval);
        }
      }
    }
  }
  
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

  export { bubbleSort, combSort, cockTailSort, insertionSort, shellSort, selectionSort, quickSort, mergeSort }