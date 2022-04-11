var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(username) {
    // Make the request
    var apiUrl = `https://api.github.com/users/${username}/repos`
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            // Process it
            response.json().then(function(data) {
                console.log(data);
                displayRepos(data, username);
            })
        } else {
            alert("Error: GitHub User Not Found");
        }
    }).catch(function(error) {
        alert("Unable to connect to GitHub");
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event.target);
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a github username");
    }
}

var displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    repos.map(repo => {
        // Get repo name
        var repoName = `${repo.owner.login}/${repo.name}`;

        // create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repo.open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repo.open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    })
};


// If something returns a promise, gotta use a then() call on it
// Like await in rust

// getUserRepos("wfk-tokunaga");


userFormEl.addEventListener("submit", formSubmitHandler);