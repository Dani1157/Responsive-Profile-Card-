   // 1. Get references to the DOM elements
   const likeButton = document.getElementById('like-button');
   const likeCountDisplay = document.getElementById('like-count');
   
   // 2. Initialize like count and like status
   let likeCount = Number(localStorage.getItem('likeCount')) || 0; // Get likeCount from localStorage or default to 0
   let hasLiked = (localStorage.getItem('hasLiked') === 'true'); // Get hasLiked from localStorage or default to false
   
   // 3. Set initial UI state
   if (hasLiked) {
       likeButton.textContent = 'unlike'; // If liked, set button text to 'unlike'
   }
   
   // Update display with the stored like count
   likeCountDisplay.textContent = likeCount;
   
   // 4. Event listener for the like button
   likeButton.addEventListener('click', () => {
       if (!hasLiked) {
           // User is liking for the first time
           likeCount++;
           hasLiked = true;
           likeButton.textContent = 'unlike'; // Change button text
       } else {
           // User is unliking
           if (likeCount > 0) { // Prevent negatives
               likeCount--;
           }
           hasLiked = false;
           likeButton.textContent = 'like'; // Change button text back
       }
   
       // Update the display
       likeCountDisplay.textContent = likeCount;
   
       // Store the like status and count in localStorage
       localStorage.setItem('likeCount', likeCount);
       localStorage.setItem('hasLiked', hasLiked);
   });