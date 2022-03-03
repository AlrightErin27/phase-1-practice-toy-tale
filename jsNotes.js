/////////////////////////////////////////////////🪐🪐🪐🪐🪐GET INTO IT!🪐🪐🪐🪐🪐🪐//////////////////////////////////////////////////
//local of API
const ramenAPI = "http://localhost:3000/ramens";

//vars to grab els of HTML
const menu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail"); //this has an img, name & restaurant name as a placeholder
const form = document.querySelector("form");

fetch(ramenAPI) //goes to api
  .then((res) => res.json()) //access json data (✅ GET)
  .then(addRamenToPage) //display that data with CB Fxn (create later) (✅ GET)
  .catch((error) => console.log("ERROR️‍🔥:", error));

//fxn used in fetch ^^^
//goes through ramen Array (how data was store in JSON)
// for each item in arr add the image to the page using CB fxn
function addRamenToPage(ramenArr) {
  //   console.log(ramenArr);
  ramenArr.forEach(displayRamenObj);
}

//fxn used in addRamenToPage ^^^
//goes through ramenArr(input of fxn above)
function displayRamenObj(ramen) {
  const ramenImg = document.createElement("img"); // creates new img el called ramenImg
  ramenImg.src = ramen.image; // gives that el a src image from the json
  menu.append(ramenImg); //adds this image to the menu (put in specific place)
  //the 1st class fxn above (addRamenToPage) will run this fxn for every item in array

  //fxn created to deal with click image to change things in ramenDetail div
  ramenImg.addEventListener("click", () => {
    //console.log("🪐", ramen);
    displayRamenDetails(ramen); //this function is declared below and takes in the
    //specifically clicked el in ramenArr
  });
}

//This fxn uses dynamic JS to change teh placeholder info of the
//clicked ramen pics. changing the image, name, rest name, comments, and rating
function displayRamenDetails(ramen) {
  const detailImg = document.querySelector("#ramen-detail-image"); //grabs the image and dynamically changes the details
  detailImg.src = ramen.image; //images are special and need extra info (src and alt)
  detailImg.alt = ramen.name;

  document.querySelector("#ramen-detail-name").textContent = ramen.name; //these take in the details of the currently clicked ramen
  document.querySelector("#ramen-detail-restaurant").textContent = //and push them into where the placeholder text was
    ramen.restaurant;
  document.querySelector("#rating-display").textContent = ramen.rating;
  document.querySelector("#comment-display").textContent = ramen.comment;
}

form.addEventListener("submit", addNewRamen); //event handler on the form's submit button

function addNewRamen(e) {
  e.preventDefault();
  console.log("🤘 Name added:\n", e.target.name.value); //the specific obj clicked on (e.target). then attribute.value of obj

  const newRamen = {
    name: e.target.name.value,
    rating: e.target.rating.value,
    image: e.target.image.value, //this new image is given the src and alt attributes in displayRamenDetails Fxn
    restaurant: e.target.restaurant.value,
    comment: e.target["new-comment"].name.value, //used bracket notation b/c key of object is annoyingly named with a "-"
  };

  //re-use this already made function to get the new ramen obj to display on page
  displayRamenObj(newRamen);

  //reset the form for future used
  form.reset();
}
