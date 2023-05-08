// sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(300).then(() => {
  console.log('Салам алейкум');
})

// rejectAfterSleep
function rejectAfterSleep(ms, error) {
  return new Promise((_, reject) => sleep(ms).then(() => reject(error)));
}

rejectAfterSleep(200, 'boom!').catch((err) => {
    console.log(err);
});

// timeout
function timeout(promise, ms) {

  return Promise.race([
      promise,
      rejectAfterSleep(ms, new Error('Timeout')),
  ]);
}

timeout(sleep(400).then(() => 'Heu'), 500).then(console.log, console.log);


// once
function once($el, event) {
    return new Promise((resolve) => {
        $el.addEventListener(event, resolve);
    });
}

// promisify
function promisify(cb) {
    return function(args) {
        return new Promise((res) => cb(args, res));
    }
}

// function openFile(file, cb) {
//     fs.readFile(file, cb);
// }
//
// const openFilePromise = promisify(openFile);
//
// openFilePromise('foo.txt').then(console.log, console.error);

// allLimit
function allLimit(promises, limit) {
    const result = [];

    return new Promise(async (resolve, reject) => {
        try {
            while (result.length < promises.length) {
                await Promise.all(
                    promises.slice(result.length, result.length + limit + 1)
                )
                    .then(res => result.push(...res))
                    .catch(reject);
            }

            resolve(result);
        } catch (e) {
            console.error(e);
        }
    });
}

allLimit([
    sleep(1000),
    sleep(1500),
    sleep(3000),
    sleep(3500),
], 2)

// abortablePromise
function abortablePromise(promise, signal) {
    return new Promise((resolve, reject) => {
        signal.addEventListener('abort', reject);
        promise.then(resolve, reject);
    })
}
