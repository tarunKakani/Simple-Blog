// DOM Elements
const createPostBtn = document.getElementById('createPostBtn');
const createPostModal = document.getElementById('createPostModal');
const cancelPost = document.getElementById('cancelPost');
const publishPost = document.getElementById('publishPost');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const postsContainer = document.getElementById('postsContainer');

// Store posts in localStorage
let posts = JSON.parse(localStorage.getItem('blog_posts')) || [];

// Event Listeners
createPostBtn.addEventListener('click', () => {
    createPostModal.classList.add('active');
});

cancelPost.addEventListener('click', () => {
    createPostModal.classList.remove('active');
    clearForm();
});

publishPost.addEventListener('click', () => {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    if (title && content) {
        const newPost = {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString()
        };

        posts.unshift(newPost);
        localStorage.setItem('blog_posts', JSON.stringify(posts));
        
        createPostModal.classList.remove('active');
        clearForm();
        renderPosts();
    }
});

// Functions
function clearForm() {
    postTitle.value = '';
    postContent.value = '';
}

function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('blog_posts', JSON.stringify(posts));
    renderPosts();
}

function renderPosts() {
    postsContainer.innerHTML = posts.map(post => `
        <article class="bg-white rounded-lg shadow-sm p-6 relative group">

            <button onclick="deletePost(${post.id})" class="delete-btn absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors">

                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
                </svg>
            </button>

            <h2 class="text-2xl font-semibold mb-2">${post.title}</h2>
            <p class="text-gray-600 mb-4 post-content">${post.content}</p>
            <div class="text-sm text-gray-500">Published on ${post.date}</div>
            
        </article>
    `).join('');
}

// Initial render
renderPosts();

// Close modal when clicking outside
createPostModal.addEventListener('click', (e) => {
    if (e.target === createPostModal) {
        createPostModal.classList.remove('active');
        clearForm();
    }
});

// Add keyboard support for closing modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && createPostModal.classList.contains('active')) {
        createPostModal.classList.remove('active');
        clearForm();
    }
});