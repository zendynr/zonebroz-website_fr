# Portal API Integration Status

## ✅ Completed

### API Infrastructure
- [x] API client utility (`api/client.js`)
- [x] API configuration (`api/config.js`) with environment detection
- [x] API service layer (`api/services.js`) with all endpoint methods
- [x] Scripts loaded in `portal.html`
- [x] PortalStore API mode flag added
- [x] Migration guide created (`api/MIGRATION_GUIDE.md`)

### API Configuration
- [x] Automatic environment detection (dev/staging/prod)
- [x] Manual override option available
- [x] All endpoint definitions ready

### Documentation
- [x] API README with setup instructions
- [x] Migration guide with patterns and examples
- [x] Example config file

## 🔄 In Progress

### PortalStore Migration
- [x] API mode flag added to PortalStore
- [ ] Authentication migration (AuthService → API.auth)
- [ ] Data fetching migration (read operations)
- [ ] Data creation migration (write operations)

## 📋 Next Steps

### 1. Migrate Authentication (Priority: High)

Update `AuthService` in `portal.js` to use `API.auth` methods:

**Current location:** Search for `const AuthService = {`

**To migrate:**
- `setSession()` → Use `API.auth.login()` and store token
- `getSession()` → Use `API.auth.getCurrentUser()` or read from localStorage
- `clearSession()` → Use `API.auth.logout()`

### 2. Migrate Data Fetching (Priority: High)

Add async data loading methods to PortalStore:

**Example pattern:**
```javascript
async loadProjects() {
  if (this.useAPI && window.API) {
    try {
      const data = await window.API.customer.getProjects();
      this.projects = data;
      this.notify();
      return this.projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return this.projects; // Fallback to mock data
    }
  }
  return this.projects;
}
```

**Methods to migrate:**
- Customer: `getProjects()`, `getInvoices()`, `getThreads()`, `getRequests()`
- Admin: `getCustomers()`, `getRequests()`, `getThreads()`

### 3. Migrate Data Creation (Priority: Medium)

Update create methods to use API:

**Example pattern:**
```javascript
async addProject(project) {
  if (this.useAPI && window.API) {
    try {
      const newProject = await window.API.admin.createProject(project);
      this.projects.push(newProject);
      this.notify();
      return newProject;
    } catch (error) {
      console.error('Failed to create project:', error);
      // Fallback to mock behavior
    }
  }
  // Mock mode (existing code)
}
```

**Methods to migrate:**
- `addProject()` → `API.admin.createProject()`
- `addInvoice()` → `API.admin.createInvoice()`
- `addRequest()` → `API.customer.createRequest()`
- `addMessage()` → `API.customer.sendMessage()` or `API.admin.sendMessage()`
- `updateRequestStatus()` → `API.admin.updateRequestStatus()`

### 4. Add Loading States (Priority: Medium)

Add loading indicators during API calls:
- Show spinner/loading state while fetching data
- Disable buttons during API calls
- Show error messages to users

### 5. File Upload (Priority: Low)

Implement PDF upload for invoices:
- Use `API.admin.uploadInvoicePDF(invoiceId, file)`
- Update invoice creation flow to upload PDF
- Handle upload progress and errors

## Testing Checklist

For each migrated method:

- [ ] Test with API enabled (when backend is available)
- [ ] Test with API disabled (mock mode)
- [ ] Test with API enabled but backend unavailable (error handling)
- [ ] Test error messages display correctly
- [ ] Test loading states show/hide correctly

## Current State

**API Mode:** 
- Automatically enabled if `window.API` and `window.API_CONFIG` exist
- Can be toggled manually: `store.useAPI = true/false`

**Fallback:**
- All methods fallback to mock data if API is unavailable
- Mock data is initialized in PortalStore constructor

**Next Migration:**
- Start with authentication (most critical)
- Then data fetching (read operations)
- Then data creation (write operations)

## Backend Requirements

Before completing migration, ensure backend implements:

- [ ] Authentication endpoints (`/auth/login`, `/auth/logout`, `/auth/me`)
- [ ] Customer endpoints (`/customer/projects`, `/customer/invoices`, etc.)
- [ ] Admin endpoints (`/admin/customers`, `/admin/projects`, etc.)
- [ ] File upload endpoint (`/admin/invoices/:id/upload`)
- [ ] CORS configured for portal domain
- [ ] Authentication token support (Bearer token)

See `PORTAL_BACKEND_TODO.md` for complete backend checklist.
