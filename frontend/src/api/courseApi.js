import { supabase } from '../config/supabase';

/**
 * Course API - Fetch course data from Supabase
 */

// Get single course by ID
export const getCourse = async (courseId) => {
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
};

// Get all courses
export const getAllCourses = async () => {
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('title');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

// Get phases for a course
export const getPhases = async (courseId) => {
    try {
        const { data, error } = await supabase
            .from('phases')
            .select('*')
            .eq('course_id', courseId)
            .order('order_index');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching phases:', error);
        throw error;
    }
};

// Get single phase by ID
export const getPhase = async (phaseId) => {
    try {
        const { data, error } = await supabase
            .from('phases')
            .select('*')
            .eq('id', phaseId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching phase:', error);
        throw error;
    }
};

// Get topics for a phase
export const getTopics = async (phaseId) => {
    try {
        const { data, error } = await supabase
            .from('topics')
            .select('*')
            .eq('phase_id', phaseId)
            .order('order_index');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching topics:', error);
        throw error;
    }
};

// Get single topic by ID
export const getTopic = async (topicId) => {
    try {
        const { data, error } = await supabase
            .from('topics')
            .select('*')
            .eq('id', topicId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching topic:', error);
        throw error;
    }
};

// Get topic content (ordered)
export const getTopicContent = async (topicId) => {
    try {
        const { data, error } = await supabase
            .from('topic_content')
            .select('*')
            .eq('topic_id', topicId)
            .order('order_index');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching topic content:', error);
        throw error;
    }
};

// Get practice problems for a topic
export const getPracticeProblems = async (topicId) => {
    try {
        const { data, error } = await supabase
            .from('practice_problems')
            .select('*')
            .eq('topic_id', topicId)
            .order('order_index');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching practice problems:', error);
        throw error;
    }
};

// Get course challenge for a topic (New System)
export const getCourseChallenge = async (topicId) => {
    try {
        // We use the new endpoint we added
        const res = await fetch(`http://localhost:5000/api/course-challenges/topic/${topicId}`, {
            headers: localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {}
        });

        if (!res.ok) throw new Error('Failed to fetch challenge');

        const data = await res.json();
        return data; // This will return null (if no challenge) or the challenge object
    } catch (error) {
        console.error('Error fetching course challenge:', error);
        // Don't throw, just return null so page doesn't break
        return null;
    }
};

// Get course modules (for track-based courses)
export const getCourseModules = async (courseId) => {
    try {
        const { data, error } = await supabase
            .from('course_modules')
            .select('*')
            .eq('course_id', courseId)
            .order('order_index');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching course modules:', error);
        throw error;
    }
};
