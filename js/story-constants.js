// Story generation options
const STORY_OPTIONS = {
    storyTypes: [
        { value: 'epic', label: 'Epic Tale', description: 'Grand narratives featuring heroes and divine interventions' },
        { value: 'moral', label: 'Moral Story', description: 'Tales focusing on ethical lessons and values' },
        { value: 'devotional', label: 'Devotional Story', description: 'Stories celebrating divine love and devotion' },
        { value: 'philosophical', label: 'Philosophical Tale', description: 'Deep contemplations on life and existence' },
        { value: 'historical', label: 'Historical Legend', description: 'Stories based on ancient Indian history' },
        { value: 'mythological', label: 'Mythological Adventure', description: 'Tales of gods, demons, and supernatural beings' }
    ],
    
    themes: [
        { value: 'dharma', label: 'Dharma (Duty)', description: 'Stories about moral duty and righteousness' },
        { value: 'karma', label: 'Karma (Action)', description: 'Tales about cause and effect of actions' },
        { value: 'bhakti', label: 'Bhakti (Devotion)', description: 'Stories of divine love and surrender' },
        { value: 'valor', label: 'Valor & Courage', description: 'Tales of bravery and heroic deeds' },
        { value: 'wisdom', label: 'Wisdom & Knowledge', description: 'Stories emphasizing learning and insight' },
        { value: 'family', label: 'Family & Relationships', description: 'Tales about familial bonds and duties' },
        { value: 'sacrifice', label: 'Sacrifice & Service', description: 'Stories of selfless service and sacrifice' },
        { value: 'transformation', label: 'Transformation', description: 'Tales of personal growth and change' }
    ],

    characters: [
        { value: 'deities', label: 'Divine Beings', description: 'Stories featuring gods and goddesses' },
        { value: 'warriors', label: 'Warriors & Kings', description: 'Tales of kshatriyas and rulers' },
        { value: 'sages', label: 'Sages & Gurus', description: 'Stories of wise teachers and seers' },
        { value: 'common', label: 'Common People', description: 'Tales of ordinary people in extraordinary situations' },
        { value: 'animals', label: 'Mythical Creatures', description: 'Stories featuring divine and mythical beings' }
    ],

    settings: [
        { value: 'ancient_city', label: 'Ancient Cities', description: 'Tales set in historic Indian cities' },
        { value: 'forest', label: 'Sacred Forests', description: 'Stories in mystical woodlands' },
        { value: 'palace', label: 'Royal Courts', description: 'Tales from royal households' },
        { value: 'ashram', label: 'Ashrams', description: 'Stories from spiritual retreats' },
        { value: 'battlefield', label: 'Battlefields', description: 'Tales of war and conflict' },
        { value: 'village', label: 'Village Life', description: 'Stories from rural settings' },
        { value: 'celestial', label: 'Celestial Realms', description: 'Tales from divine worlds' }
    ],

    styles: [
        { value: 'traditional', label: 'Traditional Sanskrit Style', description: 'Classical storytelling with Sanskrit elements' },
        { value: 'contemporary', label: 'Contemporary Style', description: 'Modern narrative approach' },
        { value: 'poetic', label: 'Poetic Style', description: 'Lyrical and metaphorical narration' },
        { value: 'dramatic', label: 'Dramatic Style', description: 'Theatrical and intense narration' },
        { value: 'conversational', label: 'Conversational Style', description: 'Casual and engaging narrative' }
    ],

    emotions: [
        { value: 'shringara', label: 'Shringara (Love)', description: 'Romance and beauty' },
        { value: 'veera', label: 'Veera (Heroic)', description: 'Courage and valor' },
        { value: 'karuna', label: 'Karuna (Compassion)', description: 'Kindness and empathy' },
        { value: 'adbhuta', label: 'Adbhuta (Wonder)', description: 'Marvel and amazement' },
        { value: 'shanta', label: 'Shanta (Peace)', description: 'Tranquility and serenity' },
        { value: 'hasya', label: 'Hasya (Humor)', description: 'Joy and laughter' },
        { value: 'raudra', label: 'Raudra (Fury)', description: 'Anger and intensity' },
        { value: 'bhayanka', label: 'Bhayanka (Fear)', description: 'Terror and suspense' }
    ],

    lengths: [
        { value: 1, label: 'Short', description: 'Brief tale (2-3 paragraphs)', words: 300 },
        { value: 2, label: 'Medium', description: 'Standard story (4-5 paragraphs)', words: 600 },
        { value: 3, label: 'Long', description: 'Detailed narrative (6-8 paragraphs)', words: 1000 },
        { value: 4, label: 'Epic', description: 'Extended saga (10+ paragraphs)', words: 1500 }
    ],

    morals: [
        { value: 'truth', label: 'Truth & Honesty', description: 'Stories emphasizing truthfulness' },
        { value: 'duty', label: 'Duty & Responsibility', description: 'Tales about fulfilling obligations' },
        { value: 'wisdom', label: 'Wisdom & Knowledge', description: 'Stories about gaining insight' },
        { value: 'karma', label: 'Karma & Justice', description: 'Tales about cosmic justice' },
        { value: 'devotion', label: 'Faith & Devotion', description: 'Stories about spiritual dedication' }
    ]
};

// Prompt templates for different story types
const PROMPT_TEMPLATES = {
    epic: (options) => `Generate an Indian mythological story with the following elements:
        - Type: Epic tale focusing on ${options.theme}
        - Characters: Include ${options.characters}
        - Setting: Set in ${options.setting}
        - Style: Narrated in ${options.style}
        - Emotion: Emphasize ${options.emotion}
        - Moral: Incorporate the value of ${options.moral}
        - Length: Approximately ${options.length.words} words
        
        The story should follow traditional Indian storytelling techniques while being engaging for modern readers. Include relevant references to Sanskrit terms and concepts where appropriate.`,

    moral: (options) => `Create a moral-focused Indian story that teaches life lessons:
        - Central Theme: ${options.theme}
        - Main Characters: ${options.characters}
        - Setting: ${options.setting}
        - Narrative Style: ${options.style}
        - Primary Emotion: ${options.emotion}
        - Key Moral: ${options.moral}
        - Length: About ${options.length.words} words
        
        Focus on the moral lesson while maintaining engagement through storytelling. Include traditional Indian wisdom and teachings.`,

    devotional: (options) => `Compose a devotional story from Indian tradition:
        - Theme: ${options.theme}
        - Divine Characters: ${options.characters}
        - Sacred Setting: ${options.setting}
        - Narrative Approach: ${options.style}
        - Devotional Mood: ${options.emotion}
        - Spiritual Message: ${options.moral}
        - Length: ${options.length.words} words
        
        Emphasize the spiritual and devotional aspects while making it accessible to modern readers.`,

    philosophical: (options) => `Create a philosophical tale based on Indian wisdom:
        - Philosophical Theme: ${options.theme}
        - Key Characters: ${options.characters}
        - Contemplative Setting: ${options.setting}
        - Narrative Style: ${options.style}
        - Philosophical Mood: ${options.emotion}
        - Core Teaching: ${options.moral}
        - Length: ${options.length.words} words
        
        Focus on deep philosophical insights while maintaining narrative engagement.`,

    historical: (options) => `Generate a historical legend from ancient India:
        - Historical Theme: ${options.theme}
        - Historical Figures: ${options.characters}
        - Period Setting: ${options.setting}
        - Narrative Voice: ${options.style}
        - Emotional Tone: ${options.emotion}
        - Historical Lesson: ${options.moral}
        - Length: ${options.length.words} words
        
        Blend historical accuracy with engaging storytelling elements.`,

    mythological: (options) => `Create a mythological adventure from Indian traditions:
        - Mythological Theme: ${options.theme}
        - Mythical Beings: ${options.characters}
        - Mystical Setting: ${options.setting}
        - Narrative Style: ${options.style}
        - Dominant Emotion: ${options.emotion}
        - Divine Message: ${options.moral}
        - Length: ${options.length.words} words
        
        Incorporate supernatural elements while maintaining cultural authenticity.`
};
