const { db } = require('../config/firebase');
const {
    collection, doc, getDoc, getDocs,
    setDoc, updateDoc, addDoc, query, where, deleteDoc, writeBatch
} = require('firebase/firestore');

class Progress {
    constructor(data) {
        this.id = data.id || null;
        this.userId = data.userId;
        this.problemId = data.problemId;
        this.status = data.status || 'todo';
        this.bestAccuracy = data.bestAccuracy || 0;
        this.lastSubmission = data.lastSubmission || null;
        this.solvedAt = data.solvedAt || null; // NEW: Track when first solved
        this.timeSpent = data.timeSpent || 0; // NEW: Track actual time spent (ms)

        const timer = data.timer || {};
        this.timer = {
            startTime: timer.startTime ? new Date(timer.startTime) : null,
            duration: timer.duration || 10 * 60 * 1000,
            timeRemaining: timer.timeRemaining || 10 * 60 * 1000,
            isRunning: timer.isRunning || false
        };
    }

    static async find(criteria = {}) {
        const progressRef = collection(db, 'progress');
        const constraints = [];

        if (criteria.userId) constraints.push(where('userId', '==', criteria.userId));
        if (criteria.status) constraints.push(where('status', '==', criteria.status));
        if (criteria.problemId) constraints.push(where('problemId', '==', criteria.problemId));

        const q = query(progressRef, ...constraints);
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => new Progress({ id: d.id, ...d.data() }));
    }

    static async findOne(criteria) {
        const results = await this.find(criteria);
        return results.length ? results[0] : null;
    }

    static async getUserProgress(userId, problemId) {
        let progress = await this.findOne({ userId, problemId });
        if (!progress) {
            progress = new Progress({
                userId,
                problemId,
                status: 'todo',
                bestAccuracy: 0,
                timeSpent: 0
            });
            await progress.save();
        }
        return progress;
    }

    static async updateUserStats(userId, accuracy, isSolved) {
        const User = require('./User');
        const user = await User.findById(userId);
        if (!user) return;

        // Count solved
        const solvedDocs = await this.find({ userId, status: 'solved' });
        user.problemsSolved = solvedDocs.length;

        if (isSolved && solvedDocs.length > 0) {
            const totalAcc = solvedDocs.reduce((sum, p) => sum + p.bestAccuracy, 0);
            user.averageAccuracy = Math.round(totalAcc / solvedDocs.length);
        }

        user.totalPoints = (user.problemsSolved * 100) + (user.averageAccuracy || 0);

        // Calculate streak based on consecutive days of solving problems
        if (solvedDocs.length > 0) {
            // Get all solved dates sorted descending
            const solvedDates = solvedDocs
                .map(doc => {
                    // Use solvedAt if exists, fallback to lastSubmission but only if solvedAt is missing
                    const dateStr = doc.solvedAt || doc.lastSubmission;
                    if (!dateStr) return null;
                    const date = new Date(dateStr);
                    // Normalize to UTC start of day to avoid timezone "skips"
                    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                })
                .filter(Boolean)
                .sort((a, b) => b - a);

            // Remove duplicates (same day in UTC)
            const uniqueDates = [...new Set(solvedDates)];

            if (uniqueDates.length > 0) {
                const now = new Date();
                const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
                const oneDayMs = 24 * 60 * 60 * 1000;

                // Check if user solved something today UTC or yesterday UTC
                const mostRecentDate = uniqueDates[0];
                const daysSinceLastSolve = Math.floor((todayUTC - mostRecentDate) / oneDayMs);

                if (daysSinceLastSolve <= 1) {
                    // Calculate consecutive days
                    let streak = 1;
                    for (let i = 1; i < uniqueDates.length; i++) {
                        const dayDiff = Math.floor((uniqueDates[i - 1] - uniqueDates[i]) / oneDayMs);
                        if (dayDiff === 1) {
                            streak++;
                        } else if (dayDiff === 0) {
                            continue; // Should be handled by Set, but safe-guard
                        } else {
                            break; // Streak broken
                        }
                    }
                    user.currentStreak = streak;
                    user.lastStreakUpdate = new Date().toISOString(); // track when we last processed
                    console.log(`🔥 UTC Streak updated for user ${userId}: ${streak} days`);
                } else {
                    // Streak broken (more than 1 day gap in UTC)
                    user.currentStreak = 0;
                    console.log(`❌ Streak reset for user ${userId} (${daysSinceLastSolve} days since last solve in UTC)`);
                }
            }
        } else {
            user.currentStreak = 0;
        }

        await user.save();
    }

    async save() {
        const data = {
            userId: this.userId,
            problemId: this.problemId,
            status: this.status,
            bestAccuracy: this.bestAccuracy,
            lastSubmission: this.lastSubmission,
            solvedAt: this.solvedAt, // NEW: Save solvedAt timestamp
            timeSpent: this.timeSpent, // NEW: Save timeSpent
            timer: { ...this.timer }
        };

        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

        if (this.id) {
            await updateDoc(doc(db, 'progress', this.id), data);
        } else {
            // Check collision manually if needed, but assuming unique logic handled by controller/find
            const res = await addDoc(collection(db, 'progress'), data);
            this.id = res.id;
        }
        return this;
    }

    // --- Timer Methods (Simplified) ---
    getTimeRemaining() {
        if (!this.timer.isRunning || !this.timer.startTime) return this.timer.timeRemaining;
        const start = new Date(this.timer.startTime);
        const elapsed = Date.now() - start.getTime();
        return Math.max(0, this.timer.duration - elapsed);
    }

    hasTimerExpired() { return this.getTimeRemaining() <= 0; }

    async startTimer() {
        this.timer.startTime = new Date();
        this.timer.isRunning = true;
        this.timer.timeRemaining = this.timer.duration;
        await this.save();
    }

    async stopTimer() {
        if (this.timer.isRunning) {
            const start = new Date(this.timer.startTime);
            const elapsed = Date.now() - start.getTime();
            this.timer.timeRemaining = Math.max(0, this.timer.duration - elapsed);
            this.timer.isRunning = false;
            await this.save();
        }
    }
}

module.exports = Progress;