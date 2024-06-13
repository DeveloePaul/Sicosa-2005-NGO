const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Events
const fetchEvents = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/events`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

const fetchEvent = async (id) => {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/events/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

// Users
const fetchUsers = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/members`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const updateUser = async (id, updates) => {
  try {
    if (!apiDomain) {
      throw new Error('API domain is not defined');
    }
    const res = await fetch(`${apiDomain}/members/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      throw new Error('Failed to update user');
    }
    return res.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    if (!apiDomain) {
      throw new Error('API domain is not defined');
    }
    const res = await fetch(`${apiDomain}/members/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete user');
    }
    return res.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Executives
const fetchExcos = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/members/executives`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching executives:', error);
    return [];
  }
};

// BLOG
const fetchPosts = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/blog`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

const fetchPost = async (id) => {
  try {
    if (!apiDomain) {
      throw new Error('API domain is not defined');
    }
    const res = await fetch(`${apiDomain}/blog/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};


const createPost = async (post) => {
  try {
    if (!apiDomain) {
      throw new Error('API domain is not defined');
    }
    const res = await fetch(`${apiDomain}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!res.ok) {
      throw new Error('Failed to create post');
    }
    return res.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const updatePost = async (id, updates) => {
  try {
    if (!apiDomain) {
      throw new Error('API domain is not defined');
    }
    const res = await fetch(`${apiDomain}/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      throw new Error('Failed to update post');
    }
    return res.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

const deletePost = async (id) => {
  try {
    if (!apiDomain) {
      throw new Error('API domain is not defined');
    }
    const res = await fetch(`${apiDomain}/blog/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete post');
    }
    return res.json();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export {
  fetchEvents,
  fetchEvent,
  fetchUsers,
  updateUser,
  deleteUser,
  fetchExcos,
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
};
