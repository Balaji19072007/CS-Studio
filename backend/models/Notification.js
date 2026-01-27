const { db } = require('../config/firebase');
const {
  collection, doc, getDoc, getDocs,
  addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, getCountFromServer
} = require('firebase/firestore');

class Notification {
  constructor(data) {
    this.id = data.id || null;
    this.user = data.user; // userId
    this.title = data.title;
    this.message = data.message;
    this.type = data.type || 'system';
    this.link = data.link || '';
    this.read = data.read || false;
    this.important = data.important || false;
    this.data = data.data || {};
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  // Static helper to query notifications
  static async getNotifications(userId, options = {}) {
    try {
      const notifRef = collection(db, 'notifications');
      const constraints = [where('user', '==', userId)];

      if (options.unreadOnly) {
        constraints.push(where('read', '==', false));
      }

      // Simple pagination simulation (fetch all or limit logic)
      // Note: Firestore limit/offset is tricky without cursors. 
      // We'll implement basic fetching.

      let q = query(notifRef, ...constraints);
      const snapshot = await getDocs(q);

      let notifications = snapshot.docs.map(d => new Notification({ id: d.id, ...d.data() }));

      // Sort by createdAt desc in memory
      notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Pagination in memory
      const total = notifications.length;
      const page = options.page || 1;
      const limitVal = options.limit || 20;
      const start = (page - 1) * limitVal;
      const paginated = notifications.slice(start, start + limitVal);

      return { notifications: paginated, total };

    } catch (error) {
      console.error('getNotifications error:', error);
      throw error;
    }
  }

  static async countDocuments(criteria) {
    try {
      const notifRef = collection(db, 'notifications');
      const constraints = [];
      if (criteria.user) constraints.push(where('user', '==', criteria.user));
      if (criteria.read !== undefined) constraints.push(where('read', '==', criteria.read));

      const q = query(notifRef, ...constraints);
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (error) {
      console.error('countDocuments error:', error);
      return 0;
    }
  }

  static async findOneAndUpdate(criteria, update, options) {
    try {
      // Find doc first
      const notifRef = collection(db, 'notifications');
      const constraints = [where('user', '==', criteria.user)];
      if (criteria._id) constraints.push(where('__name__', '==', criteria._id)); // __name__ checks doc ID

      const q = query(notifRef, ...constraints);
      const snapshot = await getDocs(q);

      if (snapshot.empty) return null;

      const docSnap = snapshot.docs[0];
      const docRef = doc(db, 'notifications', docSnap.id);

      await updateDoc(docRef, update);

      // Return updated
      const updatedSnap = await getDoc(docRef);
      return new Notification({ id: updatedSnap.id, ...updatedSnap.data() });

    } catch (error) {
      console.error('findOneAndUpdate error:', error);
      return null;
    }
  }

  static async updateMany(criteria, update) {
    try {
      const notifRef = collection(db, 'notifications');
      const constraints = [];
      if (criteria.user) constraints.push(where('user', '==', criteria.user));
      if (criteria.read !== undefined) constraints.push(where('read', '==', criteria.read));

      const q = query(notifRef, ...constraints);
      const snapshot = await getDocs(q);

      const promises = snapshot.docs.map(d => updateDoc(d.ref, update));
      await Promise.all(promises);

      return { modifiedCount: snapshot.size };
    } catch (error) {
      console.error('updateMany error:', error);
      return { modifiedCount: 0 };
    }
  }

  static async findOneAndDelete(criteria) {
    try {
      const notifRef = collection(db, 'notifications');
      const constraints = [where('user', '==', criteria.user)];
      if (criteria._id) constraints.push(where('__name__', '==', criteria._id));

      const q = query(notifRef, ...constraints);
      const snapshot = await getDocs(q);

      if (snapshot.empty) return null;

      const d = snapshot.docs[0];
      await deleteDoc(d.ref);
      return new Notification({ id: d.id, ...d.data() });
    } catch (error) {
      console.error('findOneAndDelete error:', error);
      return null;
    }
  }

  static async deleteMany(criteria) {
    try {
      const notifRef = collection(db, 'notifications');
      const constraints = [];
      if (criteria.user) constraints.push(where('user', '==', criteria.user));

      const q = query(notifRef, ...constraints);
      const snapshot = await getDocs(q);

      const promises = snapshot.docs.map(d => deleteDoc(d.ref));
      await Promise.all(promises);

      return { deletedCount: snapshot.size };
    } catch (error) {
      console.error('deleteMany error:', error);
      return { deletedCount: 0 };
    }
  }
}

module.exports = Notification;