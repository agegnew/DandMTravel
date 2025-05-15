declare module 'amadeus' {
  interface AmadeusOptions {
    clientId: string;
    clientSecret: string;
    hostname?: string;
    customAppId?: string;
    customAppVersion?: string;
    logger?: any;
    logLevel?: string;
    ssl?: boolean;
    port?: number;
  }

  interface AmadeusResponse {
    statusCode: number;
    body: any;
    result: any;
    data: any;
    parsed: boolean;
  }

  interface FlightOffersSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    travelClass?: string;
    includedAirlineCodes?: string;
    excludedAirlineCodes?: string;
    nonStop?: boolean;
    currencyCode?: string;
    maxPrice?: number;
    max?: number;
  }

  interface FlightOffersSearch {
    get(params: FlightOffersSearchParams): Promise<AmadeusResponse>;
    post(params: any): Promise<AmadeusResponse>;
  }

  interface Shopping {
    flightOffersSearch: FlightOffersSearch;
  }

  class Amadeus {
    constructor(options: AmadeusOptions);
    shopping: Shopping;
  }

  export = Amadeus;
} 