const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
    connectionString: "postgresql://postgres:Balu@9959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres",
    ssl: { rejectUnauthorized: false }
});

async function runSchema() {
    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL');

        const schemaPath = path.join(__dirname, '../../supabase/triggers.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('📜 Running Schema SQL...');
        await client.query(schemaSql);

        console.log('✅ Schema executed successfully!');
        await client.end();
    } catch (err) {
        console.error('❌ Schema Execution Error:', err);
        await client.end();
        process.exit(1);
    }
}

runSchema();
