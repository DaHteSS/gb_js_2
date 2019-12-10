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
    this.initChangeEventCheckbox(inputs, topping)
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
  calculatePrice() {       // Узнать цену

  }
  calculateCalories() {    // Узнать калорийность

  }
  initChangeEventRadio(elements, string) {
    elements = [].slice.call(elements);
    elements.map(element => {
      element.addEventListener('change', () => {
        string = element.value;
        return console.log(string);
      });
    });
  }
  initChangeEventCheckbox(elements, arr) {
    elements = [].slice.call(elements);
    elements.map(element => {
      element.addEventListener('change', () => {
        if(arr.find(el => el === element.value)) {
          this.removeTopping(arr, element.value);
        } else {
          this.addTopping(arr, element.value);
        }
        return console.log(arr);
      });
    });
  }
}

let hamburger = new Hamburger;
hamburger.getSize();
hamburger.getStuffing();
hamburger.getToppings();
