//работа с числами любой длины
export default class BigInts {

  #num1 = 0;
  #num2 = 0
  #sum = 0;
  #diff = 0;
  #product = 0;
  #division = 0;
  #rest = 0;

  constructor(num1, num2) {
    this.#checkData(num1, num2);
    this.#num1 = BigInt(num1);
    this.#num2 = BigInt(num2);
  }

  set num1(value) {
    this.#checkData(value, '1');
    this.#num1 = BigInt(value);
  }

  set num2(value) {
    this.#checkData(value, '1');
    this.#num2 = BigInt(value);
  }

  get num1() {
    return this.#num1;
  }

  get num2() {
    return this.#num2;
  }  

  getSum() { //метод для суммы
    this.#sum = this.#num1 + this.#num2;
    return this.#sum.toString();
  }

  getDiff() { //метод для разности
    this.#diff = this.#num1 - this.#num2;
    return this.#diff.toString();
  }

  getProd() { //произведение
    this.#product = this.#num1 * this.#num2;
    return this.#product.toString();
  }

  getDiv() { //деление + деление с остатком
    this.#division = this.#num1 / this.#num2;
    this.#rest = this.#num1 % this.#num2;
    if ( this.#rest != 0n ) {
      return `${ (this.#division).toString() } остаток ${ (this.#rest).toString() }`;
    }
    return this.#division.toString();
  }

  #checkData(str1, str2) {
    if (str1 == '' || str2 == '' || str1 === null || str2 === null) {
      throw {name: 'NullError', message: 'Введены пустые значения'};
    } else if (typeof str1 !== 'string' || typeof str2 !== 'string') {
      throw {name: 'TypeError', message: 'Необходимо ввести числа в формате string'};
    } else {
      return str1, str2;
    }
  }
}


