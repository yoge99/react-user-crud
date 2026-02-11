import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "./types/User";
import { UserForm } from "./components/users/UserForm";
import { UserList } from "./components/users/UserList";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./services/userService"

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Fetch Users on Load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Create or Update
  const handleSubmit = async (user: User) => {
    try {
      setLoading(true);

      if (editingUser) {
        await updateUser(editingUser.id!, user);
        setEditingUser(null);
      } else {
        await createUser(user);
      }

      fetchUsers(); // refresh list
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress sx={{ mb: 2 }} />}

      <UserForm
        onSubmit={handleSubmit}
        initialData={editingUser || undefined}
      />

      <UserList
        users={users}
        onDelete={handleDelete}
        onEdit={(user) => setEditingUser(user)}
      />
    </Container>
  );
}

export default App;
