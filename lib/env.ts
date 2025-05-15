// Helper functions to safely access environment variables
export const getEnv = (key: string, defaultValue: string = ''): string => {
  // Check for server-side environment variables
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  
  // Check for client-side environment variables (those with NEXT_PUBLIC_ prefix)
  if (typeof window !== 'undefined' && 
      (window as any).__ENV && 
      (window as any).__ENV[key]) {
    return (window as any).__ENV[key];
  }
  
  return defaultValue;
};

// Environment variables specific to Amadeus
export const amadeusConfig = {
  clientId: getEnv('AMADEUS_CLIENT_ID'),
  clientSecret: getEnv('AMADEUS_CLIENT_SECRET'),
};

// Check if Amadeus API credentials are available
export const hasAmadeusCredentials = (): boolean => {
  return Boolean(amadeusConfig.clientId && amadeusConfig.clientSecret);
};

// Debug - prints safely redacted environment variables to console
// Only for development debugging
export const debugEnv = (): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Environment Configuration:');
    console.log('- AMADEUS_CLIENT_ID:', amadeusConfig.clientId ? '*******' : 'Not set');
    console.log('- AMADEUS_CLIENT_SECRET:', amadeusConfig.clientSecret ? '*******' : 'Not set');
  }
}; 