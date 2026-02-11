import { useEffect, useState } from 'react';
import { User } from '../types/User';
import * as api from '../api/userApi';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user: User) => {
    try {
      const newUser = await api.createUser(user);
      setUsers(prev => [...prev, newUser]);
    } catch {
      setError('Failed to create user');
    }
  };

  const editUser = async (id: number, user: User) => {
    try {
      const updated = await api.updateUser(id, user);
      setUsers(prev =>
        prev.map(u => (u.id === id ? updated : u))
      );
    } catch {
      setError('Failed to update user');
    }
  };

  const removeUser = async (id: number) => {
    try {
      await api.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch {
      setError('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
  };
};
