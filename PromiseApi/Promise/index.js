function doSomething(path) {
  openFile(path)
    .then(getHash(normalize))
    .then((hash) => fetch(`/foo?hash=${hash}`))
    .then((data) => writeFile(path, data))
    .catch(console.error);
}

async function doSomethingAsync(path) {
  try {
    const content = await openFile(path);
    const hash = await getHash(normalize(content));
    const data = await fetch(`/foo?hash=${hash}`);
    return await writeFile(path, data);
  } catch (error) {
    console.error(error);
  }
}

function openFile(path, cb) {}

function normalize(content) {}

function getHash(content, cb) {}

function fetch(url, cb) {}

function writeFile(path, cb) {}
