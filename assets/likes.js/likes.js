let likesData = JSON.parse(localStorage.getItem('likesData')) || {}; // Use an object to store likes

// DOM Elements
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Generate a unique user ID for each session (simulating user authentication)
function generateUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

let userId = generateUserId(); // Get or generate a unique user ID

// Function to initialize like state
function initializeLikeState() {
    let hasLiked = likesData[userId] === true; // Check if the user has liked
    let likeCount = Object.keys(likesData).filter(key => likesData[key] === true).length; // Count the total number of likes

    // Set initial UI state
    likeButton.textContent = hasLiked ? 'unlike' : 'like';
    likeCountDisplay.textContent = likeCount;
}

// Call the function to set initial state
initializeLikeState();

// Event listener for the like button
likeButton.addEventListener('click', () => {
    if (!likesData[userId]) {
        // User is liking for the first time
        likesData[userId] = true; // Mark this user as liked
        likeButton.textContent = 'unlike';
    } else {
        // User is unliking
        delete likesData[userId]; // Remove the user's like
        likeButton.textContent = 'like';
    }

    // Update like count
    let likeCount = Object.keys(likesData).filter(key => likesData[key] === true).length; // Recalculate like count
    likeCountDisplay.textContent = likeCount;

    // Store the updated likes data in localStorage
    localStorage.setItem('likesData', JSON.stringify(likesData));
});