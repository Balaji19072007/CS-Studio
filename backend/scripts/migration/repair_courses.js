const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');
const fs = require('fs').promises;

const DUMP_FILE = path.join(__dirname, 'firebase_dump.json');

const TARGETS = [
    {
        supabaseId: 'cpp-programming',
        sourceTitle: 'C++ Programming',
        sourceIdCheck: (id) => id === 'cpp-programming'
    },
    {
        supabaseId: 'python-programming',
        sourceTitle: 'Python Programming',
        sourceIdCheck: (id) => id === 'python-programming' || id === 'python-lang' // handling potential ID variance
    }
];

async function repairCourses() {
    console.log('🛠️ Starting Course Repair...');

    // 1. Load Dump
    const content = await fs.readFile(DUMP_FILE, 'utf8');
    const dump = JSON.parse(content);
    console.log(`   Loaded dump with ${dump.courses.length} courses.`);

    for (const target of TARGETS) {
        console.log(`\n🔍 Processing Target: ${target.sourceTitle} (Dest ID: ${target.supabaseId})`);

        // 2. Find Source with Content
        // Priority: Match ID > Match Title > Must have phases
        let source = dump.courses.find(c => target.sourceIdCheck(c._id) && c.phases && c.phases.length > 0);

        if (!source) {
            console.log(`   ⚠️ Direct ID match failed or empty. Trying title match...`);
            source = dump.courses.find(c => c.title === target.sourceTitle && c.phases && c.phases.length > 0);
        }

        if (!source) {
            console.error(`   ❌ Could not find valid source for ${target.sourceTitle} with content.`);
            continue;
        }

        console.log(`   ✅ Found Source: "${source.title}" (ID: ${source._id}) with ${source.phases.length} phases.`);

        // 3. Repair Content
        let phasesInserted = 0;
        let topicsInserted = 0;

        let phaseOrder = 1;
        for (const phase of source.phases) {
            // Upsert Phase
            const { error: pErr } = await supabase.from('course_phases').upsert({
                id: phase._id,
                course_id: target.supabaseId, // Force the correct destination ID
                title: phase.title,
                "order": phaseOrder++
            }, { onConflict: 'id', ignoreDuplicates: true }); // ID maps should match. If text ID collision, we assume same content or manual check needed.

            if (pErr) console.error(`      ❌ Phase Error ${phase.title}:`, pErr.message);
            else {
                phasesInserted++;
                // console.log(`      ✅ Phase: ${phase.title}`);
            }

            // Upsert Topics
            if (phase.topics && phase.topics.length > 0) {
                let topicOrder = 1;
                for (const topic of phase.topics) {
                    const { error: tErr } = await supabase.from('course_topics').upsert({
                        id: topic._id,
                        course_id: target.supabaseId,
                        phase_id: phase._id,
                        title: topic.title,
                        type: topic.type,
                        content: topic.content,
                        video_url: topic.videoUrl,
                        questions: topic.questions,
                        diagram: topic.diagram,
                        seo_title: topic.seoTitle,
                        seo_description: topic.seoDescription,
                        seo_keywords: topic.seoKeywords,
                        "order": topicOrder++
                    }, { onConflict: 'id', ignoreDuplicates: true });

                    if (tErr) console.error(`         ❌ Topic Error ${topic.title}:`, tErr.message);
                    else topicsInserted++;
                }
            }
        }
        console.log(`   🎉 Finished ${target.sourceTitle}: ${phasesInserted} Phases, ${topicsInserted} Topics processed.`);
    }

    console.log('\n✅ Repair Complete.');
}

repairCourses().catch(e => console.error(e));
