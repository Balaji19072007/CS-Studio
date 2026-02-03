const { supabase } = require('../config/supabase');

class Problem {
    constructor(data) {
        this.id = data.id || null;
        this.title = data.title;
        this.language = data.language;
        this.difficulty = data.difficulty;
        this.problemStatement = data.problem_statement || data.problemStatement;
        this.inputFormat = data.input_format || data.inputFormat;
        this.outputFormat = data.output_format || data.outputFormat;
        this.examples = data.examples || [];
        this.solution = data.solution || {};
        this.hints = data.hints || [];
        this.testCases = data.test_cases || data.testCases || [];
        this.category = data.category || 'Algorithms';
        this.isCourseProblem = data.is_course_problem || false;
    }

    static async find(criteria = {}) {
        try {
            let query = supabase.from('problems').select('*');

            if (criteria.id) query = query.eq('id', criteria.id);
            if (criteria.problemId) query = query.eq('id', criteria.problemId); // problemId == id in new schema
            if (criteria.difficulty) query = query.eq('difficulty', criteria.difficulty);
            if (criteria.category) query = query.eq('category', criteria.category);

            const { data, error } = await query;
            if (error) throw error;

            return (data || []).map(d => new Problem(d));
        } catch (error) {
            console.error('Problem.find error:', error);
            return [];
        }
    }

    static async findOne(criteria) {
        try {
            const results = await this.find(criteria);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            console.error('Problem.findOne error:', error);
            return null;
        }
    }
}

module.exports = Problem;
