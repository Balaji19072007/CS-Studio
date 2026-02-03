const { supabase } = require('../config/supabase');

exports.getAllCourses = async (req, res) => {
    try {
        const { data: courses, error } = await supabase
            .from('courses')
            .select('*');

        if (error) throw error;

        // Fetch counts for modules and topics separately if not in main table
        const enrichedCourses = await Promise.all(courses.map(async (course) => {
            const { count: modulesCount } = await supabase
                .from('phases')
                .select('*', { count: 'exact', head: true })
                .eq('course_id', course.id);

            const { count: topicsCount } = await supabase
                .from('topics')
                .select('*, phases!inner(*)', { count: 'exact', head: true })
                .eq('phases.course_id', course.id);

            return {
                id: course.id,
                title: course.title,
                description: course.description,
                icon: course.icon || '💻',
                category: course.category || 'programming',
                difficulty: course.difficulty || 'Beginner',
                duration: course.duration || '8 weeks',
                modules: modulesCount || 0,
                topics: topicsCount || 0,
                isPremium: course.is_premium || false,
                coverImage: course.cover_image || '/api/placeholder/400/300'
            };
        }));

        res.json({
            success: true,
            courses: enrichedCourses
        });

    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch courses',
            error: error.message
        });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user?.id;

        const { data: course, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (error || !course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (course.is_premium && userId) {
            const { data: subscription } = await supabase
                .from('subscriptions')
                .select('plan')
                .eq('user_id', userId)
                .single();

            if (!subscription || subscription.plan === 'FREE') {
                return res.status(403).json({
                    success: false,
                    message: 'This course requires a PRO or ENTERPRISE subscription',
                    needsUpgrade: true
                });
            }
        }

        const { data: phases, error: phasesError } = await supabase
            .from('phases')
            .select('*, topics(*)')
            .eq('course_id', courseId)
            .order('order', { ascending: true });

        if (phasesError) throw phasesError;

        const modules = phases.map(phase => ({
            id: phase.id,
            title: phase.title,
            topics: (phase.topics || []).sort((a, b) => a.order - b.order).map(topic => ({
                id: topic.id,
                title: topic.title,
                type: topic.type || 'content',
                content: topic.content || '',
                videoUrl: topic.video_url || null,
                questions: topic.questions || [],
                diagram: topic.diagram || null,
                seoTitle: topic.seo_title || null,
                seoDescription: topic.seo_description || null,
                seoKeywords: topic.seo_keywords || []
            }))
        }));

        res.json({
            success: true,
            course: {
                id: course.id,
                title: course.title,
                description: course.description,
                modules: modules
            }
        });

    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch course',
            error: error.message
        });
    }
};

exports.getLastActiveCourse = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get last touched course problem
        const { data: lastProgress, error } = await supabase
            .from('progress')
            .select('problem_id, last_submission')
            .eq('user_id', userId)
            .gte('problem_id', 1001) // Course problems only
            .order('last_submission', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching last active course progress:', error);
        }

        if (!lastProgress) {
            return res.json({ success: true, course: null });
        }

        // 2. Map problemId to Course
        const { loadAllProblems } = require('../util/problemUtils');
        const allProblems = await loadAllProblems();
        const lastProblem = allProblems.find(p => p.id === lastProgress.problem_id);

        if (!lastProblem) {
            return res.json({ success: true, course: null });
        }

        let courseId = lastProblem.courseId;

        // Fallback: Map by Language if courseId is missing
        if (!courseId && lastProblem.language) {
            const LANG_MAP = {
                'C': 'c-lang',
                'Java': 'java-lang',
                'Python': 'python-lang',
                'C++': 'cpp-lang'
            };
            courseId = LANG_MAP[lastProblem.language];
        }

        if (!courseId) {
            return res.json({ success: true, course: null });
        }

        // 3. Get Course Details
        const { data: courseData } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (!courseData) {
            return res.json({ success: true, course: null });
        }

        // 4. Calculate Progress
        const courseProblems = allProblems.filter(p =>
            p.courseId === courseId ||
            (p.language === lastProblem.language && p.id >= 1001)
        );

        const totalTopics = courseProblems.length;

        const { count: solvedCount } = await supabase
            .from('progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .in('problem_id', courseProblems.map(cp => cp.id))
            .eq('status', 'solved');

        const progressPercent = totalTopics > 0 ? Math.round((solvedCount / totalTopics) * 100) : 0;

        res.json({
            success: true,
            course: {
                id: courseId,
                title: courseData.title,
                coverImage: courseData.cover_image || '/api/placeholder/400/300',
                currentModule: lastProblem.category || 'Continue Learning',
                progress: progressPercent,
                lastTopicId: lastProblem.id
            }
        });

    } catch (error) {
        console.error('Get last active course error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getTopicById = async (req, res) => {
    try {
        const { topicId } = req.params;

        const { data: topic, error } = await supabase
            .from('topics')
            .select('*')
            .eq('id', topicId)
            .single();

        if (error || !topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        res.json({
            success: true,
            topic: {
                id: topic.id,
                title: topic.title,
                type: topic.type || 'content',
                content: topic.content || '',
                videoUrl: topic.video_url || null,
                questions: topic.questions || [],
                diagram: topic.diagram || null,
                seoTitle: topic.seo_title || null,
                seoDescription: topic.seo_description || null,
                seoKeywords: topic.seo_keywords || []
            }
        });

    } catch (error) {
        console.error('Error fetching topic:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch topic',
            error: error.message
        });
    }
};

