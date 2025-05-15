import Amadeus from 'amadeus';
import { amadeusConfig, debugEnv } from './env';

// Debug environment variables to help troubleshoot
debugEnv();

// Initialize the Amadeus client with environment variables if available
let amadeus: Amadeus | null = null;

try {
  if (amadeusConfig.clientId && amadeusConfig.clientSecret) {
    amadeus = new Amadeus({
      clientId: amadeusConfig.clientId,
      clientSecret: amadeusConfig.clientSecret,
    });
    console.log('Amadeus client initialized successfully');
  } else {
    console.warn('Amadeus API credentials missing. Some functionality will use mock data instead.');
  }
} catch (error) {
  console.error('Error initializing Amadeus client:', error);
}

export interface FlightSearchParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  includedAirlineCodes?: string;
  excludedAirlineCodes?: string;
  nonStop?: boolean;
  currencyCode?: string;
  maxPrice?: number;
  max?: number;
}

export async function searchFlights(params: FlightSearchParams) {
  try {
    if (!amadeus) {
      console.warn('Amadeus client not initialized. Returning empty result.');
      return [];
    }

    const response = await amadeus.shopping.flightOffersSearch.get({
      ...params,
      currencyCode: params.currencyCode || 'USD',
      max: params.max || 20,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
}

// Format airport code from full name (e.g., "Addis Ababa (ADD)" -> "ADD")
export function extractAirportCode(location: string): string {
  const match = location.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : location;
}

// Helper method to transform Amadeus API response to our app's format
export function transformFlightOffers(offers: any[]) {
  if (!offers || !Array.isArray(offers) || offers.length === 0) {
    return [];
  }
  
  return offers.map((offer: any) => {
    const firstSegment = offer.itineraries[0].segments[0];
    const lastSegment = offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1];
    
    // Calculate duration in hours and minutes
    const durationMatch = offer.itineraries[0].duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = durationMatch[1] ? parseInt(durationMatch[1]) : 0;
    const minutes = durationMatch[2] ? parseInt(durationMatch[2]) : 0;
    const formattedDuration = `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
    
    const airlineCode = firstSegment.carrierCode.toLowerCase();
    
    return {
      id: offer.id,
      airline: firstSegment.carrierCode,
      airlineCode: firstSegment.carrierCode,
      airlineLogo: `/airlines/${airlineCode}.svg`,
      flightNumber: `${firstSegment.carrierCode}${firstSegment.number}`,
      origin: firstSegment.departure.iataCode,
      destination: lastSegment.arrival.iataCode,
      departureTime: firstSegment.departure.at.slice(11, 16),
      arrivalTime: lastSegment.arrival.at.slice(11, 16),
      duration: formattedDuration,
      stops: offer.itineraries[0].segments.length - 1,
      price: parseFloat(offer.price.total),
      seatsAvailable: offer.numberOfBookableSeats,
      aircraft: firstSegment.aircraft?.code || 'Unknown',
      departureDate: firstSegment.departure.at.slice(0, 10),
      returnDate: offer.itineraries[1]?.segments[0].departure.at.slice(0, 10) || '',
      cabinClass: offer.travelerPricings[0].fareDetailsBySegment[0].cabin,
    };
  });
} 