const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loading');

let isDark = false;
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.documentElement.removeAttribute('data-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});

const postTemplates = [
    { name: "Sarah Jenkins", role: "Product Manager", content: "Excited to share that we just launched our new design system! Incredible collaboration across the engineering and design teams." },
    { name: "Marcus Vance", role: "Lead UX Architect", content: "Had a great discussion today about user research methodologies. Understanding the 'why' behind user behavior is crucial." },
    { name: "Alex Rivera", role: "Senior Full Stack Developer", content: "Spent the morning refactoring core API routes. Reduced DB query latency by 50% using proper indexing." },
    { name: "Elena Rostova", role: "DevOps Engineer", content: "Migrated our deployment pipelines to GitHub Actions. Build times are down and developers are happier!" }
];

let postCount = 0;
let loadingPosts = false;

function createPostCard(postData) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
        <div class="post-header">
            <svg class="person-avatar" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="#cbd5e1"/>
                <path d="M30,85 C30,65 40,60 50,60 C60,60 70,65 70,85" fill="#64748b"/>
                <circle cx="50" cy="40" r="16" fill="#64748b"/>
            </svg>
            <div class="post-user-info">
                <h4>${postData.name}</h4>
                <p>${postData.role}</p>
            </div>
        </div>
        <div class="post-content">
            <p>${postData.content}</p>
        </div>
    `;
    return card;
}

function loadMorePosts() {
    if (loadingPosts) return;
    loadingPosts = true;
    loading.style.display = 'block';

    setTimeout(() => {
        for (let i = 0; i < 2; i++) {
            const template = postTemplates[postCount % postTemplates.length];
            postsContainer.appendChild(createPostCard(template));
            postCount++;
        }
        loadingPosts = false;
        loading.style.display = 'none';
    }, 800);
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
        loadMorePosts();
    }
});

loadMorePosts();
