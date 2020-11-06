'use strict'

const v8 = require('v8')

let t = v8.getHeapStatistics().total_available_size;

console.log((t/1024/1024/1024).toFixed(2), "GB");