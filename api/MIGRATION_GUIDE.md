# PortalStore API Migration Guide

This guide documents the migration from mock data to API calls in `PortalStore`.

## Migration Strategy

### Phase 1: Hybrid Mode (Current)
- Keep mock data as fallback
- Add `useAPI` flag to toggle between API and mock mode
- Migrate methods one by one with error fallback to mock data

### Phase 2: Full API Mode
- Remove mock data fallback
- All operations use API
- Enhanced error handling

## Configuration

### Enable API Mode

In `portal.js`, PortalStore constructor:

```javascript
class PortalStore {
  constructor() {
    // Enable API mode (set to false to use mock data during development)
    this.useAPI = window.API && window.API_CONFIG ? true : false;
    // ... rest of constructor
  }
}
```

### Toggle API Mode

```javascript
// Enable API mode
store.useAPI = true;

// Disable API mode (fallback to mock data)
store.useAPI = false;
```

## Migration Pattern

### Read Operations (GET)

**Before:**
```javascript
getProjects() {
  return this.projects;
}
```

**After:**
```javascript
async getProjects() {
  if (this.useAPI && window.API) {
    try {
      const data = await window.API.customer.getProjects();
      this.projects = data;
      this.notify();
      return this.projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      // Fallback to mock data
      return this.projects;
    }
  }
  return this.projects;
}
```

### Write Operations (POST/PATCH)

**Before:**
```javascript
addProject(project) {
  const newProject = {
    ...project,
    id: `proj-${Date.now()}`
  };
  this.projects.push(newProject);
  this.notify();
  return newProject;
}
```

**After:**
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
      const newProject = {
        ...project,
        id: `proj-${Date.now()}`
      };
      this.projects.push(newProject);
      this.notify();
      return newProject;
    }
  }
  
  // Mock mode
  const newProject = {
    ...project,
    id: `proj-${Date.now()}`
  };
  this.projects.push(newProject);
  this.notify();
  return newProject;
}
```

## Methods to Migrate

### Customer Endpoints
- [ ] `getProjects()` → `API.customer.getProjects()`
- [ ] `getInvoices()` → `API.customer.getInvoices()`
- [ ] `getThreads()` → `API.customer.getThreads()`
- [ ] `getRequests()` → `API.customer.getRequests()`
- [ ] `sendMessage()` → `API.customer.sendMessage()`
- [ ] `addRequest()` → `API.customer.createRequest()`

### Admin Endpoints
- [ ] `getCustomers()` → `API.admin.getCustomers()`
- [ ] `addProject()` → `API.admin.createProject()`
- [ ] `addInvoice()` → `API.admin.createInvoice()`
- [ ] `updateRequestStatus()` → `API.admin.updateRequestStatus()`
- [ ] `sendMessage()` (admin) → `API.admin.sendMessage()`

### Authentication
- [ ] `AuthService.setSession()` → `API.auth.login()`
- [ ] `AuthService.clearSession()` → `API.auth.logout()`
- [ ] `AuthService.getSession()` → `API.auth.getCurrentUser()`

## Error Handling

All API calls should:
1. Try API call if `useAPI` is true and `window.API` exists
2. Catch errors and log them
3. Fallback to mock data behavior if API fails
4. Notify listeners of state changes

## Testing

Test each migrated method:
1. With API enabled (when backend is available)
2. With API disabled (mock mode)
3. With API enabled but backend unavailable (fallback to mock)

## Next Steps

1. Start with authentication (most critical)
2. Then read operations (getProjects, getInvoices)
3. Then write operations (addProject, addInvoice)
4. Finally, complex operations (file uploads)
