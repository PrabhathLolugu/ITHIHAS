// Sample story data for the library
const libraryStories = {
    epicTales: [
        {
            title: "The Great War of Kurukshetra",
            excerpt: "The epic battle between the Pandavas and Kauravas that changed the course of dharma",
            image: "assets/images/kurukshetra.jpg",
            category: "Epic",
            tags: ["War", "Dharma", "Family"]
        },
        {
            title: "Rama's Quest",
            excerpt: "The journey of Lord Rama to rescue Sita and establish righteousness",
            image: "assets/images/rama.jpg",
            category: "Epic",
            tags: ["Adventure", "Love", "Duty"]
        },
        {
            title: "The Tale of Savitri",
            excerpt: "A story of unwavering devotion and the power of love over death",
            image: "assets/images/savitri.jpg",
            category: "Epic",
            tags: ["Love", "Devotion", "Courage"]
        }
    ],
    moralStories: [
        {
            title: "The Honest Woodcutter",
            excerpt: "A tale of honesty rewarded through divine intervention",
            image: "assets/images/woodcutter.jpg",
            category: "Moral",
            tags: ["Honesty", "Values", "Divine"]
        },
        {
            title: "The Four Friends",
            excerpt: "A story about the power of unity and friendship",
            image: "assets/images/friends.jpg",
            category: "Moral",
            tags: ["Friendship", "Unity", "Wisdom"]
        }
    ],
    devotionalStories: [
        {
            title: "Prahlad's Faith",
            excerpt: "The unwavering devotion of a young prince towards Lord Vishnu",
            image: "assets/images/prahlad.jpg",
            category: "Devotional",
            tags: ["Faith", "Protection", "Divine"]
        },
        {
            title: "Mira's Divine Love",
            excerpt: "The spiritual journey of Mirabai and her devotion to Lord Krishna",
            image: "assets/images/mira.jpg",
            category: "Devotional",
            tags: ["Bhakti", "Love", "Music"]
        }
    ],
    philosophicalTales: [
        {
            title: "The Nature of Reality",
            excerpt: "A dialogue between a guru and disciple about the true nature of existence",
            image: "assets/images/reality.jpg",
            category: "Philosophical",
            tags: ["Wisdom", "Truth", "Knowledge"]
        },
        {
            title: "The River of Time",
            excerpt: "A contemplation on the eternal flow of time and karma",
            image: "assets/images/time.jpg",
            category: "Philosophical",
            tags: ["Time", "Karma", "Wisdom"]
        }
    ],
    historicalLegends: [
        {
            title: "The Great Emperor Ashoka",
            excerpt: "The transformation of a warrior king into a messenger of peace",
            image: "assets/images/ashoka.jpg",
            category: "Historical",
            tags: ["Peace", "Transformation", "Empire"]
        },
        {
            title: "Chanakya's Wisdom",
            excerpt: "Tales of the great strategist who built an empire",
            image: "assets/images/chanakya.jpg",
            category: "Historical",
            tags: ["Strategy", "Politics", "Wisdom"]
        }
    ],
    mythologicalAdventures: [
        {
            title: "Hanuman's Journey",
            excerpt: "The incredible adventures of the mighty Hanuman",
            image: "assets/images/hanuman.jpg",
            category: "Mythological",
            tags: ["Adventure", "Devotion", "Power"]
        },
        {
            title: "Garuda's Quest",
            excerpt: "The divine bird's mission to save his mother",
            image: "assets/images/garuda.jpg",
            category: "Mythological",
            tags: ["Adventure", "Family", "Divine"]
        }
    ]
};

// Function to populate story sections
function populateStoryLibrary() {
    // Populate Epic Tales
    const epicSection = document.querySelector('#epic-tales .story-row');
    libraryStories.epicTales.forEach(story => {
        epicSection.appendChild(createStoryCard(story));
    });

    // Populate Moral Stories
    const moralSection = document.querySelector('#moral-stories .story-row');
    libraryStories.moralStories.forEach(story => {
        moralSection.appendChild(createStoryCard(story));
    });

    // Populate Devotional Stories
    const devotionalSection = document.querySelector('#devotional-stories .story-row');
    libraryStories.devotionalStories.forEach(story => {
        devotionalSection.appendChild(createStoryCard(story));
    });

    // Populate Philosophical Tales
    const philosophicalSection = document.querySelector('#philosophical-tales .story-row');
    libraryStories.philosophicalTales.forEach(story => {
        philosophicalSection.appendChild(createStoryCard(story));
    });

    // Populate Historical Legends
    const historicalSection = document.querySelector('#historical-legends .story-row');
    libraryStories.historicalLegends.forEach(story => {
        historicalSection.appendChild(createStoryCard(story));
    });

    // Populate Mythological Adventures
    const mythologicalSection = document.querySelector('#mythological-adventures .story-row');
    libraryStories.mythologicalAdventures.forEach(story => {
        mythologicalSection.appendChild(createStoryCard(story));
    });
}

// Initialize library when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateStoryLibrary();
});
