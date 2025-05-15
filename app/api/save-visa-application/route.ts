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
      visaType,
      nationality,
      destination,
      processingTime,
      firstName,
      lastName,
      email,
      phone,
      passportNumber,
      passportExpiry,
      travelDateFrom,
      travelDateTo,
      uploadedFiles,
      additionalNotes,
    } = data;

    // Format data for Google Sheets
    const row = [
      new Date().toISOString(), // Timestamp
      visaType,
      nationality,
      destination,
      processingTime,
      firstName,
      lastName,
      email,
      phone,
      passportNumber,
      passportExpiry,
      travelDateFrom || 'N/A',
      travelDateTo || 'N/A',
      uploadedFiles ? JSON.stringify(uploadedFiles) : 'N/A',
      additionalNotes || 'N/A',
    ];

    // Save to Google Sheets
    const sheets = await getGoogleSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'visa!A:O', // Sheet named "visa" with columns A through O
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