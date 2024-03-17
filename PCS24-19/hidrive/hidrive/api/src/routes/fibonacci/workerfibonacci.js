// import {findFibonacci}/ from './model.fibonacci'

const  { workerData, parentPort }= require( 'worker_threads')

const findFibonacci = (num) => {
    if (num <= 1) return num;
    return findFibonacci(num - 1) + findFibonacci(num - 2);
  };
parentPort.postMessage(findFibonacci(parseInt(workerData)) )