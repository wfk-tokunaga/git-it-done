var issuesContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    // console.log(repo);
    var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayIssues(data);
            })
        } else {
            alert("There was a problem with your request!");
        }
    });
}

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    issues.map(function(issue) {
        // Create link element to take user to github issue
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issue.html_url);
        issueEl.setAttribute("target", "_blank");

        var titleEl = document.createElement("span");
        titleEl.textContent = issue.title;

        issueEl.appendChild(titleEl);
        var typeEl = document.createElement("span");

        typeEl.textContent = issue.pull_request ? "(Pull request)" : "(Issue)";
        // if (issue.pull_request) {
        //     typeEl.textContent = "(Pull request)";
        // } else {

        // }
        issueEl.appendChild(typeEl);
        issuesContainerEl.appendChild(issueEl);
    });

};

getRepoIssues("wfk-tokunaga/1-ucb");