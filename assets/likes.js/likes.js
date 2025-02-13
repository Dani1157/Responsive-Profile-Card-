let likesData = JSON.parse(localStorage.getItem('likesData')) || {}; // Use an object to store likes
let likeCount = 0;

// DOM Elements
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Function to initialize like state
function initializeLikeState() {
    let hasLiked = likesData['user'] === true; // Check if the user has liked
    likeCount = Object.keys(likesData).filter(key => likesData[key] === true).length; // Count the total number of likes

    // Set initial UI state
    likeButton.textContent = hasLiked ? 'unlike' : 'like';
    likeCountDisplay.textContent = likeCount;
}

// Call the function to set initial state
initializeLikeState();

// Event listener for the like button
likeButton.addEventListener('click', () => {
    if (!likesData['user']) {
        // User is liking for the first time
        likesData['user'] = true; // Mark this user as liked
        likeCount = Object.keys(likesData).filter(key => likesData[key] === true).length; // Recalculate like count
        likeButton.textContent = 'unlike';
    } else {
        // User is unliking
        delete likesData['user']; // Remove the user's like
        likeCount = Object.keys(likesData).filter(key => likesData[key] === true).length; // Recalculate like count
        likeButton.textContent = 'like';
    }

    // Update like count
    likeCountDisplay.textContent = likeCount;
    localStorage.setItem('likesData', JSON.stringify(likesData));
});