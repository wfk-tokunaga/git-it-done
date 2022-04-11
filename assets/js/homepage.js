var getUserRepos = function(userName) {
    // Make the request
    var apiUrl = `https://api.github.com/users/${userName}/repos`
    fetch(apiUrl).then(function(response) {
        // Process it
        response.json().then(function(data) {
            console.log(data);
        })
    });
}

// If something returns a promise, gotta use a then() call on it
// Like await in rust

getUserRepos("wfk-tokunaga");