# Authentication System Documentation

## Overview

This Vue 3 application uses a robust authentication system built with Pinia for state management and Laravel Sanctum for backend authentication. The system provides a complete authentication flow with proper error handling, loading states, and security features.

## Features

### ✅ Implemented Features

1. **User Authentication**
   - Login with email/password
   - Registration with email verification
   - Logout functionality
   - Remember me option

2. **Password Management**
   - Forgot password functionality
   - Password reset with secure tokens
   - Password confirmation validation

3. **Security Features**
   - CSRF protection with Laravel Sanctum
   - Session-based authentication
   - Automatic token refresh
   - Secure logout (clears local state even if server fails)

4. **User Experience**
   - Loading states during authentication
   - Comprehensive error handling
   - Toast notifications for user feedback
   - Redirect handling after login/registration
   - Persistent authentication state

5. **Route Protection**
   - Automatic route guards
   - Guest-only routes (login, register)
   - Protected routes (dashboard, posts)
   - Redirect to intended page after login

## Architecture

### Store Structure (`AuthStore.js`)

```javascript
// State
const user = ref(null)           // Current user data
const isAuth = ref(false)        // Authentication status
const errors = ref({})           // Validation errors
const processing = ref(false)    // Loading state
const isInitialized = ref(false) // App initialization status

// Actions
- attempt()           // Check authentication status
- login(credentials)  // User login
- register(credentials) // User registration
- logout()           // User logout
- forgotPassword(email) // Password reset request
- resetPassword(credentials) // Password reset
- cleanState()       // Clear authentication state
- clearErrors()      // Clear validation errors
```

### HTTP Client (`axios.js`)

- Automatic CSRF token handling
- Response interceptors for error handling
- Automatic logout on authentication errors
- Network error handling

### Router Guards (`router/index.js`)

- Waits for authentication initialization
- Protects routes based on authentication status
- Handles redirects after login
- Guest-only route protection

## Usage

### Basic Authentication

```javascript
import { useAuthStore } from '@/store/AuthStore.js'

const authStore = useAuthStore()

// Login
await authStore.login({
  email: 'user@example.com',
  password: 'password',
  remember: true
})

// Register
await authStore.register({
  name: 'John Doe',
  email: 'user@example.com',
  password: 'password',
  password_confirmation: 'password'
})

// Logout
await authStore.logout()

// Check authentication status
if (authStore.getAuth) {
  // User is authenticated
  console.log(authStore.getUser)
}
```

### Route Protection

Routes are automatically protected based on meta properties:

```javascript
// Protected route (requires authentication)
{
  path: '/dashboard',
  component: Dashboard,
  meta: { forLogged: true }
}

// Guest-only route (redirects if authenticated)
{
  path: '/login',
  component: Login,
  meta: { forGuests: true }
}
```

### Error Handling

The system provides comprehensive error handling:

```javascript
// Validation errors
if (authStore.errors.email) {
  console.log(authStore.errors.email[0])
}

// Clear errors
authStore.clearErrors()

// Processing state
if (authStore.processing) {
  // Show loading indicator
}
```

## Environment Configuration

Create a `.env` file in the Front directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Pusher Configuration (for real-time features)
VITE_PUSHER_APP_KEY=your-pusher-key
VITE_PUSHER_APP_CLUSTER=your-pusher-cluster

# App Configuration
VITE_APP_NAME="Laravel API Vue3 App"
VITE_APP_ENV=local
```

## Security Considerations

### ✅ Implemented Security Measures

1. **CSRF Protection**: Uses Laravel Sanctum's CSRF tokens
2. **Session Security**: Secure session handling with HTTP-only cookies
3. **Input Validation**: Server-side validation with error feedback
4. **Rate Limiting**: Handles 429 responses gracefully
5. **Secure Logout**: Clears local state even if server logout fails
6. **Token Management**: Automatic token refresh and cleanup

### 🔒 Additional Security Recommendations

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Keep sensitive data in environment variables
3. **Input Sanitization**: Validate and sanitize all user inputs
4. **Session Timeout**: Implement session timeout policies
5. **Audit Logging**: Log authentication events for security monitoring

## Error Handling

The system handles various error scenarios:

- **422**: Validation errors (displayed to user)
- **401**: Unauthorized (redirects to login)
- **403**: Forbidden (shows access denied message)
- **419**: CSRF token mismatch (redirects to login)
- **429**: Rate limiting (shows retry message)
- **500**: Server errors (redirects to error page)
- **Network**: Connection issues (shows network error)

## Performance Optimizations

1. **Lazy Loading**: Routes are lazy-loaded for better performance
2. **State Persistence**: Uses localStorage for persistent authentication
3. **Minimal Re-renders**: Efficient state management with Pinia
4. **Error Boundaries**: Graceful error handling prevents app crashes

## Testing

The authentication system can be tested by:

1. **Manual Testing**:
   - Login/logout flow
   - Registration process
   - Password reset functionality
   - Route protection
   - Error scenarios

2. **Automated Testing** (recommended):
   - Unit tests for store actions
   - Integration tests for API calls
   - E2E tests for user flows

## Troubleshooting

### Common Issues

1. **CSRF Token Errors**: Ensure Laravel Sanctum is properly configured
2. **CORS Issues**: Check CORS configuration in Laravel
3. **Session Issues**: Verify session configuration
4. **Redirect Loops**: Check route guard logic

### Debug Mode

Enable debug mode by setting `VITE_APP_ENV=local` in your environment file.

## Future Enhancements

1. **Two-Factor Authentication**: Add 2FA support
2. **Social Login**: Integrate OAuth providers
3. **Role-Based Access**: Implement user roles and permissions
4. **Session Management**: Add session management UI
5. **Audit Trail**: Implement authentication audit logging

## Dependencies

- **Vue 3**: Frontend framework
- **Pinia**: State management
- **Vue Router**: Client-side routing
- **Axios**: HTTP client
- **Vue Toast Notification**: User notifications
- **Pinia Plugin Persisted State**: State persistence

## Backend Requirements

- **Laravel**: Backend framework
- **Laravel Sanctum**: API authentication
- **Laravel Breeze**: Authentication scaffolding (optional)
- **CORS**: Cross-origin resource sharing configuration 