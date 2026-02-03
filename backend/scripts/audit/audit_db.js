const { Client } = require('pg');
require('dotenv').config({ path: '../../.env' });

// Construct connection string
// Note: We need the password provided earlier. 
// "postgresql://postgres:Balu@9959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres"
const CONNECTION_STRING = "postgresql://postgres:Balu@9959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres";

const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});

const fs = require('fs');
const REPORT_FILE = 'audit_report_gen.txt';

function log(msg) {
    console.log(msg);
    fs.appendFileSync(REPORT_FILE, msg + '\n');
}

async function audit() {
    try {
        fs.writeFileSync(REPORT_FILE, 'DB AUDIT REPORT\n');
        await client.connect();
        log('✅ Connected to DB');

        log('\n--- 1. TABLE STRUCTURE ---');
        const tables = ['users', 'courses', 'course_phases', 'course_topics', 'problems', 'progress', 'subscriptions'];
        for (const table of tables) {
            const res = await client.query(`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = $1
        `, [table]);

            log(`\nTable: ${table} (${res.rowCount} columns)`);
            if (res.rowCount === 0) log('   ❌ TABLE MISSING!');
            res.rows.forEach(r => log(`   - ${r.column_name} (${r.data_type})`));
        }

        log('\n--- 2. RLS POLICIES ---');
        const rlsRes = await client.query(`
        SELECT tablename, policyname, cmd, roles, qual, with_check 
        FROM pg_policies 
        WHERE schemaname = 'public'
    `);
        rlsRes.rows.forEach(r => {
            log(`   [${r.tablename}] ${r.policyname} (${r.cmd})`);
        });

        log('\n--- RLS ENABLED STATUS ---');
        const rlsStatus = await client.query(`
        SELECT relname, relrowsecurity 
        FROM pg_class 
        JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
        WHERE nspname = 'public' AND relkind = 'r'
        AND relname = ANY($1)
    `, [tables]);
        rlsStatus.rows.forEach(r => {
            log(`   ${r.relname}: ${r.relrowsecurity ? '✅ Enabled' : '❌ DISABLED'}`);
        });

        log('\n--- 3. INDEXES ---');
        const idxRes = await client.query(`
        SELECT tablename, indexname, indexdef 
        FROM pg_indexes 
        WHERE schemaname = 'public'
    `);
        idxRes.rows.forEach(r => {
            log(`   ${r.tablename}: ${r.indexname}`);
        });

        log('\n--- 4. DATA COUNTS ---');
        for (const table of tables) {
            try {
                const count = await client.query(`SELECT COUNT(*) FROM public."${table}"`);
                log(`   ${table}: ${count.rows[0].count}`);
            } catch (e) {
                log(`   ${table}: Error querying count (${e.message})`);
            }
        }

        // Orphan checks
        log('\n--- 5. ORPHAN CHECK ---');
        const orphanTopics = await client.query(`
        SELECT COUNT(*) FROM course_topics ct 
        LEFT JOIN course_phases cp ON ct.phase_id = cp.id 
        WHERE cp.id IS NULL
    `);
        log(`   Orphan Topics (invalid phase_id): ${orphanTopics.rows[0].count}`);

        client.end();
    } catch (err) {
        console.error('Audit Error:', err);
        client.end();
    }
}

audit();
