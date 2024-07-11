// Simulated database for users (in a real app, this would be server-side)
let users = [];

// Function to show signup form
function showSignup() {
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.signup-form').style.display = 'block';
}

// Function to show login form
function showLogin() {
    document.querySelector('.signup-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
}

// Function to show user agreement
function showUserAgreement() {
    alert("User Agreement:\n\n1. You must be at least 13 years old to use PixelPop.\n2. You agree to not post offensive or illegal content.\n3. PixelPop reserves the right to terminate accounts that violate our policies.\n4. You are responsible for maintaining the confidentiality of your account.\n5. PixelPop is not responsible for any loss of data or breach of account security.");
}

// Function to handle signup
function signup() {
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('newPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (username && email && password && agreeTerms) {
        const newUser = { username, email, password, coins: 0, profilePicture: null };
        users.push(newUser);
        alert('Signup successful! Please log in.');
        showLogin();
    } else if (!agreeTerms) {
        alert('Please agree to the User Agreement to sign up.');
    } else {
        alert('Please fill in all fields and agree to the User Agreement.');
    }
}

// Function to handle login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Login successful!');
        showHomePage(user);
    } else {
        alert('Invalid username or password.');
    }
}

// Function to show home page after successful login
function showHomePage(user) {
    document.body.innerHTML = `
        <div class="home-container">
            <header>
                <div class="logo-container">
                    <img src="pixelpop_logo.png" alt="PixelPop Logo" class="logo">
                    <h1>PixelPop</h1>
                </div>
                <nav>
                    <a href="#" onclick="showProfile('${user.username}')">Profile</a>
                    <a href="#" onclick="showMessages()">Messages</a>
                    <div class="wallet">Coins: <span id="coinDisplay">${user.coins}</span></div>
                </nav>
            </header>
            <main>
                <div id="feed">
                    <!-- Feed content will be dynamically added here -->
                </div>
            </main>
            <footer>
                <input type="text" id="promoCode" placeholder="Enter promo code">
                <button onclick="redeemPromoCode()">Redeem</button>
                <p>&copy; 2024 PixelPop. All rights reserved.</p>
            </footer>
        </div>
    `;
    loadFeed();
}

// Function to load feed content
function loadFeed() {
    const feed = document.getElementById('feed');
    // Simulated feed content
    feed.innerHTML = `
        <div class="post">
            <img src="https://via.placeholder.com/300" alt="Post image">
            <div class="post-actions">
                <button onclick="likePost(this)">Like</button>
                <button onclick="showComments(this)">Comments</button>
            </div>
        </div>
    `;
}

// Function to handle liking a post
function likePost(button) {
    button.innerHTML = button.innerHTML === 'Like' ? 'Unlike' : 'Like';
}

// Function to show comments
function showComments(button) {
    const post = button.closest('.post');
    if (!post.querySelector('.comments')) {
        const comments = document.createElement('div');
        comments.className = 'comments';
        comments.innerHTML = `
            <input type="text" placeholder="Add a comment...">
            <button onclick="addComment(this)">Post</button>
        `;
        post.appendChild(comments);
    }
}

// Function to add a comment
function addComment(button) {
    const commentInput = button.previousElementSibling;
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentElement = document.createElement('p');
        commentElement.textContent = commentText;
        button.parentElement.appendChild(commentElement);
        commentInput.value = '';
    }
}

// Function to show user profile
function showProfile(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        document.body.innerHTML = `
            <div class="profile-container">
                <h2>${user.username}'s Profile</h2>
                <img src="${user.profilePicture || 'https://via.placeholder.com/150'}" alt="Profile picture">
                <p>Email: ${user.email}</p>
                <p>Coins: ${user.coins}</p>
                <button onclick="showHomePage(${JSON.stringify(user)})">Back to Home</button>
            </div>
        `;
    }
}

// Function to show messages
function showMessages() {
    alert('Messages feature coming soon!');
}

// Function to redeem promo code
function redeemPromoCode() {
    const promoCode = document.getElementById('promoCode').value;
    if (promoCode === '1') {
        const currentUser = users.find(u => u.username === document.querySelector('nav a').textContent.split(' ')[1]);
        if (currentUser) {
            currentUser.coins += 1000000;
            document.getElementById('coinDisplay').textContent = currentUser.coins;
            alert('Congratulations! You received 1 million coins!');
        }
    } else {
        alert('Invalid promo code.');
    }
}