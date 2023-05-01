function openFile(path, cb) {}

function normalize(content) {}

function genHash(content, cb) {}

function fetch(url, cb) {}

function writeFile(path, cb) {}

/*
* Многие операции могут завершиться неудачей, а у нас только колбеки.
* Как с этим работать? (*)
*/

// Мы рассмотрим 2 варианта на функции openFile:

/* 1. Мы можем передавать третий параметр.
  У такого подхода есть свои плюсы и минусы */

openFile(path, onSuccess, onError)

/*  2. Во втором аргументе мы можем принимать 2 параметра.
  Этот подход более распространен в nodejs: */

openFile(path, (err, content) => {
  if (!err) {
    return;
  }

  // Do something
})

// ---------------
// Отступление по поводу обработки ошибок.
/*
  Вопрос: Сможем ли мы так обработать ошибку вызова функции openFile?
*/
try {
  openFile('path', (err, content) => {
    if (!err) {
      return;
    }
  
    // Do something
  })  
} catch (error) {
  console.error(error);
}

/* Ответ:
  Нет, не сможем, потому что `try catch` работает с синхронным кодом, а
  написанный callback выполнится неизсвестно когда. Поэтому мы можем его
  обработать внутри функции callback:
*/

openFile('path', (err, content) => {
  if (!err) {
    return;
  }

  try {
    // Do something
  } catch (error) {
    console.log(error);
  }
})

// ---------------

/*
 С учетом логики приложения, что мы хотим от этих функций?
 1. Открыть файл
 2. Нормализовать содержимое файла
 3. Посчитать хеш от содержимого
 4. Отправляем запрос на другой сервер и передаем хеш
 5. Записываем содержимое ответа на ФС

 И для начала нам нужна функция, которая будет внутри себя все это
 делать. Некий фасад.
*/

function doSomething(path) {
  openFile(path, (err, content) => {
    if (err != null) {
      console.error(err);
      return;
    }

    try {

      content = normalize(content);
      getHash(content, (err, hash) => {
        if (err != null) {
          console.error(err);
          return;
        }

        fetch('/foo?${hash}', (err, data) => {
          if (err != null) {
            console.error(err);
            return;
          }

          writeFile(path, data, (err) => {
            if (err != null) {
              console.error(err);
            }
          });
        })
      });

    } catch (error) {
      console.error(error);
    }
  })
}
