import { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { userFormConfig } from "../../config/userFormConfig";
import { User } from "../../types/User";
import { isEmail, isPhone, isRequired } from "../../utils/validators";

interface UserFormProps {
  initialData?: User;
  onSubmit: (user: User) => void;
}

const emptyUser: User = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

export const UserForm = ({ initialData, onSubmit }: UserFormProps) => {
  const [formData, setFormData] = useState<User>(emptyUser);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🔥 Important: Sync when editing user changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyUser);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    userFormConfig.forEach((field) => {
      const value = (formData as any)[field.name] || "";

      if (field.required && !isRequired(value)) {
        newErrors[field.name] = "This field is required";
      }

      if (field.name === "email" && value && !isEmail(value)) {
        newErrors[field.name] = "Invalid email address";
      }

      if (field.name === "phone" && value && !isPhone(value)) {
        newErrors[field.name] = "Invalid phone number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 🔥 Remove error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Typography variant="h6">
        {initialData ? "Edit User" : "Add User"}
      </Typography>

      {userFormConfig.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type}
          value={(formData as any)[field.name] || ""}
          onChange={(e) =>
            handleChange(field.name, e.target.value)
          }
          error={!!errors[field.name]}
          helperText={errors[field.name]}
          fullWidth
        />
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {initialData ? "Update User" : "Create User"}
      </Button>
    </Stack>
  );
};
