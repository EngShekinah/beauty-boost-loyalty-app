
import { useState, useEffect } from 'react';
import { DataService, UserProfile, PointsTransaction, Booking, RedeemedReward } from '@/services/dataService';

export const useLocalData = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState<PointsTransaction[]>([]);
  const [servicesHistory, setServicesHistory] = useState<any[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);

  // Initialize data and load initial state
  useEffect(() => {
    DataService.initialize();
    loadData();
  }, []);

  const loadData = () => {
    setUserProfile(DataService.getUserProfile());
    setUserPoints(DataService.getUserPoints());
    setPointsHistory(DataService.getPointsHistory());
    setServicesHistory(DataService.getServicesHistory());
    setBookings(DataService.getBookings());
    setRedeemedRewards(DataService.getRedeemedRewards());
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    DataService.updateUserProfile(updates);
    setUserProfile(DataService.getUserProfile());
  };

  const addPoints = (amount: number, description: string, serviceId?: string) => {
    DataService.addPoints(amount, description, serviceId);
    DataService.updateUserTier();
    loadData(); // Refresh all data
  };

  const redeemPoints = (amount: number, description: string, rewardId: string): boolean => {
    const success = DataService.redeemPoints(amount, description, rewardId);
    if (success) {
      DataService.updateUserTier();
      loadData(); // Refresh all data
    }
    return success;
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking = DataService.addBooking(booking);
    setBookings(DataService.getBookings());
    return newBooking;
  };

  const completeBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      DataService.updateBookingStatus(bookingId, 'completed');
      addPoints(booking.points, booking.serviceName, booking.serviceId);
      DataService.addServiceToHistory({
        name: booking.serviceName,
        date: booking.date,
        points: booking.points
      });
    }
  };

  const addRedeemedReward = (reward: Omit<RedeemedReward, 'id'>) => {
    const newReward = DataService.addRedeemedReward(reward);
    setRedeemedRewards(DataService.getRedeemedRewards());
    return newReward;
  };

  const refreshData = () => {
    loadData();
  };

  return {
    // Data
    userProfile,
    userPoints,
    pointsHistory,
    servicesHistory,
    bookings,
    redeemedRewards,
    
    // Actions
    updateProfile,
    addPoints,
    redeemPoints,
    addBooking,
    completeBooking,
    addRedeemedReward,
    refreshData,
    
    // Utilities
    clearAllData: DataService.clearAllData,
  };
};
