import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Initialize Google Sheets API client
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Extract data from request
    const {
      origin,
      destination,
      departDate,
      returnDate,
      tripType,
      passengers,
      firstName,
      lastName,
      email,
      phone,
      specialRequirements,
    } = data;

    // Format data for Google Sheets
    const row = [
      new Date().toISOString(), // Timestamp
      origin,
      destination,
      departDate,
      returnDate || 'N/A',
      tripType,
      passengers.toString(),
      firstName,
      lastName,
      email,
      phone,
      specialRequirements || 'N/A',
    ];

    // Save to Google Sheets
    const sheets = await getGoogleSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'FlightSearches!A:L', // Changed from FlightSearches to Sheet1
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save data' },
      { status: 500 }
    );
  }
} 