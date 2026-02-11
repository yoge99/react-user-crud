import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { User } from "../../types/User";

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
}

export const UserList = ({
  users,
  onDelete,
  onEdit,
}: UserListProps) => {
  if (users.length === 0) {
    return (
      <Typography variant="body1">
        No users found.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">User List</Typography>

      {users.map((user) => (
        <Card key={user.id} variant="outlined">
          <CardContent>
            <Stack spacing={1}>
              <Typography>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </Typography>

              <Typography>
                <strong>Email:</strong> {user.email}
              </Typography>

              <Typography>
                <strong>Phone:</strong> {user.phone}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => user.id && onDelete(user.id)}
                >
                  Delete
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
