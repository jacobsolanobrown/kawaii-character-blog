// this will get the characters from the server and render them on the page
const renderCharacters = async () => {
  const response = await fetch('/characters');
  const data = await response.json();

  // create a main content element with id
  const mainContent = document.createElementById('main-content');

  // create a conditional redering based on whetehr the data is loaded or not
  if (date) {
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

      // create a p element for the character's description and set its text content to the character's description
      const description = document.createElement('p');
      description.textContent = character.description;
      bottomContainer.appendChild(description);

      // create a p element for the character's rating and set its text content to the character's rating
      const rating = document.createElement('h4');
      rating.textContent = `Rating: ${character.rating} Tier`;
      bottomContainer.appendChild(rating);

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

renderCharacters();