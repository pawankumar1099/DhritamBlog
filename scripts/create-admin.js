#!/usr/bin/env node

/**
 * Admin User Creation Script
 * Usage: node scripts/create-admin.js
 * 
 * This script helps create the initial admin user in MongoDB.
 */

const readline = require('readline');
const https = require('https');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

async function createAdmin() {
  console.log('\n=================================');
  console.log('  Admin User Creation Script');
  console.log('=================================\n');

  try {
    // Get input from user
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');
    const adminKey = await question('Enter ADMIN_SECRET_KEY from .env.local: ');

    if (!email || !password || !adminKey) {
      console.log('\n❌ Error: All fields are required');
      process.exit(1);
    }

    console.log('\n⏳ Creating admin user...\n');

    // Create admin user via API
    const data = JSON.stringify({
      email,
      password,
      adminKey,
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/login',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);

            if (res.statusCode === 201) {
              console.log('✅ Admin user created successfully!');
              console.log('\nYou can now login at: http://localhost:3000/admin/login');
              console.log(`Email: ${email}`);
              resolve();
            } else if (res.statusCode === 400) {
              console.log(
                '❌ Error: ' +
                  (result.error || 'Admin user already exists')
              );
              reject();
            } else if (res.statusCode === 403) {
              console.log('❌ Error: Invalid ADMIN_SECRET_KEY');
              reject();
            } else {
              console.log('❌ Error: ' + (result.error || 'Unknown error'));
              reject();
            }
          } catch (e) {
            console.log('❌ Error: Failed to parse response');
            console.log('Make sure the dev server is running on http://localhost:3000');
            reject();
          }
        });
      });

      req.on('error', (error) => {
        console.log(
          '❌ Error: Could not connect to server'
        );
        console.log('Make sure the dev server is running with: npm run dev');
        reject();
      });

      req.write(data);
      req.end();
    });
  } catch (error) {
    console.log('❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createAdmin().catch(() => {
  process.exit(1);
});
