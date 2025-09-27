
import { useState, useCallback } from 'react';
import { Flight, SearchParams } from '../types/flight';
import { searchFlights } from '../services/flightService';

export const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Searching flights with AI...', params);
      const results = await searchFlights(params);
      setFlights(results);
    } catch (err) {
      console.error('Flight search error:', err);
      setError('Failed to search flights. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const sortFlights = useCallback((sortBy: 'price' | 'duration' | 'aiScore') => {
    const sorted = [...flights].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'aiScore':
          return b.aiScore - a.aiScore;
        default:
          return 0;
      }
    });
    setFlights(sorted);
  }, [flights]);

  return {
    flights,
    loading,
    error,
    search,
    sortFlights,
  };
};
