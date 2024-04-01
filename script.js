const accessKey = "vNqsZ6dKyeSQn5dpF5U69njlUoxB3727W1NpPEiYlpc";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    
    const response = await fetch(url);
    const data = await response.json();

    if(page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click",()=>{
    page++;
    searchImages();
})


// ?Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".sub_nav_page");
const navClose = document.querySelector(".nav-close");
const backButton = document.querySelector('.back_btn');
const successSection = document.querySelector('.success_section');

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  navMenu.classList.toggle("active");
  navClose.classList.toggle("active");
}

// Close navbar when link is clicked
const closeNav = document.querySelectorAll(".close");
const closeNav2 = document.querySelectorAll(".close2");

closeNav.forEach((n) => n.addEventListener("click", closeMenu));
closeNav2.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navClose.classList.remove("active");
  navMenu.classList.remove("active");
}

// close Success page
backButton.addEventListener('click', () => {
  successSection.classList.add('hide');
});

// Contact Form
const contactForm = document.getElementById('contact_form');

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData2 = new FormData(contactForm);
  const requestBody2 = Object.fromEntries(formData2.entries());

  fetch('https://backend.getlinked.ai/hackathon/contact-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody2)
  })
    .then(response => response.json())
    .then(data => {
      successSection.classList.remove('hide');
      console.log('Success', data);
    })
    .catch(error => {
      console.error('Error', error);
    });
});
