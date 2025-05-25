// Local storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'beautyboost_user_profile',
  USER_POINTS: 'beautyboost_user_points',
  POINTS_HISTORY: 'beautyboost_points_history',
  BOOKINGS: 'beautyboost_bookings',
  REDEEMED_REWARDS: 'beautyboost_redeemed_rewards',
  AVAILABLE_REWARDS: 'beautyboost_available_rewards',
  SERVICES_HISTORY: 'beautyboost_services_history',
};

// Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinDate: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export interface PointsTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: string;
  serviceId?: string;
  rewardId?: string;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  stylist: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  points: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface RedeemedReward {
  id: string;
  rewardId: string;
  rewardName: string;
  pointsCost: number;
  redeemedAt: string;
  status: 'active' | 'used' | 'expired';
  expiryDate?: string;
}

// Add user-specific storage keys
const getUserStorageKey = (userId: string, key: string) => `${key}_${userId}`;

// Initialize default data
const initializeDefaultData = (userId?: string) => {
  const currentUserId = userId || 'user_001';
  
  // Default user profile
  if (!localStorage.getItem(getUserStorageKey(currentUserId, STORAGE_KEYS.USER_PROFILE))) {
    const defaultProfile: UserProfile = {
      id: currentUserId,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15',
      tier: 'Gold'
    };
    localStorage.setItem(getUserStorageKey(currentUserId, STORAGE_KEYS.USER_PROFILE), JSON.stringify(defaultProfile));
  }

  // Default points
  if (!localStorage.getItem(getUserStorageKey(currentUserId, STORAGE_KEYS.USER_POINTS))) {
    localStorage.setItem(getUserStorageKey(currentUserId, STORAGE_KEYS.USER_POINTS), '2450');
  }

  // Default points history
  if (!localStorage.getItem(getUserStorageKey(currentUserId, STORAGE_KEYS.POINTS_HISTORY))) {
    const defaultHistory: PointsTransaction[] = [
      {
        id: 'txn_001',
        type: 'earned',
        amount: 150,
        description: 'Hair Cut & Style',
        date: '2024-05-20'
      },
      {
        id: 'txn_002',
        type: 'earned',
        amount: 200,
        description: 'Facial Treatment',
        date: '2024-05-15'
      },
      {
        id: 'txn_003',
        type: 'earned',
        amount: 100,
        description: 'Manicure',
        date: '2024-05-10'
      }
    ];
    localStorage.setItem(getUserStorageKey(currentUserId, STORAGE_KEYS.POINTS_HISTORY), JSON.stringify(defaultHistory));
  }

  // Default services history
  if (!localStorage.getItem(getUserStorageKey(currentUserId, STORAGE_KEYS.SERVICES_HISTORY))) {
    const defaultServices = [
      { name: 'Hair Cut & Style', date: '2024-05-20', points: 150 },
      { name: 'Facial Treatment', date: '2024-05-15', points: 200 },
      { name: 'Manicure', date: '2024-05-10', points: 100 }
    ];
    localStorage.setItem(getUserStorageKey(currentUserId, STORAGE_KEYS.SERVICES_HISTORY), JSON.stringify(defaultServices));
  }

  // Initialize empty arrays for other data
  if (!localStorage.getItem(getUserStorageKey(currentUserId, STORAGE_KEYS.BOOKINGS))) {
    localStorage.setItem(getUserStorageKey(currentUserId, STORAGE_KEYS.BOOKINGS), JSON.stringify([]));
  }

  if (!localStorage.getItem(getUserStorageKey(currentUserId, STORAGE_KEYS.REDEEMED_REWARDS))) {
    localStorage.setItem(getUserStorageKey(currentUserId, STORAGE_KEYS.REDEEMED_REWARDS), JSON.stringify([]));
  }
};

// Data service functions
export class DataService {
  static currentUserId: string = 'user_001';

  static setCurrentUser(userId: string) {
    this.currentUserId = userId;
  }

  static initialize(userId?: string) {
    if (userId) {
      this.currentUserId = userId;
    }
    initializeDefaultData(this.currentUserId);
  }

  static initializeUserData(userId: string) {
    this.setCurrentUser(userId);
    initializeDefaultData(userId);
  }

  // User Profile
  static getUserProfile(): UserProfile | null {
    const data = localStorage.getItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.USER_PROFILE));
    return data ? JSON.parse(data) : null;
  }

  static updateUserProfile(profile: Partial<UserProfile>): void {
    const current = this.getUserProfile();
    if (current) {
      const updated = { ...current, ...profile };
      localStorage.setItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.USER_PROFILE), JSON.stringify(updated));
    }
  }

  // Points
  static getUserPoints(): number {
    const points = localStorage.getItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.USER_POINTS));
    return points ? parseInt(points, 10) : 0;
  }

  static updateUserPoints(newPoints: number): void {
    localStorage.setItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.USER_POINTS), newPoints.toString());
  }

  static addPoints(amount: number, description: string, serviceId?: string): void {
    const currentPoints = this.getUserPoints();
    const newPoints = currentPoints + amount;
    this.updateUserPoints(newPoints);

    // Add to history
    const transaction: PointsTransaction = {
      id: `txn_${Date.now()}`,
      type: 'earned',
      amount,
      description,
      date: new Date().toISOString().split('T')[0],
      serviceId
    };
    this.addPointsTransaction(transaction);
  }

  static redeemPoints(amount: number, description: string, rewardId: string): boolean {
    const currentPoints = this.getUserPoints();
    if (currentPoints >= amount) {
      const newPoints = currentPoints - amount;
      this.updateUserPoints(newPoints);

      // Add to history
      const transaction: PointsTransaction = {
        id: `txn_${Date.now()}`,
        type: 'redeemed',
        amount,
        description,
        date: new Date().toISOString().split('T')[0],
        rewardId
      };
      this.addPointsTransaction(transaction);
      return true;
    }
    return false;
  }

  // Points History
  static getPointsHistory(): PointsTransaction[] {
    const data = localStorage.getItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.POINTS_HISTORY));
    return data ? JSON.parse(data) : [];
  }

  static addPointsTransaction(transaction: PointsTransaction): void {
    const history = this.getPointsHistory();
    history.unshift(transaction);
    localStorage.setItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.POINTS_HISTORY), JSON.stringify(history));
  }

  // Services History
  static getServicesHistory(): any[] {
    const data = localStorage.getItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.SERVICES_HISTORY));
    return data ? JSON.parse(data) : [];
  }

  static addServiceToHistory(service: any): void {
    const history = this.getServicesHistory();
    history.unshift(service);
    localStorage.setItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.SERVICES_HISTORY), JSON.stringify(history));
  }

  // Bookings
  static getBookings(): Booking[] {
    const data = localStorage.getItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.BOOKINGS));
    return data ? JSON.parse(data) : [];
  }

  // Get all bookings for admin view
  static getAllBookings(): Booking[] {
    const allBookings: Booking[] = [];
    const users = JSON.parse(localStorage.getItem('beautyboost_users') || '[]');
    
    users.forEach((user: any) => {
      const userBookings = localStorage.getItem(getUserStorageKey(user.id, STORAGE_KEYS.BOOKINGS));
      if (userBookings) {
        const bookings = JSON.parse(userBookings);
        allBookings.push(...bookings);
      }
    });
    
    return allBookings;
  }

  static addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const newBooking: Booking = {
      ...booking,
      id: `booking_${Date.now()}`,
      userId: this.currentUserId,
      createdAt: new Date().toISOString()
    };
    
    const bookings = this.getBookings();
    bookings.push(newBooking);
    localStorage.setItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.BOOKINGS), JSON.stringify(bookings));
    
    return newBooking;
  }

  static updateBookingStatus(bookingId: string, status: Booking['status']): void {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      localStorage.setItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.BOOKINGS), JSON.stringify(bookings));
    }
  }

  // Redeemed Rewards
  static getRedeemedRewards(): RedeemedReward[] {
    const data = localStorage.getItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.REDEEMED_REWARDS));
    return data ? JSON.parse(data) : [];
  }

  static addRedeemedReward(reward: Omit<RedeemedReward, 'id'>): RedeemedReward {
    const newReward: RedeemedReward = {
      ...reward,
      id: `reward_${Date.now()}`
    };
    
    const rewards = this.getRedeemedRewards();
    rewards.push(newReward);
    localStorage.setItem(getUserStorageKey(this.currentUserId, STORAGE_KEYS.REDEEMED_REWARDS), JSON.stringify(rewards));
    
    return newReward;
  }

  // Tier calculation
  static calculateTier(points: number): UserProfile['tier'] {
    if (points >= 5000) return 'Platinum';
    if (points >= 3000) return 'Gold';
    if (points >= 1000) return 'Silver';
    return 'Bronze';
  }

  static updateUserTier(): void {
    const points = this.getUserPoints();
    const newTier = this.calculateTier(points);
    this.updateUserProfile({ tier: newTier });
  }

  // Clear all data (for testing)
  static clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      // Clear for current user
      localStorage.removeItem(getUserStorageKey(this.currentUserId, key));
    });
  }
}
