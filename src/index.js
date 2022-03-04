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
  const toyCollectionContainer = document.querySelector("#toy-collection");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector("form");

  //-----------------RENDER API TOYS() renders the toys already in the API--> then new ones once added
  function renderPreMadeToys(toysArr) {
    //console.log("🧸", toysArr);
    toysArr.forEach(displayToyCardsIndividually);
  }

  //-----------------Fxn used in .forEach above^^^ creates a card and displays it for all toys
  function displayToyCardsIndividually(toy) {
    let h2 = document.createElement("h2");
    h2.innerText = toy.name;

    let img = document.createElement("img");
    img.src = toy.image;
    img.alt = toy.image;
    img.setAttribute("class", "toy-avatar");

    let p = document.createElement("p");
    p.innerText = `likes: ${toy.likes}`;

    let button = document.createElement("button");
    button.innerText = "like";
    button.setAttribute("class", "like-btn");
    button.setAttribute("id", toy.id);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const updatedLike = ++toy.likes;
      fetch(`${toyAPI}/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ likes: updatedLike }),
      })
        .then((res) => res.json())
        .then((data) => (p.innerText = `likes: ${data.likes}`));

      // p.innerText = `likes: ${++toy.likes}`;
      // console.log(toy.likes);
    });
    // function handleLike() {}

    let toyCardDiv = document.createElement("div");
    toyCardDiv.append(h2, img, p, button);
    toyCardDiv.setAttribute("class", "card");

    toyCollectionContainer.append(toyCardDiv);
  }

  //-----------------EVENT LISTER() for add new toy button
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";

      //-----------------EVENT LISTER() submitting a new toy in the form
      form.addEventListener("submit", addNewToy);
      function addNewToy(e) {
        e.preventDefault();

        //console.log("😏 Added: ", e.target.name.value);
        const toy = {
          name: e.target.name.value,
          image: e.target.image.value,
          likes: 0,
        };
        displayToyCardsIndividually(toy);
        form.reset();
      }

      //-----------------EVENT LISTER() for adding a like++
      // document.querySelector(".like-btn").addEventListener("click", (e) => {
      //   // e.preventDefault();
      //   console.log(e.target.name.value);
      // });

      //
    } else {
      //if button not clicked, don't display toy container
      toyFormContainer.style.display = "none";
    }
  });
});
