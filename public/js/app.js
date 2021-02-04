const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");

messageTwo.textContent = "";
messageThree.textContent = "";
messageFour.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
        messageThree.textContent = "";
        messageFour.textContent = "";
      } else {
        console.log(data.forecast.forecast1);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.forecast1;
        messageThree.textContent = data.forecast.forecast2;
        messageFour.textContent = data.forecast.forecast3;
      }
    });
});
