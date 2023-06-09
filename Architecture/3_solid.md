### Принципы SOLID
Роберт Мартин

1. S (SRP) - Принцип единой ответственности
2. O (OCP) - Принцип открытости/закрытости
3. L (LCP) - Принцип заменяемости
4. I (ISP) - Принцип разделения интерфейсов
5. D (DIP) - Принцип инверсии зависимостей

---
Разберем каждый принцип:

### S / Принципе единой ответственности

Рассмотрим класс, который отвечает за виджет:
```
class Widget {
    loadFromStorage() {}

    getDataFromServer() {}
    
    // Рендер узлов, например
    render() {}

    // Вставка в DOM
    mount() {}
}
```
Класс `widget` может уметь рендериться, вставлять в дом, иметь жизненный цикл,
но почему он должен уметь запрашивать данные с сервера или какого-то хранилища?

`Widget` должен уметь обрабатывать данные, вот это должен.

Принцип единой ответственности говорит о том, что класс должен быть сфокусирован
вокруг одной сущности.

А как нам получать данные из хранилищ?  
Решаться это должно через композицию:  
```
// widget.ts

class LocalStorage {
    load() {}
}

class Server {
    load() {}
}

class Widget {
    localStorage = new LocalStorage();
    server = new Server();
    
    render() {}
    
    mount() {}
}
```
По сути мы применили паттерн мост.

---
Ранее по познакомились с метрикой `декларативность`, а есть еще метрика `связность`.
`Связность` говорит о том, насколько API нашего модуля сфокусировать вокруг одной сущности.
В данном случае он у нас расфокусированный, тк `Server` и `LocalStorage` мы можем использовать
в других местах.


### Принцип открытости / закрытости
Этот принцип ранее мы частично рассмотрели. Нужно стараться писать наш код так,
чтобы их не требовалось дополнять. Реальный мир чуть сложнее, но хотя бы, чтобы
новый код был на уровне реализации, не трогали API. К этому нужно стремиться.

Достигать принципа открытости / закрытости можно с помощью композиции. Собственно,
принцип так и звучит: "Он должен быть открыт для расширения и закрыт для модификаций".

Можно реализовывать новый функционал, но не изменять текущий.

### Принцип заменяемости Лискова
Этот принцип жестко полагается на то, что у нас объектно-ориентированный язык,
есть поддержка наследования, возможность выстраивать вертикальные иерархии - один
объект наследуется от другого.

Принцип говорит о следующем:  
Если в программе есть функция или метод, которые ожидают входным параметром значение
определенного типа, то мы должны иметь возможность в любой момент времени вызвать
нашу функцию не только с экземпляром супер класса, но и с любым его потомком. И наша
программа при этом должны работать.

Пример:
```
class Button extends Widget {}

function showWidgetInfo(widget: Widget) {
    console.log(widget);
}

showWidgetInfo(new Widget());
showWidgetInfo(new Button());
```

Например, если в классе `Widget` метод render возвращает строку, то мы не можем
разрывать контракты и переопределять этот метод в классе `Button` и возвращать
число.

То, что мы вместо конкретного типа передаем его потомка называется `полиморфизм подтипов`.
Поэтому можно сказать, что наш параметр `widget` функции `showWidgetInfo` ко-вариантен по
имени класса `Widget`.

Ко-вариантность означать, что мы можем передать не только экземпляр этого класса, но
и его потомков.

### Принцип разделения интерфейсов
Мы его применяли в разделе ООП. Суть в том, чтобы не делать большой монолитный класс,
который пытается охватить все возможные кейсы. Лучше дробить.

### Принцип инверсии зависимостей
Этот принцип в Js может быть не таким важным, потому что в силу динамической
типизации все друг другу полиморфно.

Принцип говорит о том, что, например, при указывании типов нам не надо ссылаться
на конкретную реализацию, а на интерфейс.

На примере с `Widget` мы могли бы поступить так:
```
interface AbstractWidget {
    render(): string;
    mounted(): void;
}

class Widget implements AbstractWidget {}

function showWidgetInfo(widget: AbstractWidget) {}
```

Мы ссылаемся не на конкретную реализацию `Widget` в функции, а на интерфейс, что делает
наш код более гибким.
