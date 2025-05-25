
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AuthService } from '@/services/authService';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = AuthService.login(email, password);
    
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card border-0 shadow-2xl">
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-luxury mx-auto flex items-center justify-center mb-4">
          <span className="text-luxury-gold text-2xl font-bold">✨</span>
        </div>
        <CardTitle className="text-2xl bg-gradient-luxury-red bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <p className="text-luxury-black/70">Sign in to your BeautyBoost account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-luxury-red/10 border border-luxury-red/20 text-luxury-red text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-luxury-black font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-luxury-black/50" />
              <Input
                id="email"
                type="email"
                placeholder="admin@beautyboost.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-luxury-black/20 focus:border-luxury-gold"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-luxury-black font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-luxury-black/50" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter any password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 border-luxury-black/20 focus:border-luxury-gold"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-black/50 hover:text-luxury-black"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-luxury hover:opacity-90 text-luxury-gold font-semibold py-2.5"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-luxury-black/60">
              Demo credentials: Use any password with these emails:
            </p>
            <div className="text-xs space-y-1">
              <p className="text-luxury-gold">admin@beautyboost.com (Admin)</p>
              <p className="text-luxury-red">sarah.johnson@email.com (Customer)</p>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-luxury-gold hover:text-luxury-gold-dark text-sm font-medium"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
