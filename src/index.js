let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  //-----------------FETCH TOY JSON
  const toyAPI = "http://localhost:3000/toys";
  fetch(toyAPI)
    .then((res) => res.json())
    .then(renderPreMadeToys)
    .catch((err) => console.log("ERROR️‍🔥:", err));

  //-----------------GLOBAL VARS
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector("form");

  //-----------------RENDER API TOYS() renders the toys already in the API
  function renderPreMadeToys(toysArr) {
    console.log("🧸", toysArr);
    toysArr.forEach(displayToyCardsIndividually);
  }

  function displayToyCardsIndividually(toy) {
    console.log(toyFormContainer);
  }

  // function displayRamenObj(ramen) {
  //   const ramenImg = document.createElement("img"); // creates new img el called ramenImg
  //   ramenImg.src = ramen.image; // gives that el a src image from the json
  //   menu.append(ramenImg); //adds this image to the menu (put in specific place)
  //   //the 1st class fxn above (addRamenToPage) will run this fxn for every item in array

  //   //fxn created to deal with click image to change things in ramenDetail div
  //   ramenImg.addEventListener("click", () => {
  //     //console.log("🪐", ramen);
  //     displayRamenDetails(ramen); //this function is declared below and takes in the
  //     //specifically clicked el in ramenArr
  //   });
  // }

  //-----------------EVENT LISTER() for add new toy button
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      form.addEventListener("submit", addNewToy);
      function addNewToy(e) {
        e.preventDefault();
        //console.log("😏 Added: ", e.target.name.value);
        const newToy = {
          name: e.target.name.value,
          image: e.target.image.value,
          likes: 0,
        };
        toyFormContainer.append(newToy);
      }
    } else {
      //if button not clicked, don't display toy container
      toyFormContainer.style.display = "none";
    }
  });
});
