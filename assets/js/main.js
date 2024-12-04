document.addEventListener('DOMContentLoaded', () => {
  // Define the sample data for each category (TV shows, movies, podcasts)
  const tvShows = ['TV-Show_1', 'TV-Show_2', 'TV-Show_3', 'TV-Show_4', 'TV-Show_5'];  // TV show items
  const movies = ['Movie_1', 'Movie_2', 'Movie_3', 'Movie_4', 'Movie_5'];  // Movie items
  const podcasts = ['Podcast_1', 'Podcast_2', 'Podcast_3', 'Podcast_4', 'Podcast_5'];  // Podcast items

  // Function to filter and display suggestions
  const handleSearch = (inputElement, suggestionsContainer, dataList) => {
    const query = inputElement.value.toLowerCase();
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    // Filter the data list based on user input
    const filteredSuggestions = dataList.filter(item =>
      item.toLowerCase().includes(query)
    );

    // Create suggestion items dynamically
    filteredSuggestions.forEach(suggestion => {
      const div = document.createElement('div');
      div.textContent = suggestion;
      div.classList.add('suggestion-item');
      div.addEventListener('click', () => {
        addTag(inputElement, suggestionsContainer, suggestion); // Add selected tag
      });
      suggestionsContainer.appendChild(div);
    });

    suggestionsContainer.style.display = filteredSuggestions.length ? 'block' : 'none';
  };

  // Function to add selected tag to the list
  const addTag = (inputElement, suggestionsContainer, tag) => {
    const tagsList = inputElement.closest('.tags-input').querySelector('.tags-list');

    // Check if the tag is already added
    const existingTag = Array.from(tagsList.children).some(tagItem => tagItem.textContent.includes(tag));

    if (existingTag) {
      return; // Don't add the tag if it's already in the list
    }

    const tagItem = document.createElement('li');
    tagItem.textContent = tag;

    // Add a delete button (X) to remove the tag
    const removeButton = document.createElement('span');
    removeButton.textContent = '×';
    removeButton.classList.add('remove-tag');
    removeButton.addEventListener('click', () => {
      tagsList.removeChild(tagItem);
    });

    tagItem.appendChild(removeButton);
    tagsList.appendChild(tagItem);

    inputElement.value = ''; // Clear the input field
    suggestionsContainer.innerHTML = ''; // Clear suggestions
  };

  // Attach event listeners to each .tags-input section
  document.querySelectorAll('.tags-input').forEach(tagsInput => {
    const inputField = tagsInput.querySelector('.tag-input');
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add('suggestions');
    tagsInput.appendChild(suggestionsContainer); // Append the suggestions container

    // Add event listeners for user input
    inputField.addEventListener('input', () => {
      const id = tagsInput.id;
      let dataList = [];

      // Based on the ID of the input field, choose the corresponding data list
      if (id === 'tv-shows') dataList = tvShows;
      else if (id === 'movie') dataList = movies;
      else if (id === 'podcast') dataList = podcasts;

      handleSearch(inputField, suggestionsContainer, dataList); // Trigger search
    });

    // Add event listener for focus to show suggestions
    inputField.addEventListener('focus', () => {
      const id = tagsInput.id;
      let dataList = [];

      // Based on the ID of the input field, choose the corresponding data list
      if (id === 'tv-shows') dataList = tvShows;
      else if (id === 'movie') dataList = movies;
      else if (id === 'podcast') dataList = podcasts;

      handleSearch(inputField, suggestionsContainer, dataList); // Trigger search
    });
  });
});
