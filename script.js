document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');
    
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const today = new Date().toISOString().split('T')[0];

        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            if (post.date < today) {
                posts.splice(index, 1); // Remove expired posts
            } else {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');

                const img = document.createElement('img');
                img.src = post.image;
                postCard.appendChild(img);

                const bio = document.createElement('p');
                bio.textContent = post.bio;
                postCard.appendChild(bio);

                const date = document.createElement('p');
                date.textContent = `Post Date: ${post.date}`;
                postCard.appendChild(date);

                const link = document.createElement('a');
                link.href = `#post-${index}`;
                link.textContent = 'Share Link';
                postCard.appendChild(link);

                postsContainer.appendChild(postCard);
            }
        });

        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function addPost(image, bio, date) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ image, bio, date });
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const imageInput = document.getElementById('imageInput');
        const bioInput = document.getElementById('bioInput').value;
        const dateInput = document.getElementById('dateInput').value;

        const reader = new FileReader();
        reader.onload = function () {
            const image = reader.result;
            addPost(image, bioInput, dateInput);
            postForm.reset();
        };
        reader.readAsDataURL(imageInput.files[0]);
    });

    loadPosts();

    // If a hash is present in the URL, scroll to the corresponding post
    if (window.location.hash) {
        const postId = window.location.hash.substring(6); // Remove "#post-" from hash
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        if (posts[postId]) {
            alert(`Bio: ${posts[postId].bio}\nDate: ${posts[postId].date}`);
        } else {
            alert('Post not found or has expired.');
        }
    }
});
