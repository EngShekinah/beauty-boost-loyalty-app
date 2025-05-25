
import React, { useState } from 'react';
import Header from '@/components/Header';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/services/authService';
import { LogOut } from 'lucide-react';

const AdminIndex = () => {
  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <div className="flex items-center justify-between p-4 bg-luxury-black/80 backdrop-blur-md border-b border-luxury-gold/20 sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-luxury-red flex items-center justify-center">
            <span className="text-luxury-gold font-bold text-lg">✨</span>
          </div>
          <div>
            <h1 className="font-bold text-lg bg-gradient-luxury-red bg-clip-text text-transparent">
              BeautyBoost Admin
            </h1>
            <p className="text-xs text-luxury-cream/70">Management Portal</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="text-luxury-cream hover:text-luxury-gold hover:bg-luxury-gold/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <main className="p-4 max-w-7xl mx-auto">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminIndex;
