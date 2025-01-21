class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        document.documentElement.dataset.theme = this.theme;
        this.updateMetaThemeColor();
        this.setupListeners();
    }

    setupListeners() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        document.documentElement.dataset.theme = this.theme;
        this.updateMetaThemeColor();
    }

    updateMetaThemeColor() {
        const color = this.theme === 'dark' ? '#141414' : '#ffffff';
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
    }
}

// Initialize theme manager
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
