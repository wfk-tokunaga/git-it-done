var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    if (repoName) {
        // If a repo name was provided, display on page
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    } else {
        // If not, redirect to homepage
        document.location.replace("./index.html");
    }
}

var getRepoIssues = function(repo) {
    // console.log(repo);
    var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            })
        } else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
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

var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.setAttribute("href", `https://github.com/${repo}/issues`);
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};

getRepoName();
// getRepoIssues()
// getRepoIssues("wfk-tokunaga/1-ucb");
// getRepoIssues("facebook/react");