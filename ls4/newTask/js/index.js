class Text {
  constructor(text) {
    this.text = text;
  }
  addText() {
    this.text = this.regExp(this.text)
    document.querySelector(".text").innerHTML = this.text;
  }
  regExp(text) {
    const regExp = /'(?=[^A-zА-яЁё]|$)|(?<=^|[^A-zА-яЁё])'/g;
    return text.replace(regExp, `"`);
  }
}
let text = `'Слава богу, – сказала девушка, – насилу вы приехали. Чуть было вы барышню не уморили' (По Пушкину) 
            В этом примере прямая речь состоит из двух предложений, первое из которых разорвано словами автора. 
            Но если бы слова автора оказались между двумя предложениями, из которых состоит прямая речь, то после 
            слов автора нужно было бы поставить точку. Сравните: 'Слава богу, насилу вы приехали, – сказала девушка. 
            – Чуть было вы барышню не уморили'. А вот тут начинается та часть где нужно улучшить шаблон, чтобы одинарная 
            кавычка в словах типа aren't не менялась на двойную. Кил'джеден.`
const newText = new Text(text);
newText.addText();

class Validation {
  constructor() {
    this.nameRegExp = /[A-zА-яЁё]/g;
    this.phoneRegExp = /\+7\(\d{3}\)\d{3}-\d{2}-?\d{2}/g;
    this.mailRegExp = /^.+(\.?|-?).+@[A-Za-z]+\.[A-Za-z]{2,3}$/g;
    this.textRegExp = /^.*/gm;
  }
}