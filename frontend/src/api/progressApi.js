import { supabase } from '../config/supabase';

/**
 * Progress API - Track user progress through courses
 */

// Get user's overall course progress
export const getUserCourseProgress = async (userId, courseId) => {
    try {
        const { data, error } = await supabase
            .from('user_course_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
        return data;
    } catch (error) {
        console.error('Error fetching user course progress:', error);
        return null;
    }
};

// Get user's topic progress
export const getUserTopicProgress = async (userId, topicId) => {
    try {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('topic_id', topicId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data;
    } catch (error) {
        console.error('Error fetching user topic progress:', error);
        return null;
    }
};

// Get all user progress for a course
export const getAllUserProgressForCourse = async (userId, courseId) => {
    try {
        // Optimized query using joins to avoid URL length limits
        const { data, error } = await supabase
            .from('user_progress')
            .select(`
                *,
                topics!inner (
                    id,
                    phases!inner (
                        id,
                        course_id
                    )
                )
            `)
            .eq('user_id', userId)
            .eq('topics.phases.course_id', courseId);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching all user progress:', error);
        return [];
    }
};

// Mark topic as complete
export const markTopicComplete = async (userId, topicId) => {
    try {
        // Check if progress exists
        const existing = await getUserTopicProgress(userId, topicId);

        if (existing) {
            // Update existing
            const { data, error } = await supabase
                .from('user_progress')
                .update({
                    completed: true,
                    completed_at: new Date().toISOString()
                })
                .eq('user_id', userId)
                .eq('topic_id', topicId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Insert new
            const { data, error } = await supabase
                .from('user_progress')
                .insert({
                    user_id: userId,
                    topic_id: topicId,
                    completed: true,
                    completed_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    } catch (error) {
        console.error('Error marking topic complete:', error);
        throw error;
    }
};

// Update course progress
export const updateCourseProgress = async (userId, courseId) => {
    try {
        // Get total topics count for the course
        const { count: totalTopics } = await supabase
            .from('topics')
            .select(`
                id,
                phases!inner(course_id)
            `, { count: 'exact', head: true })
            .eq('phases.course_id', courseId);

        if (!totalTopics) return null;

        // Get completed topics count for the course (using inner join)
        const { count: completedTopics } = await supabase
            .from('user_progress')
            .select(`
                id,
                topics!inner(
                    phases!inner(course_id)
                )
            `, { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('completed', true)
            .eq('topics.phases.course_id', courseId);

        const progressPercentage = Math.round((completedTopics / totalTopics) * 100);

        // Check if course progress exists
        const existing = await getUserCourseProgress(userId, courseId);

        if (existing) {
            // Update
            const { data, error } = await supabase
                .from('user_course_progress')
                .update({
                    progress_percentage: progressPercentage,
                    last_accessed_at: new Date().toISOString()
                })
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Insert
            const { data, error } = await supabase
                .from('user_course_progress')
                .insert({
                    user_id: userId,
                    course_id: courseId,
                    progress_percentage: progressPercentage,
                    last_accessed_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    } catch (error) {
        console.error('Error updating course progress:', error);
        throw error;
    }
};

// Get phase progress
export const getPhaseProgress = async (userId, phaseId) => {
    try {
        // Get total topics count for the phase
        const { count: totalTopics } = await supabase
            .from('topics')
            .select('*', { count: 'exact', head: true })
            .eq('phase_id', phaseId);

        if (!totalTopics) return { total: 0, completed: 0, percentage: 0 };

        // Get completed topics for the phase
        const { count: completedTopics } = await supabase
            .from('user_progress')
            .select(`
                id,
                topics!inner(phase_id)
            `, { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('completed', true)
            .eq('topics.phase_id', phaseId);

        const percentage = Math.round((completedTopics / totalTopics) * 100);

        return {
            total: totalTopics,
            completed: completedTopics,
            percentage
        };
    } catch (error) {
        console.error('Error getting phase progress:', error);
        return { total: 0, completed: 0, percentage: 0 };
    }
};
