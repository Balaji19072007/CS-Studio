const { supabase } = require('../config/supabase');

class Notification {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.user_id || data.user || data.userId;
    this.title = data.title;
    this.message = data.message;
    this.type = data.type || 'system';
    this.link = data.link || '';
    this.isRead = data.is_read !== undefined ? data.is_read : (data.read || false);
    this.important = data.important || false;
    this.data = data.data || {};
    this.createdAt = data.created_at || data.createdAt || new Date().toISOString();
  }

  static async getNotifications(userId, options = {}) {
    try {
      let query = supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .eq('user_id', userId);

      if (options.unreadOnly) {
        query = query.eq('is_read', false);
      }

      query = query.order('created_at', { ascending: false });

      const page = options.page || 1;
      const limitVal = options.limit || 20;
      const start = (page - 1) * limitVal;
      query = query.range(start, start + limitVal - 1);

      const { data, count, error } = await query;
      if (error) throw error;

      const notifications = (data || []).map(d => new Notification(d));
      return { notifications, total: count || 0 };

    } catch (error) {
      console.error('getNotifications error:', error);
      return { notifications: [], total: 0 };
    }
  }

  static async countDocuments(criteria) {
    try {
      let query = supabase.from('notifications').select('*', { count: 'exact', head: true });
      if (criteria.user) query = query.eq('user_id', criteria.user);
      if (criteria.read !== undefined) query = query.eq('is_read', criteria.read);

      const { count, error } = await query;
      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('countDocuments error:', error);
      return 0;
    }
  }

  async save() {
    try {
      const dbData = {
        user_id: this.userId,
        title: this.title,
        message: this.message,
        type: this.type,
        link: this.link,
        is_read: this.isRead,
        important: this.important,
        data: this.data,
        created_at: this.createdAt
      };

      if (this.id) {
        const { error } = await supabase
          .from('notifications')
          .update(dbData)
          .eq('id', this.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('notifications')
          .insert([dbData])
          .select()
          .single();
        if (error) throw error;
        if (data) this.id = data.id;
      }
      return this;
    } catch (error) {
      console.error('Notification.save error:', error);
      throw error;
    }
  }

  static async updateMany(criteria, update) {
    try {
      let query = supabase.from('notifications').update(update);
      if (criteria.user) query = query.eq('user_id', criteria.user);
      if (criteria.read !== undefined) query = query.eq('is_read', criteria.read);

      const { error, count } = await query;
      if (error) throw error;
      return { modifiedCount: count || 0 };
    } catch (error) {
      console.error('updateMany error:', error);
      return { modifiedCount: 0 };
    }
  }

  static async findOneAndDelete(criteria) {
    try {
      let query = supabase.from('notifications').delete().select().limit(1);
      if (criteria.user) query = query.eq('user_id', criteria.user);
      if (criteria._id) query = query.eq('id', criteria._id);

      const { data, error } = await query;
      if (error) throw error;
      return data && data.length ? new Notification(data[0]) : null;
    } catch (error) {
      console.error('findOneAndDelete error:', error);
      return null;
    }
  }

  static async deleteMany(criteria) {
    try {
      let query = supabase.from('notifications').delete();
      if (criteria.user) query = query.eq('user_id', criteria.user);

      const { error, count } = await query;
      if (error) throw error;
      return { deletedCount: count || 0 };
    } catch (error) {
      console.error('deleteMany error:', error);
      return { deletedCount: 0 };
    }
  }
  static async insertMany(notifications) {
    try {
      const dbData = notifications.map(n => ({
        user_id: n.userId || n.user,
        title: n.title,
        message: n.message,
        type: n.type || 'system',
        link: n.link || '',
        is_read: n.isRead !== undefined ? n.is_read : (n.read || false),
        important: n.important || false,
        data: n.data || {},
        created_at: n.createdAt || new Date().toISOString()
      }));

      const { data, error } = await supabase
        .from('notifications')
        .insert(dbData)
        .select();

      if (error) throw error;
      return (data || []).map(d => new Notification(d));
    } catch (error) {
      console.error('Notification.insertMany error:', error);
      throw error;
    }
  }
}

module.exports = Notification;

