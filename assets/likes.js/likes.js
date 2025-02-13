let likesData = JSON.parse(localStorage.getItem('likesData')) || {}; // Use an object

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

let userId = generateUserId(); // Get a unique user ID

// Current user's like status
let hasLiked = likesData[userId] === true; // Check if the user has liked

// Initialize like count (total likes from all users)
let likeCount = Object.keys(likesData).filter(key => likesData[key] === true).length; // Count the likes

// Set initial UI state
if (hasLiked) {
    likeButton.textContent = 'unlike';
} else {
    likeButton.textContent = 'like';  // Ensure initial button text is set correctly
}

// Update display with the total like count
likeCountDisplay.textContent = likeCount;

// Event listener for the like button
likeButton.addEventListener('click', () => {
    if (!hasLiked) {
        // User is liking for the first time
        likesData[userId] = true; // Set like to true
        hasLiked = true;
        likeButton.textContent = 'unlike';
    } else {
        // User is unliking
        delete likesData[userId]; // Delete the user's like
        hasLiked = false;
        likeButton.textContent = 'like';
    }

    // Update like count
    likeCount = Object.keys(likesData).filter(key => likesData[key] === true).length;  // Recalculate like count
    likeCountDisplay.textContent = likeCount;

    // Store the updated likes data in localStorage
    localStorage.setItem('likesData', JSON.stringify(likesData));
});