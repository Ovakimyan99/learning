function doSomething2() {
  /*
    waterfall - водопад, потому что функции можно было друг за дружкой вызывать и передавать
    результаты из одной в другую.
  */
  Async.waterfall([
    (cb) => openFile(path, cb),
    (content, cb) => {
      try {
        content = normalize(content);
      } catch (error) {
        console.error(error);
      }

      genHash(content, cb);
    },
    (hash, cb) => fetch(`/foo?hash=${hash}`, cb),
    (data, cb) => writeFile(path, data, cb)
  ],
  (err) => {
    if (err != null) {
      console.log(err);
      return;
    }
  });
}


function openFile(path, cb) {}

function normalize(content) {}

function genHash(content, cb) {}

function fetch(url, cb) {}

function writeFile(path, cb) {}
