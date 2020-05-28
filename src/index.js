import { createClient } from 'pexels';
const client = createClient(process.env.API_KEY);
// please see email for contents of .env file!

const first = document.querySelector('.first');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
const last = document.querySelector('.last');


const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.querySelector('#loadingImage');
const imageSection = document.querySelector('.grid');

loadingImage.style.display = 'block';

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
}

function search(searchTerm) {
  let query = searchTerm;
  return client.photos.search({ query, per_page: 50 })  
        .then(photos => {
          console.log(photos.photos);
            return photos.photos;
        }
    );
}

let pictureList = [];
let page = 0;


function displayImages(images) {
  console.log(images)
  for (const i in images) {
    const imageElement = document.createElement('img');
    imageElement.src = images[i].src.large;
    pictureList.push(imageElement);
  };

  for (let i = 0; i < page + 10; i++){
    imageSection.appendChild(pictureList[i]);
  }
}

next.addEventListener("click", () => {
  page == pictureList.length - 10 ? (page = 0) : (page += 10);
  imageSection.innerHTML = "";
  for (let i = page; i < page + 10; i++){
    imageSection.appendChild(pictureList[i]);
  }
});

previous.addEventListener("click", () => {
    page == 0 ? (page = pictureList.length - 10) : (page -= 10);
    imageSection.innerHTML = "";
    for (let i = page; i < page + 10; i++){
      imageSection.appendChild(pictureList[i]);
    }
});

first.addEventListener("click", () => {
  page = 0;
  imageSection.innerHTML = "";
  for (let i = page; i < page + 10; i++){
    imageSection.appendChild(pictureList[i]);
  }
});

last.addEventListener("click", () => {
  page = pictureList.length - 10;
  imageSection.innerHTML = "";
  for (let i = page; i < page + 10; i++){
    imageSection.appendChild(pictureList[i]);
  }
});
