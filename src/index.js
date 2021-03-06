import { createClient } from 'pexels';

const client = createClient(process.env.API_KEY);
// please see email for contents of .env file!



const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.querySelector('#loadingImage');
const imageSection = document.querySelector('.grid');
const pagination = document.querySelector('.pagination');
const header = document.querySelector('#header');


loadingImage.style.display = 'none';
pagination.style.display = 'none'

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  
  searchStart();
  search(searchTerm)
    .then(displayImages)
    .then(() => {
      loadingImage.style.display = 'none';
    });
}

function searchStart() {
  loadingImage.style.display = '';
  imageSection.innerHTML = '';
  pagination.style.display = ''
  header.style.marginTop = "0";
}

function search(searchTerm) {
  pictureList = [];
  let query = searchTerm;
  return client.photos.search({ query, per_page: 80 })  
        .then(photos => {
            return photos.photos;
        }
    );
}

let pictureList = [];
let page = 0;

function displayImages(images) {
  for (const i in images) {
    const imageElement = document.createElement('img');
    imageElement.src = images[i].src.large;
    imageElement.style.borderRadius = "30px";
    imageElement.setAttribute('class', 'myImg');
    imageElement.alt = `Photographer: ${images[i].photographer}`;
    imageElement.id = images[i].id;
    pictureList.push(imageElement);
  };

  page == pictureList.length - 10 ? page = 0 : page += 10;
  imageSection.innerHTML = "";
  for (var i = page; i < page + 10; i++) {
    imageSection.appendChild(pictureList[i]);
  }
}

/* PAGINATION */

document.addEventListener('click', function (event) {
	if (event.target.matches('.first')) {
    page = 0;
    imageSection.innerHTML = "";
    for (let i = page; i < page + 10; i++){
      imageSection.appendChild(pictureList[i]);
    }
  }
	if (event.target.matches('.next')) {
    page == pictureList.length - 10 ? (page = 0) : (page += 10);
    imageSection.innerHTML = "";
    for (let i = page; i < page + 10; i++){
      imageSection.appendChild(pictureList[i]);
    }
  }
  if (event.target.matches('.previous')) {
    page == 0 ? (page = pictureList.length - 10) : (page -= 10);
    imageSection.innerHTML = "";
    for (let i = page; i < page + 10; i++){
      imageSection.appendChild(pictureList[i]);
    }
  }
  if (event.target.matches('.last')) {
    page = pictureList.length - 10;
    imageSection.innerHTML = "";
    for (let i = page; i < page + 10; i++){
      imageSection.appendChild(pictureList[i]);
    }
  }
}, false);


/* MODAL */

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

document.addEventListener('click', function (event) {

	if (event.target.matches('img.myImg')) {
    var img = document.getElementById(event.target.id);

      modal.style.display = "block";
      modalImg.src = img.src;    
      modalImg.alt = img.alt;
      captionText.innerHTML = img.alt;
  }

	if (event.target.matches('.close')) {
      // Get the <span> element that closes the modal
      // When the user clicks on <span> (x), close the modal
        modal.style.display = "none";
  }
}, false);


/* Hover */

document.addEventListener('mouseover', function(event) {
	if (event.target.matches('img.myImg')) {
    var e = document.getElementById(event.target.id);
      e.style.opacity = "0.7";
      e.style.cursor = "pointer";
  }
});

document.addEventListener('mouseout', function(event) {
	if (event.target.matches('img.myImg')) {
    var e = document.getElementById(event.target.id);
      e.style.opacity = "1.0";
      e.style.cursor = "none";
  }
});