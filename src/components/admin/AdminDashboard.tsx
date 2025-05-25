
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Star, TrendingUp, RefreshCw } from 'lucide-react';
import { AuthService } from '@/services/authService';
import { DataService, Booking } from '@/services/dataService';

const AdminDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Get fresh data on each render and when refreshKey changes
  const users = AuthService.getAllUsers().filter(u => u.role === 'customer');
  const allBookings = DataService.getAllBookings();
  
  const totalCustomers = users.length;
  const totalBookings = allBookings.length;
  const completedBookings = allBookings.filter(b => b.status === 'completed').length;
  const upcomingBookings = allBookings.filter(b => b.status === 'upcoming').length;

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setLastUpdated(new Date());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Bronze': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Sort bookings by most recent first
  const sortedBookings = [...allBookings].sort((a, b) => {
    return new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime();
  });

  return (
    <div className="space-y-6 animate-fade-in" key={refreshKey}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-4">
          <h1 className="text-3xl font-bold bg-gradient-luxury-red bg-clip-text text-transparent">
            Admin Dashboard ✨
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            className="border-luxury-gold text-luxury-black hover:bg-luxury-gold/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        <p className="text-luxury-black/70">
          Manage your beauty salon and customer loyalty program
        </p>
        <p className="text-xs text-luxury-black/50">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-0 shadow-xl bg-luxury-black text-luxury-cream">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-luxury-gold" />
            <h3 className="text-2xl font-bold text-luxury-gold">{totalCustomers}</h3>
            <p className="text-sm text-luxury-cream/80">Total Customers</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 shadow-xl bg-luxury-red text-luxury-cream">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-luxury-gold" />
            <h3 className="text-2xl font-bold text-luxury-gold">{totalBookings}</h3>
            <p className="text-sm text-luxury-cream/80">Total Appointments</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 shadow-xl bg-luxury-gold text-luxury-black">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-luxury-black" />
            <h3 className="text-2xl font-bold">{completedBookings}</h3>
            <p className="text-sm text-luxury-black/80">Completed</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 shadow-xl bg-luxury-black-light text-luxury-cream">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-luxury-gold" />
            <h3 className="text-2xl font-bold text-luxury-gold">{upcomingBookings}</h3>
            <p className="text-sm text-luxury-cream/80">Upcoming</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Information */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-luxury-black">
            <Users className="h-5 w-5 text-luxury-gold" />
            <span>Customer Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getTierColor(user.role === 'customer' ? 'Gold' : 'Admin')}>
                      <Star className="h-3 w-3 mr-1" />
                      Gold
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.phone || 'Not provided'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Real-time Appointments */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-luxury-black">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-luxury-gold" />
              <span>Recent Appointments</span>
            </div>
            <Badge variant="outline" className="border-luxury-gold text-luxury-black">
              Live Updates
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Stylist</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBookings.slice(0, 15).map((booking) => {
                const customer = users.find(u => u.id === booking.userId);
                const createdDate = booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A';
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.serviceName}</TableCell>
                    <TableCell>{customer?.name || 'Unknown'}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>{booking.stylist}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${booking.price}</TableCell>
                    <TableCell className="text-xs text-luxury-black/60">{createdDate}</TableCell>
                  </TableRow>
                );
              })}
              {sortedBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-luxury-black/60">
                    No appointments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
