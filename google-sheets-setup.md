# Google Sheets Integration Setup Guide

This document explains how to set up the Google Sheets integration for saving flight search data.

## Required Environment Variables

You need to add the following environment variables to your `.env.local` file:

```
# Google Sheets API Configuration
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=your-google-spreadsheet-id-here
```

## Step-by-Step Setup Instructions

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API for your project

### 2. Create a Service Account

1. In your Google Cloud project, go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Give it a name and description
4. Grant the role "Editor" for Google Sheets API access
5. Click "Create" and then "Done"

### 3. Generate Service Account Key

1. Find your service account in the list
2. Click on the three dots menu > "Manage keys"
3. Click "Add Key" > "Create new key"
4. Choose JSON format and click "Create"
5. A JSON file will be downloaded - keep this secure!

### 4. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Rename the first sheet to "FlightSearches"
4. Add the following headers in row 1:
   - A: Timestamp
   - B: Origin
   - C: Destination
   - D: Departure Date
   - E: Return Date
   - F: Trip Type
   - G: Passengers
   - H: First Name
   - I: Last Name
   - J: Email
   - K: Phone
   - L: Special Requirements

### 5. Share the Spreadsheet

1. Share your spreadsheet with the service account email (with Editor permissions)
2. Copy the spreadsheet ID from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` portion

### 6. Configure Environment Variables

1. From the downloaded JSON key file, extract the following:
   - `client_email` → GOOGLE_SHEETS_CLIENT_EMAIL
   - `private_key` → GOOGLE_SHEETS_PRIVATE_KEY
2. Add the spreadsheet ID as GOOGLE_SHEETS_SPREADSHEET_ID
3. Add these to your `.env.local` file

### 7. Install Dependencies

Run the following command to install the required package:

```bash
npm install googleapis
```

### 8. Test the Integration

1. Run your application
2. Submit a flight search form
3. Check your Google Sheet to see if the data was saved

## Troubleshooting

- If you encounter CORS issues, make sure your service account has proper permissions
- Check that the private key is properly formatted with newline characters (`\n`)
- Verify that the spreadsheet ID is correct
- Ensure the sheet is named "FlightSearches" exactly as specified in the code 