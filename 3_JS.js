//Класс Товар + метод для сортировки объектов класса
class Product {
  name = '';
  price = 0;
  quantity = 0;
  description = '';

  constructor(name, price = 0, quantity = 0, description = '') {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}

/*Функция поиска подходящих объектов
  *arr - массив с объектами
  *str - строка-команда для выборки*/
function getProducts(arr, str) {
  let res = [];       //массив с результатом
  let match;          //регулярка для выборки
  let funcArr = str.split('&');
  funcArr = funcArr.map(elem => elem.split('-')); 

  for (let func of funcArr) {
    if ((func[0] == 'name' || func[0] == 'description') && func.length == 3) {
      getTextMethod(func[0], func[2], arr, res, func[1]);
    } else if ((func[0] == 'name' || func[0] == 'description') && func.length == 2) {
      getTextMethod(func[0], func[1], arr, res);
    } else if (func[0] == 'price' || func[0] == 'quantity') {
      getNumberMethod(func[0], func[1], arr, res);
    }
  }

  /*работа с текстовыми свойствами
    *prop  - свойство объектов
    *text  - искомое сочетание символов
    *option - команда в запросе*/
  function getTextMethod(prop, text, arr, res, option = '') {
    if (option == 'contains') {
      match = new RegExp('.*' + text + '.*', 'gi');
    } else if (option == 'starts') {
      match = new RegExp('^' + text + '.*', 'gi');
    } else if (option == 'ends') {
      match = new RegExp('.*' + text + '$', 'gi');
    } else if (option == '') {
      match = new RegExp(text, 'gi');
    } else {
      throw {name: 'FunctionError', message: 'Такой команды не существует'}
    }

    if (res.length == 0) {
      for (let i = 0; i < arr.length; i++) {
        if (match.test(arr[i][prop])) {
          res.push(arr[i]);
        }
      }
      return res;
    } else {
      for (let i = 0; i < res.length; i++) {
        if (!match.test(res[i][prop])) {
          res.splice(i, 1);
        }
      }
      return res;
    }
  }
  
  /*Работа с числовыми методами
    *fulloption - оператор + число */
  function getNumberMethod(prop, fulloption, arr, res) {
    let num;
    let match1 = /^=\d+$/;
    let match2 = /^>\d+$/;
    let match3 = /^<\d+$/;
    let match4 = /^>=\d+$/;
    let match5 = /^<=\d+$/;
    
    if (res.length == 0) {
      if (match1.test(fulloption)) {
        num = fulloption.slice(1);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][prop] == num) {
            res.push(arr[i]);
          }
        }
        return res;
      } else if (match2.test(fulloption)) {
        num = fulloption.slice(1);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][prop] > num) {
            res.push(arr[i]);
          }
        }
        return res;
      } else if (match3.test(fulloption)) {
        num = fulloption.slice(1);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][prop] < num) {
            res.push(arr[i]);
          }
        }
        return res;
      } else if (match4.test(fulloption)) {
        num = fulloption.slice(2);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][prop] >= num) {
            res.push(arr[i]);
          }
        }
        return res;
      } else if (match5.test(fulloption)) {
        num = fulloption.slice(2);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][prop] <= num) {
            res.push(arr[i]);
          }
        }
        return res;
      }  

    } else {

      if (match1.test(fulloption)) {
        num = fulloption.slice(1);
        for (let i = 0; i < res.length; i++) {
          if (res[i][prop] != num) {
            res.splice(i, 1);
          }
        }
        return res;
      } else if (match2.test(fulloption)) {
        num = fulloption.slice(1);
        for (let i = 0; i < res.length; i++) {
          if (!(res[i][prop] > num)) {
            res.splice(i, 1);
          }
        }
        return res;
      } else if (match3.test(fulloption)) {
        num = fulloption.slice(1);
        for (let i = 0; i < res.length; i++) {
          if (!(res[i][prop] < num)) {
            res.splice(i, 1);
          }
        }
        return res;
      } else if (match4.test(fulloption)) {
        num = fulloption.slice(2);
        for (let i = 0; i < res.length; i++) {
          if (!(res[i][prop] >= num)) {
            res.splice(i, 1);
          }
        }
        return res;
      } else if (match5.test(fulloption)) {
        num = fulloption.slice(2);
        for (let i = 0; i < res.length; i++) {
          if (!(res[i][prop] <= num)) {
            res.splice(i, 1);
          }
        }
        return res;
      }  
    }
  }
  return res;
}

let products = [
  new Product('AppleFD', 2, 5, 'red apples abc'),
  new Product('Tomatofd', 4, 6, 'red tomatos'),
  new Product('fdEngines', 6, 5, 'from steel'),
  new Product('BananaFD', 6, 2, 'they are yellow'),
  new Product('FDOrangeFD', 6, 10, 'oranges abc'),
  new Product('CherFDry', 8, 12, 'lalala')
];

let str = "name-contains-fd&quantity->=5&description-ends-abc&price-<6";
console.log(getProducts(products, str));

