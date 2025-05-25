
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, Gift, Calendar, User, Heart, Coins } from 'lucide-react';

const Dashboard = () => {
  const userPoints = 2450;
  const nextTierPoints = 3000;
  const currentTier = 'Gold';
  const progressPercentage = (userPoints / nextTierPoints) * 100;

  const recentServices = [
    { name: 'Hair Cut & Style', date: '2024-05-20', points: 150 },
    { name: 'Facial Treatment', date: '2024-05-15', points: 200 },
    { name: 'Manicure', date: '2024-05-10', points: 100 },
  ];

  const availableRewards = [
    { name: 'Free Hair Wash', points: 100, available: true },
    { name: '20% Off Next Service', points: 200, available: true },
    { name: 'Complimentary Facial', points: 500, available: true },
    { name: 'VIP Treatment Package', points: 1000, available: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-beauty bg-clip-text text-transparent">
          Welcome back, Sarah! ✨
        </h1>
        <p className="text-muted-foreground">
          You're glowing! Here's your beauty journey update.
        </p>
      </div>

      {/* Points & Tier Card */}
      <Card className="glass-card border-0 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center space-x-2">
            <Coins className="h-6 w-6 text-beauty-gold" />
            <CardTitle className="text-2xl">Loyalty Points</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent points-shimmer">
              {userPoints.toLocaleString()}
            </div>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Badge variant="secondary" className={`tier-badge ${
                currentTier === 'Gold' ? 'bg-beauty-gold text-black' : 
                currentTier === 'Silver' ? 'bg-gray-300 text-gray-800' : 
                'bg-orange-300 text-orange-800'
              }`}>
                <Star className="h-3 w-3 mr-1" />
                {currentTier} Member
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Platinum</span>
              <span>{nextTierPoints - userPoints} points to go</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-beauty-purple" />
            <h3 className="font-semibold mb-1">Book Appointment</h3>
            <p className="text-sm text-muted-foreground">Schedule your next visit</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <CardContent className="p-4 text-center">
            <Gift className="h-8 w-8 mx-auto mb-2 text-beauty-pink" />
            <h3 className="font-semibold mb-1">Redeem Rewards</h3>
            <p className="text-sm text-muted-foreground">Use your points</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Rewards */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-beauty-pink" />
            <span>Available Rewards</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {availableRewards.map((reward, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-beauty-pink-light/50 hover:bg-beauty-pink-light transition-colors">
                <div>
                  <h4 className="font-medium">{reward.name}</h4>
                  <p className="text-sm text-muted-foreground">{reward.points} points</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-gradient-beauty hover:opacity-90 transition-opacity"
                  disabled={userPoints < reward.points}
                >
                  {userPoints >= reward.points ? 'Redeem' : 'Not enough points'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-beauty-rose" />
            <span>Recent Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div>
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-muted-foreground">{service.date}</p>
                </div>
                <Badge variant="outline" className="bg-beauty-gold-light text-beauty-gold border-beauty-gold">
                  +{service.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
