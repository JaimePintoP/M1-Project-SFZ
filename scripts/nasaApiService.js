"use strict";

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
      <iframe width="420rem" height="315rem" src="${data.url}"></iframe>
      <h4>${data.title}</h4>
      <p class="apod-text" >${data.explanation}</p> `;
    } else {
      //add img
      apodDisplay.innerHTML = `
        <img src="${data.url}/>
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

function randomNum(number) {
  return Math.floor(Math.random() * number);
}

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

      //   const randomImg = Math.floor(
      //     Math.random() * data.collection.items.length
      //   );

      //console.log(randomImg);

      // check media type for the content collection.items[arrayPosition].data[arrayPosition].media_type. Put random in items[random]
      searchImage.innerHTML = `
      <img src="${
        data.collection.items[randomNum(data.collection.items.length)].links[0]
          .href
      }"/>
      <img src="${
        data.collection.items[randomNum(data.collection.items.length)].links[0]
          .href
      }"/>
      <img src="${
        data.collection.items[randomNum(data.collection.items.length)].links[0]
          .href
      }"/>
      `;

      console.log(galleryMedia);

      console.log("search image", searchImage);
      // append to .result-container
      galleryMedia.appendChild(searchImage);
    });
});
