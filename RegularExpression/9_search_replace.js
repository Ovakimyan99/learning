const t = 'Hello ${name}, your age is ${age}';

const user = {
    name: 'Bob',
    age: 22
}


// Мой вариант:
const r = /\${(\w+)}/g;
const res = t.matchAll(r);
/*
* Он не доделан. Дальше уже прям надо итерации по результатам делать. Немного не то.
* */

// Оптимальный вариант решения
t.replace(/\${[^}]+}/g, (str) => {
    console.log(str); // ${...}
    return user[str.slice(2, -1)]; // ...
})
console.log(t); // Исходная строка
