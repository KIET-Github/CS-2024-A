import { Worker } from "worker_threads";
import path from "path";



export const fibonacciService = async (num) =>
  new Promise((resolve, reject) => {
    //import worker file
    const worker = new Worker(path.join(__dirname + "/workerfibonacci.js"), {workerData:num});
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
    });
  });
