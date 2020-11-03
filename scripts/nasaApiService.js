"use strict";

// ------------------- APOD ----------------------
// https://api.nasa.gov/planetary/apod?api_key=e6DggTe6We7GoAoc1uezggpzDaHufjTSr3DfzHod

const apodMedia = document.querySelector(".apod-media");

// Request to the server using the url
fetch(
  "https://api.nasa.gov/planetary/apod?api_key=e6DggTe6We7GoAoc1uezggpzDaHufjTSr3DfzHod"
)
  .then((response) => {
    console.log("response", response);

    // convert a response boy into a JS object
    return response.json();
  })
  //after you get converted the data into an a readable object, then do something (next then)
  .then((data) => {
    console.log("data", data);
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
