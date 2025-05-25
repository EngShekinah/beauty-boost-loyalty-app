
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Coins } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-beauty-pink/20 sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-beauty flex items-center justify-center">
          <span className="text-white font-bold text-lg">✨</span>
        </div>
        <div>
          <h1 className="font-bold text-lg bg-gradient-beauty bg-clip-text text-transparent">
            BeautyBoost
          </h1>
          <p className="text-xs text-muted-foreground">Loyalty Rewards</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Badge variant="secondary" className="bg-beauty-gold-light text-beauty-gold border-beauty-gold animate-bounce-gentle">
          <Coins className="h-3 w-3 mr-1" />
          2,450
        </Badge>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-beauty-pink rounded-full"></div>
        </Button>
        <Button variant="ghost" size="sm">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
