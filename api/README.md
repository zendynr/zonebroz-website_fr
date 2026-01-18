# Portal API Integration

This directory contains the API client infrastructure for backend integration.

## Files

- **`config.js`** - API configuration (endpoints, base URL)
- **`client.js`** - Core API client with authentication, error handling, and request methods
- **`services.js`** - High-level service layer for each resource type

## Setup

### 1. Update API Base URL

The API configuration automatically detects the environment based on the hostname:

**Automatic Detection:**
- **Production**: When hostname is `zonebroz.com` → uses `https://api.zonebroz.com/api`
- **Staging**: When hostname includes `staging` or `preview` → uses `https://api-staging.zonebroz.com/api`
- **Development**: Defaults to `http://localhost:3000/api`

**Manual Override:**

To manually set the API URL, edit `api/config.js`:

```javascript
window.API_CONFIG = {
  BASE_URL: 'https://your-api-domain.com/api', // Your API URL here
  // ... rest of config
}
```

Or uncomment the manual override line:
```javascript
// MANUAL OVERRIDE: Uncomment and set this to override automatic detection
BASE_URL: 'http://localhost:3000/api',
```

### 2. Load API Scripts in portal.html

Add these script tags to `portal.html` before `portal.js`:

```html
<script src="api/config.js"></script>
<script src="api/client.js"></script>
<script src="api/services.js"></script>
<script src="portal.js"></script>
```

### 3. Update portal.js to use API

The API services are available via the `API` global object:

```javascript
// Instead of store.customers, use:
const customers = await API.admin.getCustomers();

// Instead of store.addProject(), use:
const project = await API.admin.createProject(projectData);
```

## Migration Strategy

### Phase 1: Auth Integration (Start Here)
- Replace `AuthService` in `portal.js` to use `API.auth.login()`
- Update session storage to include auth tokens
- Test login/logout flows

### Phase 2: Read Operations
- Replace data fetching (e.g., `store.projects`) with API calls
- Keep write operations as mock for now
- Add loading states

### Phase 3: Write Operations
- Replace create/update methods with API calls
- Implement error handling
- Test full CRUD flows

### Phase 4: File Upload
- Implement PDF upload using `API.admin.uploadInvoicePDF()`
- Update invoice viewing to use real PDF URLs

## API Response Format

All API endpoints should return:

```json
{
  "success": true,
  "data": { ... }
}
```

Or for errors:

```json
{
  "success": false,
  "message": "Error message",
  "code": "ERROR_CODE"
}
```

## Error Handling

The API client automatically handles:
- Network errors
- Timeout errors (30s default)
- 401 Unauthorized (redirects to login)
- Token refresh (if implemented)

## Authentication

The API client automatically includes the auth token from localStorage in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are stored in localStorage under `portalSession.token`.

## Example Usage

### Customer fetching projects
```javascript
try {
  const projects = await API.customer.getProjects();
  // Use projects data
} catch (error) {
  console.error('Failed to fetch projects:', error.message);
  // Show error to user
}
```

### Admin creating invoice
```javascript
try {
  const invoice = await API.admin.createInvoice({
    customerId: 'cust-1',
    projectId: 'proj-1',
    amount: 5000.00,
    status: 'Pending',
    issuedAt: '2024-01-15',
    dueAt: '2024-02-15'
  });
  // Invoice created successfully
} catch (error) {
  console.error('Failed to create invoice:', error.message);
}
```

### Upload PDF
```javascript
const fileInput = document.getElementById('invoice-pdf');
const file = fileInput.files[0];

try {
  const result = await API.admin.uploadInvoicePDF('inv-123', file);
  // PDF uploaded, result.data contains the PDF URL
} catch (error) {
  console.error('Failed to upload PDF:', error.message);
}
```

## Next Steps

See `../PORTAL_BACKEND_TODO.md` for the complete backend integration checklist.
