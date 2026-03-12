// this will get the characters from the server and render them on the page
const renderCharacters = async () => {
  const response = await fetch('/characters');
  const data = await response.json();
  console.log(data);

  // get the main content element from the DOM
  const mainContent = document.getElementById('main-content');

  // data.characters is the array of character objects that we sent from the
  // server in the /characters route, so we can map through that array
  // and create a card for each character to display on the page


  // ISSUE HERE - DATA MISMATCH SINCE SERVER RETURNS A DIRECT ARRAY WHERE PREVIOUSLY WE HAD AN 
  // OBJECT BEING RETURNED - MUST CHANGE THIS TO JUST DATA INSTEAD OF DATA.CHARACTERS OR 
  // CHANGE THE SERVER TO RETURN AN OBJECT WITH A CHARACTERS PROPERTY THAT CONTAINS THE ARRAY

  // create a conditional redering based on whetehr the data is loaded or not
  if (data) {
    // map through the data and create a card for each character
    data.map((character) => {
      // create a card element for each character
      const card = document.createElement('div');
      card.className = 'card';

      // create another div element for the card content
      const topContainer = document.createElement('div');
      topContainer.classList.add('top-container');

      // create a bottom container for the card content
      const bottomContainer = document.createElement('div');
      bottomContainer.classList.add('bottom-container');

      // set the top container to the character's image
      topContainer.style.backgroundImage = `url(${character.image})`;

      // create an h3 element for the character's title and set its text content to the character's title
      const title = document.createElement('h3');
      title.textContent = character.title;
      bottomContainer.appendChild(title);

      // create a h4 element for the character's rating and set its text content to the character's rating
      const rating = document.createElement('h4');
      rating.textContent = `Rating: ${character.rating} Tier`;
      bottomContainer.appendChild(rating);

      // create a p element for the character's description and set its text content to the character's description
      const description = document.createElement('p');
      description.textContent = character.description;
      bottomContainer.appendChild(description);

      // create an a element to link to the character's page and set its href attribute to the character's id
      const link = document.createElement('a');
      link.textContent = 'Read More >';
      link.href = `/characters/${character.id}`;
      link.setAttribute('role', 'button');
      bottomContainer.appendChild(link);

      // apend the top and bottom containers to the card element
      card.appendChild(topContainer);
      card.appendChild(bottomContainer);

      // append the card element to the main content element
      mainContent.appendChild(card);
    });
  } else {
    // create a message element to display that there was no data to load
    const message = document.createElement('h2');
    message.textContent = 'No characters to display :(';
    mainContent.appendChild(message);
  }
};

const renderCharacter = async () => {
// use fetch to get the character dat using the /characters endpoint
  const response = await fetch('/characters');
  const data = await response.json();
  console.log(data);

  // get character content dom element
  const characterContent = document.getElementById('character-content');

  // var to store the character that matches the requested id
  let character;

  // find the character in the data that matches the requested id and store it in the character variable
  character = data.characters.find((character) => character.id === requestedID);
  console.log(character);
  // TODO: this doesnt even print out 
  if (!character) {
    console.error('Character not found');
  }
  // if the character variable is not undefined, then we found a character that matches the requested id
  // and we can render the character page, otherwise we can render a message that says the character was not found
  if (character) {
    document.getElementById('image').src = character.image;
    document.getElementById('title').textContent = character.title;
    document.getElementById('description').textContent = character.description;
    document.getElementById('rating').textContent =
      'Rating: ' + character.rating + ' Tier';
    document.getElementById('ratingDescription').textContent =
      'Why: ' + character.ratingDescription;
    document.getElementById('rankingDate').textContent = character.rankingDate;
  } else {
    // create a message element to display that there was no data to load
    const message = document.createElement('h2');
    message.textContent = 'Couldnt find the character to display :(';
    characterContent.appendChild(message);
  }
}

const requestedUrl = window.location.href.split('/').pop();
const requestedID = parseInt(requestedUrl);
const isValidCharacterId = !isNaN(requestedID) && requestedID > 0;

// Check if we have a valid character ID in the URL
if (isValidCharacterId) {
  // Render single character page
  renderCharacter();
} else if (!requestedUrl) {
  // Render character list homepage
  renderCharacters();
} else {
  // Invalid URL pattern, redirect to 404
  window.location.href = '../404.html';
}