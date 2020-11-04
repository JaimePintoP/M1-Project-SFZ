// ------------------- APOD ----------------------
// https://api.nasa.gov/planetary/apod?api_key=e6DggTe6We7GoAoc1uezggpzDaHufjTSr3DfzHod

const apodMedia = document.querySelector(".apod-media");

// Request to the server using the url
fetch(
  "https://api.nasa.gov/planetary/apod?api_key=e6DggTe6We7GoAoc1uezggpzDaHufjTSr3DfzHod"
)
  .then((response) => {
    //console.log("response", response);

    // convert a response boy into a JS object
    return response.json();
  })
  //after you get converted the data into an a readable object, then do something (next then)
  .then((data) => {
    //console.log("data", data);
    const apodDisplay = document.createElement("article");

    //check media type of the APOD
    if (data.media_type === "video") {
      //add iframe
      apodDisplay.innerHTML = `
      <iframe class="apod-video" width="420rem" height="315rem" src="${data.url}"></iframe>
      <h4>${data.title}</h4>
      <p class="image-text" >${data.explanation}</p> `;
    } else if (data.media_type === "image") {
      //add img
      apodDisplay.innerHTML = `
        <img class= "apod-image" src="${data.url}"/>
        <h5>${data.title}</h5>
        <p class="image-text" >${data.explanation}</p> 
        `;
    }
    // append to .apod-media
    apodMedia.appendChild(apodDisplay);
  });

// ------------------- SEARCH GALLERY ----------------------

// add the search input after the "=", moon is an example
// https://images-api.nasa.gov/search?q=moon

const galleryMedia = document.querySelector(".results-container");

// store the direction of the search bar and button input into variables
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

// random number function, to be used to get a random img from the search
function randomNum(number) {
  return Math.floor(Math.random() * number);
}

//Search engine
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  galleryMedia.innerHTML = "";

  fetch(`https://images-api.nasa.gov/search?q=${searchInput.value}`)
    .then((response) => {
      //console.log("response", response);
      return response.json();
    })

    .then((data) => {
      //console.log("data", data);

      const searchImage = document.createElement("article");

      //console.log("data.collection", data.collection.items);

      const items = data.collection.items;

      let imagesItems = items.map((item) => {
        if (item.data[0].media_type === "video") {
          return;
        } else {
          return item;
        }
      });

      //filter undefines elements - return the same array but without the ndefined elements (videos)
      imagesItems = imagesItems.filter(function (element) {
        return element !== undefined;
      });

      console.log("images items", imagesItems);

      const itemsArrPosition = imagesItems.length;

      //to add style to the searched images
      searchImage.setAttribute("class", "search-images");
      //console.log("items array position", itemsArrPosition);

      // check media type for the content collection.items[arrayPosition].data[arrayPosition].media_type = "video"

      searchImage.innerHTML = `
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      <img src="${imagesItems[randomNum(itemsArrPosition)].links[0].href}"/>
      `;

      console.log(galleryMedia);

      console.log("search image", searchImage);
      // append to .result-container
      galleryMedia.appendChild(searchImage);
    });
});
