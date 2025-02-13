
let likesData = JSON.parse(localStorage.getItem('likesData')) || [];

// DOM Elements
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Current user's like status
let userId = 'currentUser'; // Replace this with the actual user ID logic
let hasLiked = likesData.includes(userId);

// Initialize like count (total likes from all users)
let likeCount = likesData.length;

// Set initial UI state
if (hasLiked) {
    likeButton.textContent = 'unlike';
}

// Update display with the total like count
likeCountDisplay.textContent = likeCount;

// Event listener for the like button
likeButton.addEventListener('click', () => {
    if (!hasLiked) {
        // User is liking for the first time
        likesData.push(userId);
        hasLiked = true;
        likeButton.textContent = 'unlike';
    } else {
        // User is unliking
        likesData = likesData.filter(id => id !== userId);
        hasLiked = false;
        likeButton.textContent = 'like';
    }

    // Update like count
    likeCount = likesData.length;
    likeCountDisplay.textContent = likeCount;

    // Store the updated likes data in localStorage
    localStorage.setItem('likesData', JSON.stringify(likesData));
});