export const isRequired = (value: string) => {
  return value.trim() !== '' || 'This field is required';
};

export const isEmail = (value: string) => {
  return /^\S+@\S+\.\S+$/.test(value) || 'Invalid email address';
};

export const isPhone = (value: string) => {
  return /^[0-9]{10}$/.test(value) || 'Invalid phone number';
};
