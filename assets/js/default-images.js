// Default placeholder images for story categories
const defaultImages = {
    // Base gradients for different categories
    epic: 'linear-gradient(45deg, #FF416C, #FF4B2B)',
    moral: 'linear-gradient(45deg, #4776E6, #8E54E9)',
    devotional: 'linear-gradient(45deg, #FFD700, #FFA500)',
    philosophical: 'linear-gradient(45deg, #2C3E50, #3498DB)',
    historical: 'linear-gradient(45deg, #834D9B, #D04ED6)',
    mythological: 'linear-gradient(45deg, #4CA1AF, #2C3E50)',

    // Story-specific gradients
    kurukshetra: 'linear-gradient(45deg, #780206, #061161)',
    rama: 'linear-gradient(45deg, #1D976C, #93F9B9)',
    savitri: 'linear-gradient(45deg, #FF512F, #DD2476)',
    woodcutter: 'linear-gradient(45deg, #56AB2F, #A8E063)',
    friends: 'linear-gradient(45deg, #614385, #516395)',
    prahlad: 'linear-gradient(45deg, #FFB75E, #ED8F03)',
    mira: 'linear-gradient(45deg, #C04848, #480048)',
    reality: 'linear-gradient(45deg, #0F2027, #203A43, #2C5364)',
    time: 'linear-gradient(45deg, #4B79A1, #283E51)',
    ashoka: 'linear-gradient(45deg, #1F1C2C, #928DAB)',
    chanakya: 'linear-gradient(45deg, #2C3E50, #3498DB)',
    hanuman: 'linear-gradient(45deg, #FF512F, #F09819)',
    garuda: 'linear-gradient(45deg, #5C258D, #4389A2)',
    krishna: 'linear-gradient(45deg, #0575E6, #021B79)',
    ramayana: 'linear-gradient(45deg, #FF512F, #F09819)'
};

// Function to get image URL or fallback gradient
function getStoryImage(imagePath, category) {
    // If the image exists, return its path
    const img = new Image();
    img.src = imagePath;
    
    if (img.complete) {
        return `url('${imagePath}')`;
    }
    
    // Extract the image name from the path
    const imageName = imagePath.split('/').pop().split('.')[0].toLowerCase();
    
    // Return specific gradient if it exists, otherwise return category gradient
    return defaultImages[imageName] || defaultImages[category.toLowerCase()] || defaultImages.mythological;
}

// Update story cards with fallback gradients
function updateStoryImages() {
    document.querySelectorAll('.story-card').forEach(card => {
        const backgroundImage = card.style.backgroundImage;
        if (backgroundImage.includes('url')) {
            const imagePath = backgroundImage.slice(5, -2); // Remove url(' and ')
            const category = card.querySelector('.story-tags span')?.textContent || 'mythological';
            card.style.background = getStoryImage(imagePath, category);
        }
    });
}

// Update featured stories with fallback gradients
function updateFeaturedImages() {
    document.querySelectorAll('.featured-story').forEach(story => {
        const backgroundImage = story.style.backgroundImage;
        if (backgroundImage.includes('url')) {
            const imagePath = backgroundImage.slice(5, -2); // Remove url(' and ')
            const category = story.querySelector('.featured-tags span')?.textContent || 'epic';
            story.style.background = getStoryImage(imagePath, category);
        }
    });
}
