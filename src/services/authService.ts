
import { DataService } from './dataService';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  phone?: string;
  avatar?: string;
  joinDate: string;
}

const STORAGE_KEY = 'beautyboost_current_user';
const USERS_KEY = 'beautyboost_users';

export class AuthService {
  static initializeUsers() {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
      const defaultUsers: User[] = [
        {
          id: 'admin_001',
          email: 'admin@beautyboost.com',
          name: 'Admin User',
          role: 'admin',
          joinDate: '2024-01-01'
        },
        {
          id: 'user_001',
          email: 'sarah.johnson@email.com',
          name: 'Sarah Johnson',
          role: 'customer',
          phone: '+1 (555) 123-4567',
          joinDate: '2024-01-15'
        }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  }

  static getAllUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  }

  static login(email: string, password: string): { success: boolean; user?: User; error?: string } {
    // Simple authentication - in real app, this would be secure
    const users = this.getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // For demo purposes, accept any password
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  }

  static register(userData: {
    email: string;
    name: string;
    password: string;
    phone?: string;
  }): { success: boolean; user?: User; error?: string } {
    const users = this.getAllUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email,
      name: userData.name,
      role: 'customer',
      phone: userData.phone,
      joinDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

    // Initialize user data in DataService
    DataService.initializeUserData(newUser.id);

    return { success: true, user: newUser };
  }

  static logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  static isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}
