// Main JavaScript file for ITHIHAS platform

// Theme Management
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
}

// Initialize theme
document.body.dataset.theme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Audio Player Management
class AudioPlayer {
    constructor(container) {
        this.container = container;
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentStory = null;
        this.initialize();
    }

    initialize() {
        this.createControls();
        this.attachEventListeners();
    }

    createControls() {
        this.container.innerHTML = `
            <div class="audio-controls">
                <button class="btn play-pause">Play</button>
                <input type="range" class="progress" min="0" max="100" value="0">
                <span class="time">00:00 / 00:00</span>
                <button class="btn speed">1x</button>
            </div>
        `;
    }

    attachEventListeners() {
        const playPauseBtn = this.container.querySelector('.play-pause');
        const progress = this.container.querySelector('.progress');
        const speedBtn = this.container.querySelector('.speed');

        playPauseBtn.addEventListener('click', () => this.togglePlay());
        progress.addEventListener('change', (e) => this.seek(e.target.value));
        speedBtn.addEventListener('click', () => this.toggleSpeed());
    }

    loadStory(url) {
        this.audio.src = url;
        this.currentStory = url;
        this.play();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        this.container.querySelector('.play-pause').textContent = 'Pause';
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.container.querySelector('.play-pause').textContent = 'Play';
    }

    seek(value) {
        const time = (value / 100) * this.audio.duration;
        this.audio.currentTime = time;
    }

    toggleSpeed() {
        const speeds = [1, 1.5, 2, 0.75];
        const currentIndex = speeds.indexOf(this.audio.playbackRate);
        const nextIndex = (currentIndex + 1) % speeds.length;
        this.audio.playbackRate = speeds[nextIndex];
        this.container.querySelector('.speed').textContent = `${speeds[nextIndex]}x`;
    }
}

// Story Recommendation System
class RecommendationEngine {
    constructor() {
        this.userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
            categories: [],
            language: 'english',
            ageGroup: 'all'
        };
    }

    updatePreferences(preferences) {
        this.userPreferences = { ...this.userPreferences, ...preferences };
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    }

    async getRecommendations() {
        try {
            // In a real implementation, this would make an API call to the backend
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.userPreferences)
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            return [];
        }
    }
}

// Progress Tracking
class ProgressTracker {
    constructor() {
        this.progress = JSON.parse(localStorage.getItem('userProgress')) || {
            storiesCompleted: [],
            totalTime: 0,
            achievements: []
        };
    }

    updateProgress(storyId, duration) {
        if (!this.progress.storiesCompleted.includes(storyId)) {
            this.progress.storiesCompleted.push(storyId);
            this.progress.totalTime += duration;
            this.checkAchievements();
            this.saveProgress();
        }
    }

    checkAchievements() {
        const achievements = [
            { id: 'first_story', condition: () => this.progress.storiesCompleted.length >= 1 },
            { id: 'ten_stories', condition: () => this.progress.storiesCompleted.length >= 10 },
            { id: 'hour_listened', condition: () => this.progress.totalTime >= 3600 }
        ];

        achievements.forEach(achievement => {
            if (achievement.condition() && !this.progress.achievements.includes(achievement.id)) {
                this.progress.achievements.push(achievement.id);
                this.showAchievementNotification(achievement.id);
            }
        });
    }

    saveProgress() {
        localStorage.setItem('userProgress', JSON.stringify(this.progress));
    }

    showAchievementNotification(achievementId) {
        // Implementation for showing achievement notifications
        console.log(`Achievement unlocked: ${achievementId}`);
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Audio Player
    const audioPlayerContainer = document.querySelector('.audio-player');
    if (audioPlayerContainer) {
        const player = new AudioPlayer(audioPlayerContainer);
    }

    // Initialize Recommendation Engine
    const recommendationEngine = new RecommendationEngine();

    // Initialize Progress Tracker
    const progressTracker = new ProgressTracker();

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize animations for elements
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .category-item').forEach(el => {
        observer.observe(el);
    });
});

// Handle service worker for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
