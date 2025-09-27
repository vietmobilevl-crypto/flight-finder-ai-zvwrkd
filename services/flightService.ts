
import { Flight, SearchParams } from '../types/flight';

// Mock flight data with AI scoring
const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'SkyLine Airways',
    flightNumber: 'SL 1234',
    departure: { time: '08:30', airport: 'JFK', city: 'New York' },
    arrival: { time: '11:45', airport: 'LAX', city: 'Los Angeles' },
    duration: '5h 15m',
    price: 299,
    stops: 0,
    aiScore: 95,
    aircraft: 'Boeing 737-800',
    amenities: ['WiFi', 'Entertainment', 'Power Outlets'],
  },
  {
    id: '2',
    airline: 'Global Wings',
    flightNumber: 'GW 5678',
    departure: { time: '14:20', airport: 'JFK', city: 'New York' },
    arrival: { time: '17:55', airport: 'LAX', city: 'Los Angeles' },
    duration: '5h 35m',
    price: 249,
    stops: 0,
    aiScore: 88,
    aircraft: 'Airbus A320',
    amenities: ['WiFi', 'Snacks'],
  },
  {
    id: '3',
    airline: 'Budget Air',
    flightNumber: 'BA 9012',
    departure: { time: '06:15', airport: 'JFK', city: 'New York' },
    arrival: { time: '12:30', airport: 'LAX', city: 'Los Angeles' },
    duration: '8h 15m',
    price: 179,
    stops: 1,
    aiScore: 72,
    aircraft: 'Boeing 737-700',
    amenities: ['Basic Service'],
  },
  {
    id: '4',
    airline: 'Premium Jets',
    flightNumber: 'PJ 3456',
    departure: { time: '19:45', airport: 'JFK', city: 'New York' },
    arrival: { time: '23:10', airport: 'LAX', city: 'Los Angeles' },
    duration: '5h 25m',
    price: 399,
    stops: 0,
    aiScore: 91,
    aircraft: 'Boeing 787-9',
    amenities: ['WiFi', 'Premium Entertainment', 'Power Outlets', 'Premium Meals'],
  },
  {
    id: '5',
    airline: 'Express Air',
    flightNumber: 'EA 7890',
    departure: { time: '12:00', airport: 'JFK', city: 'New York' },
    arrival: { time: '15:30', airport: 'LAX', city: 'Los Angeles' },
    duration: '5h 30m',
    price: 329,
    stops: 0,
    aiScore: 85,
    aircraft: 'Airbus A321',
    amenities: ['WiFi', 'Entertainment'],
  },
];

// AI-powered flight search simulation
export const searchFlights = async (params: SearchParams): Promise<Flight[]> => {
  console.log('AI Flight Search initiated with params:', params);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // AI scoring algorithm simulation
  const scoredFlights = mockFlights.map(flight => {
    let aiScore = flight.aiScore;
    
    // AI factors that affect scoring:
    // 1. Price competitiveness (lower price = higher score)
    const priceScore = Math.max(0, 100 - (flight.price / 10));
    
    // 2. Direct flights preferred
    const directScore = flight.stops === 0 ? 20 : 0;
    
    // 3. Departure time preferences (morning flights slightly preferred)
    const hour = parseInt(flight.departure.time.split(':')[0]);
    const timeScore = hour >= 6 && hour <= 10 ? 10 : hour >= 14 && hour <= 18 ? 5 : 0;
    
    // 4. Aircraft type and amenities
    const amenityScore = flight.amenities ? flight.amenities.length * 2 : 0;
    
    // Calculate final AI score
    aiScore = Math.min(100, Math.round((priceScore * 0.4 + directScore * 0.3 + timeScore * 0.2 + amenityScore * 0.1)));
    
    return {
      ...flight,
      aiScore,
    };
  });
  
  // Sort by AI score by default
  return scoredFlights.sort((a, b) => b.aiScore - a.aiScore);
};

// AI price prediction
export const getPricePrediction = (flightId: string): { trend: 'up' | 'down' | 'stable'; confidence: number; recommendation: string } => {
  const predictions = [
    { trend: 'down' as const, confidence: 85, recommendation: 'Wait 2-3 days for better prices' },
    { trend: 'up' as const, confidence: 92, recommendation: 'Book now - prices likely to increase' },
    { trend: 'stable' as const, confidence: 78, recommendation: 'Prices are stable - book when ready' },
  ];
  
  return predictions[Math.floor(Math.random() * predictions.length)];
};

// AI travel insights
export const getTravelInsights = (route: string): string[] => {
  const insights = [
    'Best time to book: 6-8 weeks before departure',
    'Tuesday and Wednesday flights are typically 15% cheaper',
    'Morning flights have 20% fewer delays',
    'This route has 95% on-time performance',
    'Average price for this route: $275',
    'Peak season: June-August (prices 30% higher)',
  ];
  
  return insights.slice(0, 3);
};
