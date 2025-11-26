/**
 * Firebase Error Parser
 * Extracts clean error messages from Firebase auth errors
 */

interface FirebaseErrorMessages {
  [key: string]: string;
}

const errorMessages: FirebaseErrorMessages = {
  // Auth errors
  'auth/email-already-in-use': 'This email is already registered. Please login instead.',
  'auth/invalid-email': 'Invalid email address format.',
  'auth/operation-not-allowed': 'This operation is not allowed.',
  'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/popup-closed-by-user': 'Sign-in popup was closed before completion.',
  'auth/cancelled-popup-request': 'Sign-in was cancelled.',
  'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in method.',
  'auth/invalid-verification-code': 'Invalid verification code.',
  'auth/invalid-verification-id': 'Invalid verification ID.',
  'auth/missing-verification-code': 'Verification code is required.',
  'auth/missing-verification-id': 'Verification ID is required.',
  'auth/credential-already-in-use': 'This credential is already associated with a different account.',
  'auth/requires-recent-login': 'Please login again to perform this action.',
  'auth/expired-action-code': 'This code has expired.',
  'auth/invalid-action-code': 'Invalid action code.',
};

/**
 * Parses Firebase error messages and returns user-friendly error text
 * @param error - The error object from Firebase or any other source
 * @returns Clean, user-friendly error message
 */
export const parseFirebaseError = (error: any): string => {
  if (!error) {
    return 'An unexpected error occurred.';
  }

  // If error is a string, check if it contains Firebase error code
  if (typeof error === 'string') {
    // Remove "Firebase: Error " prefix if present
    const cleanError = error.replace(/^Firebase:\s*Error\s*/i, '').trim();
    
    // Extract error code from parentheses if present
    const codeMatch = cleanError.match(/\(([^)]+)\)/);
    if (codeMatch && codeMatch[1]) {
      const errorCode = codeMatch[1];
      return errorMessages[errorCode] || cleanError;
    }
    
    return cleanError;
  }

  // Handle Error objects
  if (error instanceof Error) {
    const message = error.message || '';
    
    // Remove "Firebase: Error " prefix
    const cleanMessage = message.replace(/^Firebase:\s*Error\s*/i, '').trim();
    
    // Extract error code from parentheses
    const codeMatch = cleanMessage.match(/\(([^)]+)\)/);
    if (codeMatch && codeMatch[1]) {
      const errorCode = codeMatch[1];
      return errorMessages[errorCode] || cleanMessage.replace(/\([^)]+\)\.?$/, '').trim();
    }
    
    return cleanMessage;
  }

  // Handle Firebase error objects with code property
  if (error.code) {
    return errorMessages[error.code] || error.message || 'An error occurred.';
  }

  // Handle objects with message property
  if (error.message) {
    const cleanMessage = error.message.replace(/^Firebase:\s*Error\s*/i, '').trim();
    const codeMatch = cleanMessage.match(/\(([^)]+)\)/);
    if (codeMatch && codeMatch[1]) {
      const errorCode = codeMatch[1];
      return errorMessages[errorCode] || cleanMessage.replace(/\([^)]+\)\.?$/, '').trim();
    }
    return cleanMessage;
  }

  return 'An unexpected error occurred.';
};
