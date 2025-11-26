/**
 * Validation utility functions
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8;
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateLoginForm = (email: string, password: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  
  if (!password) {
    return 'Password is required';
  }
  
  if (!isValidPassword(password)) {
    return 'Password must be at least 8 characters';
  }
  
  return null;
};

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): string | null => {
  if (!name.trim()) {
    return 'Name is required';
  }
  
  if (!isValidName(name)) {
    return 'Name must be at least 2 characters';
  }
  
  if (!email.trim()) {
    return 'Email is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  
  if (!password) {
    return 'Password is required';
  }
  
  if (!isValidPassword(password)) {
    return 'Password must be at least 8 characters';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};
