class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
  }
  addTopping(arr, topping) {    // Добавить добавку
    arr.push(topping);
  }
  removeTopping(arr, topping) { // Убрать добавку
    let indexOfTopping = arr.indexOf(topping);
    arr.splice(indexOfTopping, 1);
  }
  getToppings() {   // Получить список добавок
    let topping = [];
    const inputs = document.querySelectorAll(`.menu__input-topping`);
    this.initChangeEventCheckbox(inputs, topping);
  }
  getSize() {              // Узнать размер гамбургера
    let size = "";
    const inputs = document.querySelectorAll(`.menu__input-size`);
    this.initChangeEventRadio(inputs, size);
  }
  getStuffing() {          // Узнать начинку гамбургера
    let stuffing = "";
    const inputs = document.querySelectorAll(`.menu__input-stuffing`);
    this.initChangeEventRadio(inputs, stuffing);
  }
  initChangeEventRadio(elements, string) {
    elements = [].slice.call(elements);
    elements.map(element => {
      element.addEventListener('change', () => {
        string = element.value;
        this.calculatePrice(string);
        return string;
      });
    });
  }
  initChangeEventCheckbox(elements, arr) {
    elements = [].slice.call(elements);
    elements.map(element => {
      element.addEventListener('change', () => {
        if (arr.find(el => el === element.value)) {
          this.removeTopping(arr, element.value);
        } else {
          this.addTopping(arr, element.value);
        }
        return console.log(arr);
      });
    });
  }
  calculatePrice() {       // Узнать цену
    let sum = 0,
        arr = [];
    for(let i = 0; i < document.forms[0].elements.length; i++) {
      if(document.forms[0].elements[i].checked) {
        arr.push(document.forms[0].elements[i].value);
      }
    }
    console.log(this.getSize(), this.getStuffing());
  }
  calculateCalories() {    // Узнать калорийность

  }
}

let hamburger = new Hamburger;
hamburger.calculatePrice();
