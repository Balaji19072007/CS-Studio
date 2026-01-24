const { db } = require('../config/firebase');
const {
    collection, doc, getDoc, getDocs,
    setDoc, updateDoc, addDoc, query, where
} = require('firebase/firestore');

class Problem {
    constructor(data) {
        this.id = data.id || null;
        this.problemId = data.problemId;
        this.title = data.title;
        this.language = data.language;
        this.difficulty = data.difficulty;
        this.problemStatement = data.problemStatement;
        this.inputFormat = data.inputFormat;
        this.outputFormat = data.outputFormat;
        this.examples = data.examples || [];
        this.solution = data.solution || {};
        this.hints = data.hints || [];
        this.testCases = data.testCases || [];
        this.category = data.category || 'Algorithms';
    }

    static async find(criteria = {}) {
        try {
            const problemsRef = collection(db, 'problems');
            let q = problemsRef;

            // Building query filters if needed
            const constraints = [];
            if (criteria.problemId) constraints.push(where('problemId', '==', parseInt(criteria.problemId)));
            // Add other filters as needed

            if (constraints.length > 0) {
                q = query(problemsRef, ...constraints);
            }

            const snapshot = await getDocs(q);
            return snapshot.docs.map(d => new Problem({ id: d.id, ...d.data() }));
        } catch (error) {
            console.error('Problem.find error:', error);
            throw error;
        }
    }

    static async findOne(criteria) {
        // Basic implementation using find
        const results = await this.find(criteria);
        return results.length > 0 ? results[0] : null;
    }
}

module.exports = Problem;