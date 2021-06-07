const BASE_URL = 'https://api.github.com/repos';

const issuesContainer = document.getElementById('issues-container');
const repo = new URL(document.location).searchParams.get('repo');

function renderIssues(issues) {
  issues.forEach(({ title, issues_url: url, pull_request: isPullRequest }) => {
    const a = document.createElement('a');
    const li = document.createElement('li');
    const titleSpan = document.createElement('span');
    const isPullRequestSpan = document.createElement('span');

    a.href = url;

    a.classList.add('flex-row', 'justify-space-between', 'align-center');

    titleSpan.innerText = title;
    isPullRequestSpan.innerText = isPullRequest ? '(Pull Request)' : '(Issue)';

    a.appendChild(titleSpan);
    a.appendChild(isPullRequestSpan);

    li.classList.add('list-item');

    li.appendChild(a);

    issuesContainer.appendChild(li);
  });
}

fetch(`${BASE_URL}/${repo}/issues?direction=asc`)
  .then(resp => resp.json())
  .then(issuesResults => {
    renderIssues(issuesResults);
  });
