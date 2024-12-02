// User authentication and profile management
class Auth {
    constructor() {
        // Initialize users array from localStorage or empty array if none exists
        const storedUsers = localStorage.getItem('users');
        this.users = storedUsers ? JSON.parse(storedUsers) : [];
    }

    register(userData) {
        // Basic validation
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error('All fields are required');
        }

        // Check if user already exists
        const existingUser = this.users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            password: userData.password // In a real app, this should be hashed
        };

        // Add to users array and save to localStorage
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        return true;
    }

    login(email, password) {
        // Basic validation
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Find user
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Set current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    isLoggedIn() {
        return localStorage.getItem('currentUser') !== null;
    }
}
