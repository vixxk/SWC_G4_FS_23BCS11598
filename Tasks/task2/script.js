const appsBtn = document.getElementById('apps-btn');
const appsDropdown = document.getElementById('apps-dropdown');
const searchInput = document.getElementById('search-input');
const searchBoxWrapper = document.getElementById('search-box-wrapper');
const suggestionsDropdown = document.getElementById('suggestions-dropdown');
const suggestionsList = document.getElementById('suggestions-list');

const suggestionsData = [
    "how to learn react fast",
    "css flexbox center element",
    "javascript async await tutorial",
    "spring boot build rest api",
    "next.js vs react comparison",
    "web accessibility best practices",
    "tailwind css components free",
    "how to use fetch in javascript"
];

appsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    appsDropdown.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!appsDropdown.contains(e.target) && e.target !== appsBtn) {
        appsDropdown.classList.remove('show');
    }
    if (!searchBoxWrapper.contains(e.target)) {
        searchBoxWrapper.classList.remove('focus');
    }
});

searchInput.addEventListener('focus', () => {
    searchBoxWrapper.classList.add('focus');
    renderSuggestions(searchInput.value.trim());
});

searchInput.addEventListener('input', () => {
    renderSuggestions(searchInput.value.trim());
});

function renderSuggestions(query) {
    suggestionsList.innerHTML = '';
    
    if (!query) {
        suggestionsDropdown.classList.remove('has-query');
        return;
    }
    
    const filtered = suggestionsData.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length > 0) {
        filtered.forEach(item => {
            const li = document.createElement('div');
            li.className = 'suggestion-item';
            li.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>${item}</span>
            `;
            li.addEventListener('click', () => {
                searchInput.value = item;
                searchBoxWrapper.classList.remove('focus');
            });
            suggestionsList.appendChild(li);
        });
    }
}
