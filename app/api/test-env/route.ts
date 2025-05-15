import { NextResponse } from 'next/server';
import { amadeusConfig, debugEnv } from '@/lib/env';

export async function GET() {
  // Debug environment variables to the console
  debugEnv();
  
  // Check the environment variables
  const clientId = amadeusConfig.clientId ? 'Available' : 'Not available';
  const clientSecret = amadeusConfig.clientSecret ? 'Available' : 'Not available';
  
  // List all environment variables (for debugging only; omit sensitive values)
  const envVars = Object.keys(process.env)
    .filter(key => !key.includes('SECRET') && !key.includes('KEY') && !key.includes('TOKEN'))
    .reduce((acc, key) => {
      acc[key] = process.env[key] ? 'Available' : 'Not available';
      return acc;
    }, {} as Record<string, string>);
  
  return NextResponse.json({
    message: 'Environment variables check',
    amadeus: {
      clientId,
      clientSecret
    },
    env: envVars
  });
} 