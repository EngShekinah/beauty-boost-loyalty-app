
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Gift, Calendar, Bell } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'booking', label: 'Book', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-beauty-pink/20 p-4 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 h-auto p-2 ${
                activeTab === item.id
                  ? 'text-beauty-pink bg-beauty-pink-light/50'
                  : 'text-muted-foreground hover:text-beauty-pink'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
