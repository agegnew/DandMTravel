// Run this script with: node fix-key-format.js
// This will check your .env file and help format the private key correctly

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to read the .env file
function readEnvFile() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      return content;
    } else {
      console.log('No .env file found. Creating a new one.');
      return '';
    }
  } catch (error) {
    console.error('Error reading .env file:', error);
    return '';
  }
}

// Function to extract and fix the private key
function fixPrivateKey(envContent) {
  // Check if the private key exists in the content
  const privateKeyMatch = envContent.match(/GOOGLE_SHEETS_PRIVATE_KEY=(.+?)(\n|$)/s);
  
  if (!privateKeyMatch) {
    console.log('No GOOGLE_SHEETS_PRIVATE_KEY found in .env file.');
    return envContent;
  }
  
  let privateKey = privateKeyMatch[1];
  console.log('\nCurrent private key format:');
  console.log(privateKey);
  
  // Check if the key is properly wrapped in quotes
  if (!privateKey.startsWith('"') || !privateKey.endsWith('"')) {
    console.log('\nWARNING: Private key is not wrapped in double quotes.');
  }
  
  // Check for line breaks
  if (!privateKey.includes('\\n')) {
    console.log('\nWARNING: Private key does not contain \\n for line breaks.');
  }
  
  rl.question('\nDo you want to fix the private key format? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      rl.question('\nPaste your original private key from the JSON file (the value of "private_key"): ', (originalKey) => {
        // Remove any existing quotes
        originalKey = originalKey.replace(/^"|"$/g, '');
        
        // Format the key properly
        const formattedKey = `"${originalKey.replace(/\\n/g, '\\n').replace(/\r?\n/g, '\\n')}"`;
        
        // Replace the key in the env content
        const updatedContent = envContent.replace(
          /GOOGLE_SHEETS_PRIVATE_KEY=(.+?)(\n|$)/s,
          `GOOGLE_SHEETS_PRIVATE_KEY=${formattedKey}\n`
        );
        
        // Write back to the .env file
        try {
          fs.writeFileSync(path.join(process.cwd(), '.env'), updatedContent);
          console.log('\nPrivate key has been formatted and saved to .env file.');
          
          // Create .env.local with the same content
          fs.writeFileSync(path.join(process.cwd(), '.env.local'), updatedContent);
          console.log('.env.local file has been created with the same content.');
          
          console.log('\nRestart your Next.js server to apply changes.');
        } catch (error) {
          console.error('Error writing to file:', error);
        }
        
        rl.close();
      });
    } else {
      console.log('\nNo changes made to the private key.');
      rl.close();
    }
  });
}

// Main execution
const envContent = readEnvFile();
fixPrivateKey(envContent); 