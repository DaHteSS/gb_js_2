// Класс для чата

// Подсмотрел у Вас некоторые вещи. Сложно самому продумать структуру класса...
// Например изначально не думал о добавлении класса "Пользователь", чтобы динамически выводить имя пользователя и должность.

class User {
  constructor(name = 'Пользователь', position = 'Консультант') {
      this.name = name;
      this.position = position;
  }
}

class Message {
  constructor(text = 'Здраствуйте! Я могу вам чем-то помочь?', messageOwner = 'chat__consultant') {
      this.text = text;
      this.messageOwner = messageOwner;
  }
  render() {
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      return `
          <div class="${this.messageOwner}">
              <span class="chat__message-time">${hours}:${minutes}</span>
              <p class="chat__message-text">${this.text}</p>
          </div>`;
  }
}

class Chat {
  constructor(user = new User()) {
      this.container = null;
      this.user = user;
      this.render();
  }
  initClickEvents() {
      const header = this.container.querySelector('.chat__header');
      const btn = this.container.querySelector('.chat__close');

      header.addEventListener('click', () => {
          this.showChat();
      });
      btn.addEventListener('click', () => {
          this.hideChat();
      });
  }
  showChat() {
      this.container.classList.remove('chat__hidden');
  }
  hideChat() {
      this.container.classList.add('chat__hidden');
  }
  initKeyUpEvent() {
      const textarea = this.container.querySelector(".chat__textarea");
      textarea.addEventListener("keyup", e => {
              e.preventDefault();
              if (e.keyCode === 13 && textarea.value.trim() !== "") {
                  const message = new Message(textarea.value, "chat__message");
                  textarea.value = "";
                  this.addMessage(message);
                  this.container.querySelector(".chat__content").scrollTop = 9999;
              }
          });
  }
  addMessage(message) {
      this.container.querySelector(".chat__content")
              .innerHTML += message.render();
      console.log(message)
  }
  render() {
      this.container = document.createElement('div');
      this.container.classList.add('chat__wrap', 'chat__hidden');
      this.container.innerHTML = `
          <svg class="chat__close" width="25" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 475.2 475.2" xml:space="preserve">
              <path d="M405.6,69.6C360.7,24.7,301.1,0,237.6,0s-123.1,24.7-168,69.6S0,174.1,0,237.6s24.7,123.1,69.6,168s104.5,69.6,168,69.6 s123.1-24.7,168-69.6s69.6-104.5,69.6-168S450.5,114.5,405.6,69.6z M386.5,386.5c-39.8,39.8-92.7,61.7-148.9,61.7 s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7,0-297.8C128.5,48.9,181.4,27,237.6,27s109.1,21.9,148.9,61.7 C468.6,170.8,468.6,304.4,386.5,386.5z"/>
              <path d="M342.3,132.9c-5.3-5.3-13.8-5.3-19.1,0l-85.6,85.6L152,132.9c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1 l85.6,85.6l-85.6,85.6c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.6-85.6l85.6,85.6c2.6,2.6,6.1,4,9.5,4 c3.5,0,6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-85.4-85.6l85.6-85.6C347.6,146.7,347.6,138.2,342.3,132.9z"/>
          </svg>
          <div class="chat">
              <div class="chat__header">
                  <div class="chat__header-content">
                      <svg class="chat__avatar" width="45" height="45" version="1.1" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 53 53"
                          style="enable-background:new 0 0 53 53;" xml:space="preserve">
                          <path style="fill:none;"
                              d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53 c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322 c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546 c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126 c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24 C20.296,39.899,19.65,40.986,18.613,41.552z" />
                          <g>
                              <path style="fill:#555555;"
                                  d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76 c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633 c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977 s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53 c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233 c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z" />
                          </g>
                      </svg>
                      <div class="chat__header-wrap">
                          <span class="chat__header-text">Чат</span>
                          <span class="chat__header-text">${this.user.name}</span>
                          <span class="chat__header-text">${this.user.position}</span>
                      </div>
                  </div>
              </div>
              <div class="chat__content">
              </div>
              <div class="chat__footer">
                  <div class="chat__footer-wrap">
                      <textarea class="chat__textarea" placeholder="Введите сообщение и нажмите Enter"></textarea>
                      <button class="chat__footer-btn">
                          <svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                              <g>
                                  <path d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M256,490.667 C126.604,490.667,21.333,385.396,21.333,256S126.604,21.333,256,21.333S490.667,126.604,490.667,256S385.396,490.667,256,490.667 z" />
                                  <path d="M393.385,299.115c-5.781-1.385-11.49,2.177-12.844,7.906c-13.75,57.885-64.958,98.313-124.542,98.313 c-59.656,0-110.885-40.49-124.573-98.448c-1.365-5.75-7.146-9.24-12.833-7.938c-5.74,1.354-9.292,7.104-7.938,12.833 c15.979,67.646,75.75,114.885,145.344,114.885c69.51,0,129.26-47.167,145.292-114.708 C402.656,306.219,399.115,300.469,393.385,299.115z" />
                                  <circle cx="170.667" cy="192" r="21.333" />
                                  <circle cx="341.333" cy="192" r="21.333" />
                              </g>
                          </svg>
                      </button>
                      <button class="chat__footer-btn">
                          <svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 30.34 30.34" style="enable-background:new 0 0 30.34 30.34;" xml:space="preserve">
                              <path d="M22.562,12.491c0,0,1.227-0.933,0.293-1.866c-0.934-0.933-1.842,0.271-1.842,0.271l-9.389,9.391 c0,0-2.199,2.838-3.871,1.122c-1.67-1.718,1.121-3.872,1.121-3.872l12.311-12.31c0,0,2.873-3.165,5.574-0.466 c2.697,2.7-0.477,5.579-0.477,5.579L12.449,24.173c0,0-4.426,5.113-8.523,1.015s1.066-8.474,1.066-8.474L15.494,6.209 c0,0,1.176-0.982,0.295-1.866c-0.885-0.883-1.865,0.295-1.865,0.295L1.873,16.689c0,0-4.549,4.989,0.531,10.068 c5.08,5.082,10.072,0.533,10.072,0.533l16.563-16.565c0,0,3.314-3.655-0.637-7.608s-7.607-0.639-7.607-0.639L6.543,16.728 c0,0-3.65,2.969-0.338,6.279c3.312,3.314,6.227-0.39,6.227-0.39L22.562,12.491z"/>
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
      `;
      this.initClickEvents();
      this.initKeyUpEvent();
      document.body.appendChild(this.container);
  }
}

const consultant = new User("Тэглайн", "Консультант");
const chat = new Chat(consultant);
const message = new Message();
chat.addMessage(message);