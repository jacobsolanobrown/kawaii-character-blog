// get the header element from the DOM
const header = document.querySelector('header');

// create div
const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';

// create div for left side of header
const headerLeft = document.createElement('div');
headerLeft.className = 'header-left';

// create an img element for the logo and set its source to the logo image in the public folder
const logo = document.createElement('img');
logo.src = '/logo.jpeg';
logo.alt = 'Kawaii Characters Logo';
logo.className = 'logo';

// create an h1 element for the title of the website
const title = document.createElement('h1');
title.textContent = 'KAWAII CHARACTERS';
title.className = 'header-title';

// append the logo and title to the left side of the header
headerLeft.appendChild(logo);
headerLeft.appendChild(title);

// create a dive for the right side of the header
const headerRight = document.createElement('div');
headerRight.className = 'header-right';

// create a button element and se t its text content to "Home"
const homeButton = document.createElement('button');
homeButton.textContent = 'Home';
homeButton.className = 'header-button';
// add an event listener to the home button that redirects the user to the root url of the server when clicked
homeButton.addEventListener('click', function handleClick(event) {
  window.location.href = '/';
});
// append the home button to the right side of the header
headerRight.appendChild(homeButton);

// append the left and right sides of the header to the header container
headerContainer.appendChild(headerLeft);
headerContainer.appendChild(headerRight);

// append the header container to the header element in the DOM
header.appendChild(headerContainer);