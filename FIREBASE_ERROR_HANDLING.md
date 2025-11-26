# Firebase Error Handling

## Overview
Clean Firebase error parsing that removes the "Firebase: Error" prefix and provides user-friendly error messages.

## Features
- ✅ Removes "Firebase: Error" prefix from error messages
- ✅ Extracts error codes from parentheses format: `(auth/email-already-in-use)`
- ✅ Maps Firebase error codes to user-friendly messages
- ✅ Handles multiple error object formats

## Usage

```typescript
import { parseFirebaseError } from '../../src/utils';

try {
  await authService.signUp(email, password, name);
} catch (error: any) {
  const cleanError = parseFirebaseError(error);
  showError(cleanError); // Shows: "This email is already registered. Please login instead."
}
```

## Error Mappings

| Firebase Error Code | User-Friendly Message |
|---------------------|----------------------|
| `auth/email-already-in-use` | This email is already registered. Please login instead. |
| `auth/invalid-email` | Invalid email address format. |
| `auth/weak-password` | Password is too weak. Please use at least 6 characters. |
| `auth/user-not-found` | No account found with this email. |
| `auth/wrong-password` | Incorrect password. Please try again. |
| `auth/invalid-credential` | Invalid email or password. |
| `auth/too-many-requests` | Too many attempts. Please try again later. |
| `auth/network-request-failed` | Network error. Please check your connection. |

## Implementation

The error parser is integrated into:
- ✅ `authService.ts` - All authentication methods
- ✅ `login.tsx` - Login error handling
- ✅ `register.tsx` - Registration error handling

## Example Transformations

**Before:**
```
Firebase: Error (auth/email-already-in-use).
```

**After:**
```
This email is already registered. Please login instead.
```

---

**Before:**
```
Firebase: Error (auth/wrong-password).
```

**After:**
```
Incorrect password. Please try again.
```
