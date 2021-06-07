const BASE_URL = 'https://api.github.com';

const reposContainer = document.querySelector('#repos-container');
const repoSearchTerm = document.querySelector('#repo-search-term');

function renderOpenIssues(numOfIssues) {
  const span = document.createElement('span');
  span.classList.add('flex-row', 'align-center');

  if (numOfIssues) {
    span.innerHTML = '<i class="fas fa-times status-icon icon-danger"></i>';
    span.innerHTML += `${numOfIssues} issue(s)`;
    return span;
  }

  span.innerHTML =
    '<i class="fas fa-check-square status-icon icon-success"></i>';

  return span;
}

function renderRepos(repos) {
  repos.forEach(
    ({ full_name: fullName, open_issues_count: openIssuesCount }) => {
      const li = document.createElement('li');
      li.classList.add(
        'list-item',
        'flex-row',
        'justify-space-between',
        'align-center',
      );

      const fullNameSpan = document.createElement('span');
      fullNameSpan.innerText = fullName;

      const issuesSpan = renderOpenIssues(openIssuesCount);
      li.appendChild(fullNameSpan);
      li.appendChild(issuesSpan);
      reposContainer.appendChild(li);
    },
  );
}

function renderSearchTerm(searchTerm) {
  repoSearchTerm.innerText = searchTerm;
}

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = event.target.elements[0].value;

  fetch(`${BASE_URL}/users/${searchTerm}/repos`)
    .then(resp => resp.json())
    .then(repoResults => {
      renderSearchTerm(searchTerm);
      renderRepos(repoResults);
    });
});
