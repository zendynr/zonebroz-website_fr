# Portal MVP v1 - Backend Integration TODO

This document outlines the steps needed to integrate the Portal MVP v1 frontend with backend services (database, storage, authentication).

## Overview

The portal frontend is currently using:
- **Mock data**: Located in `mock/portalData.js`
- **Local state**: `PortalStore` class in `portal.js`
- **LocalStorage session**: Basic auth simulation in `AuthService`
- **File upload simulation**: File picker UI only, no actual upload

## Integration Checklist

### 1. Authentication Provider Integration

- [ ] **Replace localStorage session with real auth**
  - Integrate authentication provider (Auth0, Supabase Auth, Firebase Auth, or custom)
  - Replace `AuthService.getSession()`, `setSession()`, `clearSession()` in `portal.js`
  - Update login form submission to call real auth API
  - Implement token refresh logic
  - Add JWT/token validation on protected routes

- [ ] **Role-based access control (RBAC)**
  - Store user roles in auth provider (customer vs admin)
  - Update route guards to check real roles
  - Ensure customers cannot access `/admin/*` routes
  - Ensure admins have proper permissions

### 2. Database Integration

- [ ] **Set up database schema**
  - Create tables: `customers`, `projects`, `invoices`, `threads`, `messages`, `requests`
  - Define relationships and foreign keys
  - Set up indexes for common queries (customerId, projectId, etc.)

- [ ] **Replace mock data with API calls**
  - Create API endpoints for each entity type
  - Update `PortalStore` methods to call APIs instead of manipulating local arrays:
    - `addProject()` → POST `/api/projects`
    - `addInvoice()` → POST `/api/invoices`
    - `addMessage()` → POST `/api/messages`
    - `addThread()` → POST `/api/threads`
    - `addRequest()` → POST `/api/requests`
    - `updateRequestStatus()` → PATCH `/api/requests/:id`
  
- [ ] **Implement data fetching**
  - Replace direct array access with API calls:
    - `store.projects` → GET `/api/projects` (with customer filter)
    - `store.invoices` → GET `/api/invoices` (with customer filter)
    - `store.messages` → GET `/api/messages?threadId=...`
    - `store.requests` → GET `/api/requests` (with role-based filtering)
  
- [ ] **Add real-time updates (optional)**
  - WebSocket or Server-Sent Events for new messages
  - Polling for request status updates
  - Real-time notifications

### 3. File Storage Integration

- [ ] **PDF Invoice Storage**
  - Set up cloud storage (AWS S3, Cloudinary, Supabase Storage, etc.)
  - Implement file upload endpoint: POST `/api/invoices/:id/upload`
  - Update invoice creation flow to:
    1. Create invoice record in DB
    2. Upload PDF to storage
    3. Store PDF URL in invoice record
  - Update "View PDF" button to use real PDF URLs
  - Add file validation (size, type, etc.)

- [ ] **Secure file access**
  - Implement signed URLs or access tokens for PDFs
  - Ensure customers can only access their own invoices
  - Ensure admins can access all invoices

### 4. Row-Level Security (RLS) / Policies

- [ ] **Customer data isolation**
  - Customers can only see their own:
    - Projects (`WHERE customerId = current_user_id`)
    - Invoices (`WHERE customerId = current_user_id`)
    - Messages/threads (`WHERE customerId = current_user_id`)
    - Requests (`WHERE customerId = current_user_id`)
  
- [ ] **Admin access policies**
  - Admins can view all data
  - Admins can create projects/invoices for any customer
  - Admins can update request statuses

- [ ] **Database-level policies** (if using Supabase/PostgreSQL)
  - Set up RLS policies on all tables
  - Use `auth.uid()` for customer filtering
  - Use role-based policy checks for admin access

### 5. API Endpoints to Implement

#### Customer Endpoints
- `GET /api/customer/projects` - Get customer's projects
- `GET /api/customer/projects/:id` - Get project details
- `GET /api/customer/invoices` - Get customer's invoices
- `GET /api/customer/invoices/:id` - Get invoice details (with PDF URL)
- `GET /api/customer/messages` - Get customer's message threads
- `GET /api/customer/messages/threads/:id` - Get thread messages
- `POST /api/customer/messages/threads/:id` - Send message in thread
- `POST /api/customer/messages/threads` - Create new thread
- `GET /api/customer/requests` - Get customer's requests
- `POST /api/customer/requests` - Create new request

#### Admin Endpoints
- `GET /api/admin/customers` - List all customers
- `GET /api/admin/customers/:id` - Get customer details with all data
- `POST /api/admin/projects` - Create project for customer
- `POST /api/admin/invoices` - Create invoice for customer
- `POST /api/admin/invoices/:id/upload` - Upload PDF for invoice
- `GET /api/admin/requests` - Get all requests (all customers)
- `PATCH /api/admin/requests/:id` - Update request status
- `GET /api/admin/messages` - Get all message threads
- `GET /api/admin/messages/threads/:id` - Get thread messages
- `POST /api/admin/messages/threads/:id` - Reply to thread

### 6. Error Handling & Loading States

- [ ] **Add loading states**
  - Show loading indicators during API calls
  - Replace mock "instant" responses with async loading
  
- [ ] **Error handling**
  - Network error handling
  - API error responses (400, 401, 403, 404, 500)
  - User-friendly error messages
  - Retry logic for failed requests

- [ ] **Form validation**
  - Client-side validation (already partially implemented)
  - Server-side validation
  - Display validation errors

### 7. Testing & Security

- [ ] **Security audit**
  - Input sanitization for all user inputs
  - SQL injection prevention (use parameterized queries)
  - XSS prevention
  - CSRF protection for state-changing operations
  - Rate limiting on API endpoints

- [ ] **Testing**
  - Unit tests for store methods
  - Integration tests for API endpoints
  - E2E tests for critical user flows
  - Load testing for concurrent users

### 8. Deployment Considerations

- [ ] **Environment variables**
  - Move API endpoints to environment variables
  - Store auth configuration in env vars
  - Store storage bucket URLs/config in env vars

- [ ] **CORS configuration**
  - Configure CORS for API endpoints
  - Whitelist portal domain(s)

- [ ] **HTTPS enforcement**
  - Ensure all API calls use HTTPS
  - Enforce HTTPS redirects

## Files to Modify During Integration

### Core Files
- `portal.js` - Replace `PortalStore` with API calls, update `AuthService`
- `mock/portalData.js` - Can be removed or kept for development/testing

### New Files Needed
- API client utility (e.g., `api/client.js`)
- Environment configuration (e.g., `.env.example`)
- Error handling utilities
- Loading state components (if not using a framework)

## Migration Strategy

1. **Phase 1: Auth Integration**
   - Start with authentication only
   - Keep mock data temporarily
   - Test login/logout flows

2. **Phase 2: Read Operations**
   - Replace data fetching with API calls
   - Keep write operations (create/update) as mock
   - Test data display

3. **Phase 3: Write Operations**
   - Implement create/update API endpoints
   - Replace mock mutations with API calls
   - Test full CRUD flows

4. **Phase 4: File Storage**
   - Implement PDF upload
   - Update invoice viewing
   - Test file access

5. **Phase 5: Polish**
   - Add loading states
   - Improve error handling
   - Performance optimization
   - Security hardening

## Notes

- The frontend is framework-agnostic and uses vanilla JavaScript ES modules
- The routing system uses hash-based routing (`#/portal`, `#/admin`)
- All state management is currently local; this can be replaced with React/Vue state management if migrating to a framework
- The mock data structure matches the expected API response format for easy migration
