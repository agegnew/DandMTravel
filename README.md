# SkyGate Travel Platform

A comprehensive travel booking platform built with Next.js 14, TypeScript, Tailwind CSS, and more.

## Features

- Flight search and booking using Amadeus API
- Hotel reservations
- Travel packages
- Visa services
- Air cargo shipping
- Stripe payment integration
- Responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Prisma + PostgreSQL (Supabase)
- **State Management**: React Query, Context API
- **Animations**: Framer Motion
- **Payments**: Stripe
- **API Integration**: Amadeus Flight API, Hotel Pricing APIs

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (or Supabase account)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/skygate-travel.git
   cd skygate-travel
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required API keys and credentials

4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The following environment variables are required:

\`\`\`
# core
NEXT_PUBLIC_SITE_URL=https://localhost:3000

# Flight pricing
AMADEUS_CLIENT_ID=your-amadeus-id
AMADEUS_CLIENT_SECRET=your-amadeus-secret

# Hotel pricing
BOOKING_DEMAND_KEY=your-booking-key
GOOGLE_HOTEL_KEY=your-google-hotel-key
XOTELO_KEY=your-xotelo-key

# Database
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service-role-key

# Payments
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Auth
NEXTAUTH_SECRET=super-secret-string
\`\`\`

## Stripe Webhook Setup

To handle Stripe webhooks locally:

1. Install the Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Login to your Stripe account:
   \`\`\`bash
   stripe login
   \`\`\`

3. Forward webhooks to your local server:
   \`\`\`bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   \`\`\`

4. Copy the webhook signing secret and add it to your `.env.local` file:
   \`\`\`
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   \`\`\`

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set up the required environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Obtaining Amadeus API Credentials

1. Sign up for a free account at [Amadeus for Developers](https://developers.amadeus.com/)
2. Create a new application/API key
3. Add the Client ID and Client Secret to your `.env` file

## Testing Flight Search

The flight search feature uses the Amadeus API to retrieve real flight data. For testing, the app falls back to mock data if:

- Amadeus API credentials are not configured
- The API returns no results
- An error occurs during the API call

## Code Structure

- `/app` - Next.js app structure with routes
- `/components` - Reusable UI components
- `/lib` - Utility functions and API clients (incl. Amadeus)
- `/context` - React context providers
- `/public` - Static assets
- `/styles` - Global CSS styles

## Technologies

- Next.js
- React
- Tailwind CSS
- Amadeus API
- Stripe Payments
