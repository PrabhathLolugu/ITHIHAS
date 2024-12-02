class ThemeManager {
    constructor() {
        // Get system preference for initial theme if not set
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.theme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
        
        // Add transition class to body after a delay to prevent initial transition
        setTimeout(() => {
            document.body.classList.add('theme-transition');
        }, 100);

        this.updateTheme();
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.updateTheme();
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.updateTheme();
    }

    updateTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update theme color for mobile browsers
        const themeColor = this.theme === 'dark' ? '#141414' : '#ffffff';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
    }

    getCurrentTheme() {
        return this.theme;
    }
}
