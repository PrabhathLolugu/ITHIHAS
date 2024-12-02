class OllamaClient {
    constructor() {
        this.baseUrl = 'http://localhost:11434/api'; // Changed to direct Ollama port
        this.isGenerating = false;
        console.log('OllamaClient initialized');
    }

    async testConnection() {
        try {
            console.log('Testing connection to server...');
            const response = await fetch(`${this.baseUrl}/health`);
            
            if (!response.ok) {
                console.error('Server health check failed:', response.status, response.statusText);
                return false;
            }

            const data = await response.json();
            console.log('Server health check response:', data);
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }

    async generateStory(prompt, retryCount = 0) {
        if (this.isGenerating) {
            throw new Error('Story generation already in progress');
        }

        try {
            this.isGenerating = true;
            console.log('Generating story with prompt:', prompt);

            const response = await fetch(`${this.baseUrl}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama3.2',
                    prompt: prompt,
                    stream: false,
                    options: {
                        temperature: 0.9,
                        top_p: 0.9,
                        top_k: 40,
                        max_tokens: 2000,
                        presence_penalty: 1.1,
                        frequency_penalty: 1.1
                    }
                })
            });

            console.log('Received response status:', response.status);
            
            if (response.status === 429) {
                const data = await response.json();
                const retryAfter = data.retryAfter || 60;
                console.log(`Rate limit hit. Waiting ${retryAfter} seconds...`);
                
                if (retryCount < 3) {
                    this.isGenerating = false;
                    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                    return this.generateStory(prompt, retryCount + 1);
                } else {
                    throw new Error('Maximum retry attempts reached. Please try again later.');
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response from Ollama:', data);
            
            if (!data.response) {
                console.error('No story in response:', data);
                throw new Error('No story generated in response');
            }

            // Format the response if it doesn't have TITLE and STORY markers
            let formattedResponse = data.response;
            if (!formattedResponse.includes('TITLE:')) {
                console.log('Formatting response with title/story markers');
                const lines = formattedResponse.split('\n');
                const title = lines[0].trim();
                const story = lines.slice(1).join('\n').trim();
                formattedResponse = `TITLE: ${title}\nSTORY: ${story}`;
            }

            console.log('Final formatted response:', formattedResponse);
            return formattedResponse;

        } catch (error) {
            console.error('Error generating story:', error);
            throw error;
        } finally {
            this.isGenerating = false;
        }
    }

    constructPrompt(options) {
        const {
            storyType, theme, mainCharacter, setting, era,
            narrativePerson, timePeriod, languageComplexity,
            emotionalTone, narrativeStyle, plotComplexity,
            storyLength
        } = options;

        // Shorter prompt to reduce token usage
        const prompt = `As a master storyteller of Indian mythology, create a ${storyLength} story with these elements:

THEME: ${theme} (Main focus)
SETTING: ${setting} in ${era}
CHARACTERS: ${mainCharacter} as protagonist
STYLE: ${narrativeStyle}
TYPE: ${storyType}

Requirements:
1. Include Sanskrit terms naturally
2. Focus on cultural authenticity
3. Keep the narrative engaging

Format your response exactly as:
TITLE: [An evocative title]
STORY: [Your story with clear paragraphs]

Begin the story now:`;

        return prompt;
    }
}

// Export for use in other files
window.OllamaClient = OllamaClient;
