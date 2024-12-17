const ApiURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");
const suggestionBox = document.createElement('ul');
document.body.appendChild(suggestionBox);
suggestionBox.style.position = 'absolute';
suggestionBox.style.backgroundColor = 'white';
suggestionBox.style.border = '1px solid #ccc';
suggestionBox.style.listStyleType = 'none';
suggestionBox.style.padding = '0';
suggestionBox.style.margin = '0';
suggestionBox.style.maxHeight = '150px';
suggestionBox.style.overflowY = 'auto';
suggestionBox.style.display = 'none';

// List of some GitHub usernames to display on focus
const fixedUserList = ['torvalds', 'mojombo', 'defunkt', 'pjhyett', 'wycats', 'dhh', 'gaearon', 'addyosmani', 'sindresorhus'];

// Function to display suggestions from a fixed list
const showSuggestions = () => {
    suggestionBox.innerHTML = '';  // Clear previous suggestions
    fixedUserList.forEach(username => {
        const suggestionItem = document.createElement('li');
        suggestionItem.innerText = username;
        suggestionItem.style.padding = '5px';
        suggestionItem.style.cursor = 'pointer';
        suggestionItem.addEventListener('click', () => {
            searchBox.value = username;
            getUser(username);  // Get user profile on click
            suggestionBox.style.display = 'none';  // Hide suggestions
        });
        suggestionBox.appendChild(suggestionItem);
    });
    suggestionBox.style.display = 'block';
};

// Function to fetch user profile data
const getUser = async (username) => {
    const response = await fetch(ApiURL + username);
    const data = await response.json();
    
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src='${data.avatar_url}' alt="GitHub Avatar">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul class="info">
                    <li>${data.followers}<strong> Followers</strong></li>
                    <li>${data.following}<strong> Following</strong></li>
                    <li>${data.public_repos}<strong> Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>`;
    main.innerHTML = card;
    getRepos(username);
};

// Function to fetch repositories of the user
const getRepos = async (username) => {
    const repos = document.querySelector("#repos");
    const response = await fetch(ApiURL + username + '/repos');
    const data = await response.json();
    
    repos.innerHTML = '';  // Clear previous repos
    data.forEach((item) => {
        const elem = document.createElement('a');
        elem.classList.add('repo');
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = '_blank';
        repos.appendChild(elem);
    });
};

// Show suggestions when the search box is focused
searchBox.addEventListener('focus', function() {
    const rect = searchBox.getBoundingClientRect();
    suggestionBox.style.top = rect.bottom + 'px';
    suggestionBox.style.left = rect.left + 'px';
    suggestionBox.style.width = rect.width + 'px';
    showSuggestions();  // Display the fixed list of users
});

// Hide suggestions when clicking outside the search box
document.addEventListener('click', function(e) {
    if (!searchBox.contains(e.target) && !suggestionBox.contains(e.target)) {
        suggestionBox.style.display = 'none';  // Hide suggestions if clicked outside
    }
});
