const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch('http://localhost:5000/weather?location=' + location)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        messageOne.textContent = data.address
        messageTwo.textContent = data.forecast
    })
    .catch((error) => {
      console.log(error);
    });

});
