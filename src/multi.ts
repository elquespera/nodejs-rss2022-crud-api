import cluster from "cluster";
import { cpus } from "os";

import runServer from './server.js';

const cpuNumber = cpus().length;


const runCluster = (number: number = cpuNumber) => {
    if (cluster.isPrimary) {

        //Set Round-Robin scheduling for better load balancing
        cluster.schedulingPolicy = cluster.SCHED_RR;

        for (let i = 0; i < number; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker) => {
            console.log(`Worker ${worker.process.pid} has exited`);
        });
    } else {
        runServer(true);
        console.log(`Worker process ${process.pid} started`);
    }
}

runCluster();