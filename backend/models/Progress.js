const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
    // Link to the User model
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Link to the Problem model via its custom problemId (Number)
    problemId: {
        type: Number,
        ref: 'Problem', // Reference Problem model
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'attempted', 'solved'],
        default: 'todo'
    },
    // Track the best score achieved
    bestAccuracy: {
        type: Number, // Percentage of test cases passed (0-100)
        default: 0
    },
    lastSubmission: {
        type: Date,
        default: Date.now
    },
    // Timer fields for each problem
    timer: {
        startTime: {
            type: Date,
            default: null
        },
        duration: {
            type: Number, // in milliseconds
            default: 10 * 60 * 1000 // 10 minutes default
        },
        timeRemaining: {
            type: Number, // in milliseconds
            default: 10 * 60 * 1000 // 10 minutes default
        },
        isRunning: {
            type: Boolean,
            default: false
        }
    }
}, { 
    // Ensure that a user can only have one progress entry per problem
    timestamps: true,
    index: { unique: true, fields: ['userId', 'problemId'] } 
});

// Static method to update user stats when a problem is solved
ProgressSchema.statics.updateUserStats = async function(userId, accuracy, isSolved) {
    const User = mongoose.model('User');
    
    try {
        const user = await User.findById(userId);
        if (!user) return;

        // Count total solved problems for this user
        const solvedCount = await this.countDocuments({ 
            userId: userId, 
            status: 'solved' 
        });

        // Update user's problemsSolved count
        user.problemsSolved = solvedCount;

        // Update average accuracy
        if (isSolved) {
            const allSolved = await this.find({ 
                userId: userId, 
                status: 'solved' 
            });
            
            if (allSolved.length > 0) {
                const totalAccuracy = allSolved.reduce((sum, progress) => 
                    sum + progress.bestAccuracy, 0);
                user.averageAccuracy = Math.round(totalAccuracy / allSolved.length);
            } else {
                user.averageAccuracy = 0;
            }
        }

        // Update current streak - FIXED LOGIC
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Check if user solved any problem today
        const todaySolved = await this.findOne({
            userId: userId,
            status: 'solved',
            lastSubmission: {
                $gte: today
            }
        });

        // Check if user solved any problem yesterday
        const yesterdaySolved = await this.findOne({
            userId: userId,
            status: 'solved',
            lastSubmission: {
                $gte: yesterday,
                $lt: today
            }
        });

        if (todaySolved) {
            if (yesterdaySolved) {
                // Continue streak
                user.currentStreak = (user.currentStreak || 0) + 1;
            } else {
                // Start new streak
                user.currentStreak = 1;
            }
        } else {
            // No problem solved today, streak remains or resets?
            // For now, we don't reset streak if no problem solved today
            // This maintains the current streak until a new day without solving
        }

        // Calculate points based on problems solved and accuracy
        user.totalPoints = (user.problemsSolved * 100) + Math.round(user.averageAccuracy);

        await user.save();
        console.log(`✅ Updated user stats: ${user.username} - Solved: ${user.problemsSolved}, Points: ${user.totalPoints}, Streak: ${user.currentStreak}`);
        return user;
    } catch (error) {
        console.error('Error updating user stats:', error);
        throw error;
    }
};

// Static method to reset all problems for a user to "todo" and reset timers
ProgressSchema.statics.resetAllProblems = async function(userId) {
    try {
        // Delete all progress entries for this user
        const result = await this.deleteMany({ userId: userId });
        
        console.log(`✅ Reset ${result.deletedCount} problems to "todo" for user ${userId}`);
        return result;
    } catch (error) {
        console.error('Error resetting problems:', error);
        throw error;
    }
};

// Static method to reset all problems for ALL users (admin function)
ProgressSchema.statics.resetAllProblemsForAllUsers = async function() {
    try {
        const result = await this.deleteMany({});
        
        console.log(`✅ Reset ${result.deletedCount} problems for all users to "todo"`);
        return result;
    } catch (error) {
        console.error('Error resetting problems for all users:', error);
        throw error;
    }
};

// Static method to initialize progress for a new user
ProgressSchema.statics.initializeUserProgress = async function(userId) {
    try {
        // For new users, we don't create progress entries until they attempt problems
        // This ensures each user starts fresh
        console.log(`✅ New user ${userId} initialized with no progress entries`);
        return { success: true };
    } catch (error) {
        console.error('Error initializing user progress:', error);
        throw error;
    }
};

// Static method to get user progress for a problem
ProgressSchema.statics.getUserProgress = async function(userId, problemId) {
    try {
        let progress = await this.findOne({ userId, problemId });
        
        if (!progress) {
            // Create a new progress entry with default values
            progress = new this({
                userId,
                problemId,
                status: 'todo',
                bestAccuracy: 0,
                timer: {
                    startTime: null,
                    duration: 10 * 60 * 1000,
                    timeRemaining: 10 * 60 * 1000,
                    isRunning: false
                }
            });
            await progress.save();
        }
        
        return progress;
    } catch (error) {
        console.error('Error getting user progress:', error);
        throw error;
    }
};

// Instance method to start timer for a problem
ProgressSchema.methods.startTimer = async function() {
    this.timer.startTime = new Date();
    this.timer.isRunning = true;
    this.timer.timeRemaining = this.timer.duration;
    await this.save();
    
    console.log(`⏰ Timer started for problem ${this.problemId} for user ${this.userId}`);
    return this;
};

// Instance method to stop timer and calculate remaining time
ProgressSchema.methods.stopTimer = async function() {
    if (this.timer.isRunning && this.timer.startTime) {
        const elapsed = Date.now() - this.timer.startTime.getTime();
        this.timer.timeRemaining = Math.max(0, this.timer.duration - elapsed);
        this.timer.isRunning = false;
        await this.save();
        
        console.log(`⏰ Timer stopped for problem ${this.problemId} for user ${this.userId}. Time remaining: ${this.timer.timeRemaining}ms`);
    }
    return this;
};

// Instance method to get current time remaining
ProgressSchema.methods.getTimeRemaining = function() {
    if (!this.timer.isRunning || !this.timer.startTime) {
        return this.timer.timeRemaining;
    }
    
    const elapsed = Date.now() - this.timer.startTime.getTime();
    return Math.max(0, this.timer.duration - elapsed);
};

// Instance method to check if timer has expired
ProgressSchema.methods.hasTimerExpired = function() {
    return this.getTimeRemaining() <= 0;
};

// Instance method to handle when a problem is solved
ProgressSchema.methods.markAsSolved = async function(accuracy) {
    this.status = 'solved';
    this.bestAccuracy = Math.max(this.bestAccuracy, accuracy);
    this.lastSubmission = new Date();
    
    // Stop timer when problem is solved
    await this.stopTimer();
    
    await this.save();
    
    // Update user stats
    await this.constructor.updateUserStats(this.userId, accuracy, true);
    
    return this;
};

// Instance method for attempted but not solved
ProgressSchema.methods.markAsAttempted = async function(accuracy) {
    this.status = 'attempted';
    this.bestAccuracy = Math.max(this.bestAccuracy, accuracy);
    this.lastSubmission = new Date();
    
    await this.save();
    
    // Update user stats (not solved, so don't increment problemsSolved)
    await this.constructor.updateUserStats(this.userId, accuracy, false);
    
    return this;
};

module.exports = mongoose.model('Progress', ProgressSchema);