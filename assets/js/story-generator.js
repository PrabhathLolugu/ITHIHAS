class StoryGenerator {
    constructor() {
        this.ollamaClient = new OllamaClient();
        this.initializeEventListeners();
        this.loadingMessages = [
            "🕉️ Invoking ancient wisdom...",
            "🏛️ Consulting the sacred texts...",
            "✨ Channeling divine inspiration...",
            "🌟 Weaving mythological elements...",
            "🎭 Crafting character arcs...",
            "🌺 Adding cultural nuances...",
            "📜 Enriching the narrative...",
            "🎨 Painting vivid scenes...",
            "💫 Infusing magical elements...",
            "🌅 Setting the atmosphere...",
            "🎋 Growing the story tree...",
            "🔮 Polishing the gems of wisdom..."
        ];
        this.currentMessageIndex = 0;
        this.messageInterval = null;
    }

    initializeEventListeners() {
        const storyForm = document.getElementById('storyForm');
        const advancedToggle = document.getElementById('toggleAdvanced');
        const advancedOptions = document.querySelector('.advanced-options');
        const randomizeBtn = document.getElementById('randomize');
        const copyBtn = document.getElementById('copyStory');
        const downloadBtn = document.getElementById('downloadStory');

        if (storyForm) {
            storyForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        if (advancedToggle && advancedOptions) {
            advancedToggle.addEventListener('click', () => this.toggleAdvancedOptions(advancedOptions, advancedToggle));
        }

        if (randomizeBtn) {
            randomizeBtn.addEventListener('click', () => this.randomizeOptions());
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyStory());
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadStory());
        }
    }

    async handleSubmit(e) {
        if (e) {
            e.preventDefault();
        }
        
        console.log('Handling form submission...');
        
        // Show loading animation
        this.showLoadingAnimation();
        
        try {
            const formData = this.collectFormData();
            console.log('Form data collected:', formData);
            
            const storyData = await this.generateStoryWithOllama(formData);
            console.log('Story generated:', storyData);
            
            this.displayStory(storyData);
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            this.showError('Failed to generate story. Please make sure Ollama is running locally.');
        } finally {
            this.hideLoadingAnimation();
        }
    }

    collectFormData() {
        const advancedOptions = document.querySelector('.advanced-options');
        const isAdvancedVisible = advancedOptions.style.display !== 'none';

        // Default values for advanced options
        const defaultValues = {
            narrativePerson: 'third',
            timePeriod: 'ancient',
            languageComplexity: 'moderate',
            storyLength: 'medium',
            emotionalTone: 'balanced',
            narrativeStyle: 'descriptive',
            plotComplexity: 'linear'
        };

        const formData = {
            storyType: document.getElementById('storyType')?.value || '',
            theme: document.getElementById('theme')?.value || '',
            mainCharacter: document.getElementById('mainCharacter')?.value || '',
            setting: document.getElementById('setting')?.value || '',
            era: document.getElementById('era')?.value || '',
        };

        // Add advanced options with fallbacks to defaults
        Object.keys(defaultValues).forEach(key => {
            formData[key] = isAdvancedVisible ? 
                (document.getElementById(key)?.value || defaultValues[key]) :
                defaultValues[key];
        });

        console.log('Collected form data:', formData);
        return formData;
    }

    async generateStoryWithOllama(params) {
        // Calculate minimum word count based on story length
        const wordCounts = {
            'short': 500,
            'medium': 1000,
            'long': 2000
        };
        const minWords = wordCounts[params.storyLength] || 500;

        const prompt = `You are an expert storyteller specializing in Indian mythology. Create an engaging and authentic Indian mythological story with the following parameters:

Theme: ${params.theme}
Main Character: ${params.mainCharacter}
Setting: ${params.setting}
Era: ${params.era}
Narrative Style: ${params.narrativeStyle}
Time Period: ${params.timePeriod}
Language Complexity: ${params.languageComplexity}
Story Length: Minimum ${minWords} words
Emotional Tone: ${params.emotionalTone}
Plot Complexity: ${params.plotComplexity}

Requirements:
1. Generate a creative and engaging title for the story
2. Create a vivid and culturally authentic story that captures the essence of Indian mythology
3. Include rich descriptions of settings, characters, and mythological elements
4. Incorporate traditional Sanskrit terms with their meanings in parentheses where appropriate
5. Build dramatic tension and emotional depth
6. End with a meaningful resolution or moral lesson
7. Format the response as: TITLE: [Your Title] followed by two newlines, then the story
8. Ensure the story is at least ${minWords} words
9. Use proper paragraph breaks for readability
10. Include mythological references and symbolism

Begin the story now:`;

        try {
            const response = await this.ollamaClient.generateStory(prompt);
            return this.formatStory(response);
        } catch (error) {
            console.error('Error in generateStoryWithOllama:', error);
            throw error;
        }
    }

    formatStory(story) {
        // Split title and content
        const titleMatch = story.match(/TITLE:\s*([^\n]+)/);
        const title = titleMatch ? titleMatch[1].trim() : 'Untitled Story';
        
        // Remove title from content and clean up
        let content = story.replace(/TITLE:\s*[^\n]+/, '').trim();
        
        // Split into paragraphs and clean up
        const paragraphs = content
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0);

        return {
            title: title,
            content: paragraphs
        };
    }

    displayStory(storyData) {
        const storyOutput = document.querySelector('.story-output');
        const storyTitle = document.querySelector('.story-title');
        const storyContent = document.querySelector('.story-content');
        
        if (!storyOutput || !storyTitle || !storyContent) {
            console.error('Story output elements not found');
            return;
        }

        // Reset and show story container
        storyOutput.style.display = 'block';
        storyTitle.textContent = storyData.title;
        storyContent.innerHTML = '';

        // Create and append paragraphs with staggered animation
        storyData.content.forEach((text, index) => {
            if (text.trim()) {
                const p = document.createElement('p');
                p.className = 'story-paragraph';
                p.textContent = text;
                storyContent.appendChild(p);

                // Staggered reveal animation
                setTimeout(() => {
                    p.classList.add('reveal');
                }, index * 400);
            }
        });

        // Smooth scroll to story after a slight delay
        setTimeout(() => {
            storyOutput.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }, 500);
    }

    showLoadingAnimation() {
        const loadingContainer = document.getElementById('loadingContainer');
        const messagesContainer = document.getElementById('loadingMessages');
        
        if (!loadingContainer || !messagesContainer) {
            console.error('Loading container elements not found');
            return;
        }

        loadingContainer.classList.add('visible');
        messagesContainer.innerHTML = '';
        
        // Create and show first message
        const messageElement = document.createElement('div');
        messageElement.className = 'loading-message visible';
        messageElement.textContent = this.loadingMessages[0];
        messagesContainer.appendChild(messageElement);

        // Cycle through messages with dynamic timing
        let messageDelay = 2000; // Start with 2 seconds
        this.messageInterval = setInterval(() => {
            const oldMessage = messagesContainer.querySelector('.loading-message');
            const newMessage = document.createElement('div');
            
            // Cycle to next message
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
            newMessage.className = 'loading-message';
            newMessage.textContent = this.loadingMessages[this.currentMessageIndex];
            messagesContainer.appendChild(newMessage);

            // Trigger reflow for animation
            newMessage.offsetHeight;

            // Animate out old message and in new message
            oldMessage.style.opacity = '0';
            oldMessage.style.transform = 'translate(-50%, -50%) rotateX(90deg)';
            newMessage.classList.add('visible');

            // Remove old message after animation
            setTimeout(() => {
                oldMessage.remove();
            }, 600);

            // Dynamically adjust timing based on message length
            messageDelay = Math.max(1500, Math.min(3000, newMessage.textContent.length * 100));
        }, messageDelay);
    }

    hideLoadingAnimation() {
        const loadingContainer = document.getElementById('loadingContainer');
        if (loadingContainer) {
            clearInterval(this.messageInterval);
            loadingContainer.classList.remove('visible');
        }
    }

    randomizeOptions() {
        console.log('Randomizing options...');
        
        // Helper function to get random item from array
        const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
        
        // Get all select elements
        const selects = {
            storyType: document.getElementById('storyType'),
            theme: document.getElementById('theme'),
            mainCharacter: document.getElementById('mainCharacter'),
            setting: document.getElementById('setting'),
            era: document.getElementById('era'),
            narrativePerson: document.getElementById('narrativePerson'),
            timePeriod: document.getElementById('timePeriod'),
            languageComplexity: document.getElementById('languageComplexity'),
            storyLength: document.getElementById('storyLength'),
            emotionalTone: document.getElementById('emotionalTone'),
            narrativeStyle: document.getElementById('narrativeStyle'),
            plotComplexity: document.getElementById('plotComplexity')
        };

        // Show advanced options
        const advancedOptions = document.querySelector('.advanced-options');
        const toggleButton = document.getElementById('toggleAdvanced');
        if (advancedOptions && advancedOptions.style.display === 'none') {
            this.toggleAdvancedOptions(advancedOptions, toggleButton);
        }

        // Randomly select options for each select element
        Object.entries(selects).forEach(([key, select]) => {
            if (select) {
                const options = Array.from(select.options).filter(option => option.value);
                if (options.length > 0) {
                    const randomOption = getRandomItem(options);
                    select.value = randomOption.value;
                    console.log(`Randomized ${key}:`, randomOption.value);
                }
            }
        });

        // Trigger story generation
        console.log('Triggering story generation...');
        this.handleSubmit(null);
    }

    setLoadingState(isLoading) {
        const submitButton = document.querySelector('.primary-button');
        const randomButton = document.getElementById('randomize');
        const storyOutput = document.querySelector('.story-output');

        if (submitButton) {
            submitButton.disabled = isLoading;
            submitButton.innerHTML = isLoading ? 
                '<i class="fas fa-spinner fa-spin"></i> Generating...' :
                '<i class="fas fa-magic"></i> Generate Story';
        }

        if (randomButton) {
            randomButton.disabled = isLoading;
        }

        if (storyOutput) {
            storyOutput.style.display = isLoading ? 'none' : 'block';
        }
    }

    toggleAdvancedOptions(advancedOptions, toggleButton) {
        if (!advancedOptions || !toggleButton) return;
        
        const isHidden = advancedOptions.style.display === 'none';
        advancedOptions.style.display = isHidden ? 'block' : 'none';
        toggleButton.innerHTML = isHidden ? 
            '<i class="fas fa-times"></i> Hide Advanced Options' :
            '<i class="fas fa-cog"></i> Advanced Options';
    }

    showError(message) {
        console.error('Error:', message);
        alert(message);
    }

    copyStory() {
        const storyContent = document.querySelector('.story-content')?.innerText;
        const storyTitle = document.querySelector('.story-title')?.innerText;
        
        if (!storyContent || !storyTitle) {
            this.showError('No story to copy!');
            return;
        }

        const fullText = `${storyTitle}\n\n${storyContent}`;
        
        navigator.clipboard.writeText(fullText).then(() => {
            alert('Story copied to clipboard!');
        }).catch(() => {
            this.showError('Failed to copy story');
        });
    }

    downloadStory() {
        const storyContent = document.querySelector('.story-content')?.innerText;
        const storyTitle = document.querySelector('.story-title')?.innerText;
        
        if (!storyContent || !storyTitle) {
            this.showError('No story to download!');
            return;
        }

        const fullText = `${storyTitle}\n\n${storyContent}`;
        
        const blob = new Blob([fullText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `${storyTitle.toLowerCase().replace(/\s+/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    revealStory(story) {
        const storyOutput = document.querySelector('.story-output');
        const storyContent = document.querySelector('.story-content');
        
        if (!storyOutput || !storyContent) {
            console.error('Story output elements not found');
            return;
        }
        
        // Make story output visible
        storyOutput.style.display = 'block';
        storyOutput.classList.add('visible');
        
        // Split story into paragraphs and create elements
        const paragraphs = story.split('\n\n');
        storyContent.innerHTML = '';
        
        // Add paragraphs with staggered animation
        paragraphs.forEach((text, index) => {
            if (text.trim()) {
                const p = document.createElement('p');
                p.className = 'story-paragraph';
                p.textContent = text;
                storyContent.appendChild(p);
                
                // Trigger staggered animation
                setTimeout(() => {
                    p.classList.add('reveal');
                }, index * 300);
            }
        });

        // Scroll to story
        storyOutput.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the story generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.storyGenerator = new StoryGenerator();
});
