const { supabase } = require('../config/supabase');

class Rating {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.user_id || data.userId;
    this.rating = data.rating;
    this.feedback = data.feedback || '';
    this.createdAt = data.created_at || data.createdAt || new Date().toISOString();
  }

  static async findOne(criteria) {
    try {
      let query = supabase.from('ratings').select('*');
      if (criteria.userId) {
        query = query.eq('user_id', criteria.userId);
      }

      const { data, error } = await query.limit(1).single();
      if (error || !data) return null;

      return new Rating(data);
    } catch (error) {
      console.error('Rating.findOne error:', error);
      return null;
    }
  }

  static async aggregate(pipeline) {
    // Pipeline usually: [ { $group: { _id: null, averageRating: { $avg: "$rating" }, totalRatings: { $sum: 1 } } } ]
    try {
      const { data, error } = await supabase.from('ratings').select('rating');
      if (error || !data) return [];

      const ratings = data.map(d => d.rating);
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
      const dbData = {
        user_id: this.userId,
        rating: this.rating,
        feedback: this.feedback,
        created_at: this.createdAt
      };

      if (this.id) {
        const { error } = await supabase
          .from('ratings')
          .update(dbData)
          .eq('id', this.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('ratings')
          .insert([dbData])
          .select()
          .single();
        if (error) throw error;
        if (data) this.id = data.id;
      }
      return this;
    } catch (error) {
      console.error('Rating.save error:', error);
      throw error;
    }
  }
}

module.exports = Rating;
