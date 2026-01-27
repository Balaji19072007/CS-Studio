const { db } = require('../config/firebase');
const {
  collection, doc, getDoc, getDocs,
  addDoc, query, where, getCountFromServer
} = require('firebase/firestore');

class Rating {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.userId;
    this.rating = data.rating;
    this.feedback = data.feedback || '';
    this.timestamp = data.timestamp || new Date().toISOString();
  }

  static async findOne(criteria) {
    try {
      const ratingsRef = collection(db, 'ratings');
      const constraints = [];
      if (criteria.userId) constraints.push(where('userId', '==', criteria.userId));

      const q = query(ratingsRef, ...constraints);
      const snapshot = await getDocs(q);

      if (snapshot.empty) return null;
      const d = snapshot.docs[0];
      return new Rating({ id: d.id, ...d.data() });
    } catch (error) {
      console.error('Rating.findOne error:', error);
      return null;
    }
  }

  static async aggregate(pipeline) {
    // Mocking aggregate for simple average
    // Pipeline usually: [ { $group: { _id: null, averageRating: { $avg: "$rating" }, totalRatings: { $sum: 1 } } } ]
    try {
      const ratingsRef = collection(db, 'ratings');
      const snapshot = await getDocs(ratingsRef);
      const ratings = snapshot.docs.map(d => d.data().rating);

      if (ratings.length === 0) return [];

      const totalRatings = ratings.length;
      const sum = ratings.reduce((a, b) => a + b, 0);
      const averageRating = sum / totalRatings;

      return [{ averageRating, totalRatings }];
    } catch (error) {
      console.error('Rating.aggregate error:', error);
      return [];
    }
  }

  async save() {
    try {
      const ratingsRef = collection(db, 'ratings');
      const data = {
        userId: this.userId,
        rating: this.rating,
        feedback: this.feedback,
        timestamp: this.timestamp
      };
      const res = await addDoc(ratingsRef, data);
      this.id = res.id;
      return this;
    } catch (error) {
      console.error('Rating.save error:', error);
      throw error;
    }
  }
}

module.exports = Rating;