
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, Sparkles, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RewardsCatalog = () => {
  const { toast } = useToast();
  const [userPoints] = useState(2450);

  const rewards = [
    {
      id: 1,
      name: 'Free Hair Wash & Blow Dry',
      description: 'Enjoy a complimentary hair wash and professional blow dry',
      points: 100,
      category: 'Hair Care',
      icon: '💇‍♀️',
      tier: 'Bronze'
    },
    {
      id: 2,
      name: '15% Off Any Service',
      description: 'Get 15% discount on your next beauty service',
      points: 200,
      category: 'Discount',
      icon: '💰',
      tier: 'Silver'
    },
    {
      id: 3,
      name: 'Luxury Facial Treatment',
      description: 'Premium facial with anti-aging serums and masks',
      points: 500,
      category: 'Skincare',
      icon: '✨',
      tier: 'Gold'
    },
    {
      id: 4,
      name: 'Complete Manicure & Pedicure',
      description: 'Full nail care treatment with gel polish',
      points: 350,
      category: 'Nail Care',
      icon: '💅',
      tier: 'Silver'
    },
    {
      id: 5,
      name: 'VIP Day Package',
      description: 'Full day of pampering: hair, nails, facial, and massage',
      points: 1000,
      category: 'Premium',
      icon: '👑',
      tier: 'Platinum'
    },
    {
      id: 6,
      name: 'Professional Makeup Session',
      description: 'Get your makeup done by our professional artists',
      points: 300,
      category: 'Makeup',
      icon: '💄',
      tier: 'Gold'
    }
  ];

  const handleRedeem = (reward: any) => {
    if (userPoints >= reward.points) {
      toast({
        title: "Reward Redeemed! 🎉",
        description: `You've successfully redeemed ${reward.name}. Check your profile for the voucher.`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - userPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Bronze': return <Star className="h-3 w-3" />;
      case 'Silver': return <Star className="h-3 w-3" />;
      case 'Gold': return <Sparkles className="h-3 w-3" />;
      case 'Platinum': return <Crown className="h-3 w-3" />;
      default: return <Star className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-beauty bg-clip-text text-transparent">
          Rewards Catalog
        </h1>
        <p className="text-muted-foreground">
          Discover amazing rewards waiting for you
        </p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-muted-foreground">Your balance:</span>
          <Badge variant="secondary" className="bg-beauty-gold-light text-beauty-gold border-beauty-gold">
            {userPoints.toLocaleString()} points
          </Badge>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewards.map((reward) => (
          <Card 
            key={reward.id} 
            className="glass-card border-0 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span className="text-2xl">{reward.icon}</span>
                    <span>{reward.name}</span>
                  </CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`${getTierColor(reward.tier)} text-xs`}
                  >
                    {getTierIcon(reward.tier)}
                    <span className="ml-1">{reward.tier}</span>
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-beauty-purple">
                    {reward.points}
                  </div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {reward.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {reward.category}
                </Badge>
                <Button 
                  className={`${
                    userPoints >= reward.points 
                      ? 'bg-gradient-beauty hover:opacity-90' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition-all duration-300`}
                  disabled={userPoints < reward.points}
                  onClick={() => handleRedeem(reward)}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  {userPoints >= reward.points ? 'Redeem' : 'Insufficient Points'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Earn More Points CTA */}
      <Card className="glass-card border-0 bg-gradient-beauty text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Want More Points?</h3>
          <p className="mb-4 opacity-90">
            Book your next appointment and earn points with every visit!
          </p>
          <Button variant="secondary" className="bg-white text-beauty-purple hover:bg-white/90">
            Book Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsCatalog;
