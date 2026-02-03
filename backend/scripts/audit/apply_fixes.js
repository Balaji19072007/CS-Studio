const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../../.env' });

const CONNECTION_STRING = "postgresql://postgres:Balu@9959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres";

const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});

async function runFixes() {
    try {
        await client.connect();
        console.log('✅ Connected to DB. Applying fixes...');

        const sqlPath = path.join(__dirname, 'fixes.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split by statement if needed, but pg lib usually handles blocks well or requires splitting.
        // We'll split by semicolon for safety if simple query fails.
        const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);

        for (const stmt of statements) {
            try {
                await client.query(stmt);
                // console.log(`Executed: ${stmt.substring(0, 50)}...`);
            } catch (err) {
                if (err.message.includes('already exists')) {
                    // Ignore "already exists" errors for policies/indexes
                    // console.warn(`Skipping duplicate: ${err.message}`);
                } else {
                    console.error(`❌ Error executing: ${stmt.substring(0, 50)}...`);
                    console.error(err.message);
                }
            }
        }

        console.log('✅ Fixes execution complete.');
        client.end();
    } catch (err) {
        console.error('Migration Error:', err);
        client.end();
    }
}

runFixes();
