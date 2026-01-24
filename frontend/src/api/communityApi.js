import api, { API_ENDPOINTS } from '../config/api.js';

export const communityAPI = {
    // Get all discussions
    getAllDiscussions: () => api.get(API_ENDPOINTS.COMMUNITY.GET_ALL),

    // Get single discussion
    getDiscussionById: (id) => api.get(API_ENDPOINTS.COMMUNITY.GET_BY_ID(id)),

    // Create new discussion
    createDiscussion: (data) => api.post(API_ENDPOINTS.COMMUNITY.CREATE, data),

    // Add comment
    addComment: (id, content) => api.post(API_ENDPOINTS.COMMUNITY.COMMENT(id), { content }),

    // Toggle like
    toggleLike: (id) => api.put(API_ENDPOINTS.COMMUNITY.LIKE(id)),

    // Delete discussion
    deleteDiscussion: (id) => api.delete(API_ENDPOINTS.COMMUNITY.DELETE(id))
};
