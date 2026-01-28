const { db } = require('../config/firebase');
const {
    collection, doc, getDoc, getDocs,
    setDoc, updateDoc, addDoc, query, where, getCountFromServer, limit
} = require('firebase/firestore');

class User {
    constructor(data) {
        this.id = data.id || null;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.photoUrl = data.photoUrl;
        this.bio = data.bio || '';
        this.totalPoints = data.totalPoints || 0;
        this.problemsSolved = data.problemsSolved || 0;
        this.currentStreak = data.currentStreak || 0;
        this.lastStreakUpdate = data.lastStreakUpdate || data.createdAt || new Date().toISOString();
        this.role = data.role || 'user';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.averageAccuracy = data.averageAccuracy || 0;
    }

    // --- Static Methods ---

    static async findOne(criteria) {
        try {
            const usersRef = collection(db, 'users');
            let q;

            if (criteria.email) {
                q = query(usersRef, where('email', '==', criteria.email), limit(1));
            } else if (criteria.username) {
                q = query(usersRef, where('username', '==', criteria.username), limit(1));
            } else {
                return null;
            }

            const snapshot = await getDocs(q);
            if (snapshot.empty) return null;

            const d = snapshot.docs[0];
            return new User({ id: d.id, ...d.data() });
        } catch (error) {
            console.error('User.findOne error:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            if (!id) return null;
            const docRef = doc(db, 'users', id);
            const d = await getDoc(docRef);
            if (!d.exists()) return null;
            return new User({ id: d.id, ...d.data() });
        } catch (error) {
            console.error('User.findById error:', error);
            throw error;
        }
    }

    static async getTopUsers(limitCount = 100) {
        try {
            const usersRef = collection(db, 'users');
            // Simple sort by totalPoints
            const q = query(usersRef, where('totalPoints', '>', 0));

            const snapshot = await getDocs(q);
            let users = snapshot.docs.map(d => new User({ id: d.id, ...d.data() }));

            users.sort((a, b) => b.totalPoints - a.totalPoints);
            return users.slice(0, limitCount);
        } catch (error) {
            console.error('User.getTopUsers error:', error);
            return [];
        }
    }

    static async count(criteria = {}) {
        try {
            const usersRef = collection(db, 'users');
            let q = usersRef;

            if (criteria.hasSolvedProblems) {
                q = query(usersRef, where('problemsSolved', '>', 0));
            }

            const snapshot = await getCountFromServer(q);
            return snapshot.data().count;
        } catch (error) {
            console.error('User.count error:', error);
            return 0;
        }
    }

    static async countDocuments(criteria = {}) {
        return this.count(criteria);
    }

    static async findByIdAndUpdate(id, update, options = {}) {
        try {
            if (!id) return null;
            const docRef = doc(db, 'users', id);

            // Filter undefined
            Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);

            await updateDoc(docRef, update);

            // If new: true is requested, return updated doc
            if (options && options.new) {
                const d = await getDoc(docRef);
                return new User({ id: d.id, ...d.data() });
            }
            return null;
        } catch (error) {
            console.error('User.findByIdAndUpdate error:', error);
            return null;
        }
    }


    async save() {
        const data = { ...this };
        delete data.id;
        data.updatedAt = new Date().toISOString();
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

        try {
            if (this.id) {
                const docRef = doc(db, 'users', this.id);
                await updateDoc(docRef, data);
            } else {
                const usersRef = collection(db, 'users');
                const res = await addDoc(usersRef, data);
                this.id = res.id;
            }
            return this;
        } catch (error) {
            console.error('User.save error:', error);
            throw error;
        }
    }
}

module.exports = User;