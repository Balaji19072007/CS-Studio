const { db } = require('../config/firebase');
const {
    collection, doc, getDoc, getDocs,
    setDoc, updateDoc, addDoc, query, where, deleteDoc
} = require('firebase/firestore');

class Discussion {
    constructor(data) {
        this.id = data.id || null;
        this.title = data.title;
        this.content = data.content;
        this.author = data.author;
        this.tags = data.tags || [];
        this.comments = data.comments || [];
        this.likes = data.likes || [];
        this.views = data.views || 0;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    static async find(criteria = {}) {
        try {
            const discussionsRef = collection(db, 'discussions');
            const snapshot = await getDocs(discussionsRef);
            if (snapshot.empty) return [];
            return snapshot.docs.map(d => new Discussion({ id: d.id, ...d.data() }));
        } catch (error) {
            console.error('Discussion.find error:', error);
            return [];
        }
    }

    static async findById(id) {
        try {
            const d = await getDoc(doc(db, 'discussions', id));
            if (!d.exists()) return null;
            return new Discussion({ id: d.id, ...d.data() });
        } catch (error) {
            console.error('Discussion.findById error:', error);
            throw error;
        }
    }

    static async findByIdAndUpdate(id, update) {
        // Very basic emulation for the specific route usage
        const d = await getDoc(doc(db, 'discussions', id));
        if (!d.exists()) return null;
        const data = d.data();

        if (update.$inc && update.$inc.views) {
            data.views = (data.views || 0) + update.$inc.views;
            await updateDoc(doc(db, 'discussions', id), { views: data.views });
        }
        return new Discussion({ id: d.id, ...data });
    }

    toObject() { return { ...this }; }

    async save() {
        const data = { ...this };
        delete data.id;
        data.updatedAt = new Date().toISOString();
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

        if (this.id) {
            await updateDoc(doc(db, 'discussions', this.id), data);
        } else {
            const res = await addDoc(collection(db, 'discussions'), data);
            this.id = res.id;
        }
        return this;
    }

    async deleteOne() {
        if (this.id) {
            await deleteDoc(doc(db, 'discussions', this.id));
        }
    }
}

module.exports = Discussion;
