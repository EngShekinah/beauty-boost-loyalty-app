
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingSystem = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    {
      id: 1,
      name: 'Hair Cut & Style',
      duration: '60 min',
      price: 65,
      points: 150,
      stylist: 'Emma Rodriguez',
      rating: 4.9,
      description: 'Professional cut and styling'
    },
    {
      id: 2,
      name: 'Premium Facial',
      duration: '90 min',
      price: 120,
      points: 250,
      stylist: 'Sarah Johnson',
      rating: 4.8,
      description: 'Deep cleansing and anti-aging treatment'
    },
    {
      id: 3,
      name: 'Manicure & Pedicure',
      duration: '75 min',
      price: 85,
      points: 180,
      stylist: 'Lisa Chen',
      rating: 4.9,
      description: 'Complete nail care with gel polish'
    },
    {
      id: 4,
      name: 'Hair Color & Highlights',
      duration: '150 min',
      price: 180,
      points: 350,
      stylist: 'Emma Rodriguez',
      rating: 4.9,
      description: 'Professional coloring and highlighting'
    },
    {
      id: 5,
      name: 'Massage Therapy',
      duration: '60 min',
      price: 95,
      points: 200,
      stylist: 'Maria Santos',
      rating: 4.7,
      description: 'Relaxing full body massage'
    },
    {
      id: 6,
      name: 'Eyebrow Shaping',
      duration: '30 min',
      price: 35,
      points: 80,
      stylist: 'Lisa Chen',
      rating: 4.8,
      description: 'Professional eyebrow threading and shaping'
    }
  ];

  const availableDates = [
    '2024-05-27',
    '2024-05-28',
    '2024-05-29',
    '2024-05-30',
    '2024-05-31',
  ];

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBooking = () => {
    if (selectedService && selectedDate && selectedTime) {
      toast({
        title: "Appointment Booked! 🎉",
        description: `Your ${selectedService.name} appointment is confirmed for ${selectedDate} at ${selectedTime}. You'll earn ${selectedService.points} points!`,
      });
      setSelectedService(null);
      setSelectedDate('');
      setSelectedTime('');
    } else {
      toast({
        title: "Please Complete Your Selection",
        description: "Please select a service, date, and time for your appointment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-beauty bg-clip-text text-transparent">
          Book Your Appointment
        </h1>
        <p className="text-muted-foreground">
          Choose your perfect beauty experience
        </p>
      </div>

      {/* Services Selection */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-beauty-gold" />
            <span>Select a Service</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedService?.id === service.id
                    ? 'border-beauty-pink bg-beauty-pink-light/50 shadow-lg'
                    : 'border-border hover:border-beauty-pink/50 hover:bg-beauty-pink-light/20'
                }`}
                onClick={() => setSelectedService(service)}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{service.name}</h3>
                    <Badge variant="outline" className="bg-beauty-gold-light text-beauty-gold border-beauty-gold">
                      +{service.points} pts
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{service.stylist}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-beauty-gold text-beauty-gold" />
                      <span>{service.rating}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </span>
                    <span className="font-bold text-beauty-purple">${service.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      {selectedService && (
        <Card className="glass-card border-0 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-beauty-purple" />
              <span>Select Date</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {availableDates.map((date) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? "default" : "outline"}
                  className={`h-auto p-3 ${
                    selectedDate === date
                      ? 'bg-gradient-beauty text-white'
                      : 'hover:border-beauty-pink'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-xs">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Selection */}
      {selectedService && selectedDate && (
        <Card className="glass-card border-0 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-beauty-pink" />
              <span>Select Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`${
                    selectedTime === time
                      ? 'bg-gradient-beauty text-white'
                      : 'hover:border-beauty-pink'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Summary */}
      {selectedService && selectedDate && selectedTime && (
        <Card className="glass-card border-0 bg-gradient-beauty text-white animate-scale-in">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Service:</span>
                <span className="font-semibold">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Stylist:</span>
                <span>{selectedService.stylist}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{selectedService.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-bold">${selectedService.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Points Earned:</span>
                <span className="font-bold">+{selectedService.points} pts</span>
              </div>
            </div>
            <Button 
              className="w-full bg-white text-beauty-purple hover:bg-white/90 font-semibold"
              onClick={handleBooking}
            >
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingSystem;
