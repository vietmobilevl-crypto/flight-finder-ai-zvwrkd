
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    time: string;
    airport: string;
    city: string;
  };
  arrival: {
    time: string;
    airport: string;
    city: string;
  };
  duration: string;
  price: number;
  stops: number;
  aiScore: number;
  aircraft?: string;
  amenities?: string[];
}

export interface SearchParams {
  fromCity: string;
  toCity: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  tripType: 'oneWay' | 'roundTrip';
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  passportNumber?: string;
}

export interface BookingDetails {
  bookingReference: string;
  flight: Flight;
  passenger: PassengerInfo;
  seatSelection?: string;
  addOns: {
    baggage: boolean;
    meal?: string;
    insurance?: boolean;
  };
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}
