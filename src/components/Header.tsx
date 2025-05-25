
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Coins, LogOut } from 'lucide-react';
import { useLocalData } from '@/hooks/useLocalData';
import { AuthService } from '@/services/authService';

const Header = () => {
  const { userPoints } = useLocalData();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-luxury-black/80 backdrop-blur-md border-b border-luxury-gold/20 sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-luxury flex items-center justify-center">
          <span className="text-luxury-gold font-bold text-lg">✨</span>
        </div>
        <div>
          <h1 className="font-bold text-lg bg-gradient-luxury-red bg-clip-text text-transparent">
            BeautyBoost
          </h1>
          <p className="text-xs text-luxury-cream/70">Welcome, {currentUser?.name}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Badge variant="secondary" className="bg-luxury-gold text-luxury-black border-luxury-gold animate-bounce-gentle">
          <Coins className="h-3 w-3 mr-1" />
          {userPoints.toLocaleString()}
        </Badge>
        <Button variant="ghost" size="sm" className="relative text-luxury-cream hover:text-luxury-gold">
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-luxury-red rounded-full"></div>
        </Button>
        <Button variant="ghost" size="sm" className="text-luxury-cream hover:text-luxury-gold">
          <User className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="text-luxury-cream hover:text-luxury-red"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
