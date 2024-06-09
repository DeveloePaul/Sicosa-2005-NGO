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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return [];
  }
};

const updateUser = async (id, updates) => {
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
};

const deleteUser = async (id) => {
  const res = await fetch(`${apiDomain}/members/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete user');
  }
  return res.json();
};

// Executives
const fetchExcos = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/members/executives`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};


export { fetchEvents, fetchEvent, fetchUsers, updateUser, deleteUser, fetchExcos };
