# Supabase Storage Setup for Invoice PDFs

This guide explains how to set up Supabase Storage for storing invoice PDF files.

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **New Bucket**
5. Configure the bucket:
   - **Name**: `invoices` (must match the bucket name used in code)
   - **Public bucket**: ✅ **Unchecked** (private bucket for security)
   - **File size limit**: Set according to your needs (e.g., 10MB)
   - **Allowed MIME types**: `application/pdf` (optional, for extra security)
6. Click **Create bucket**

## Step 2: Set Up Storage Policies (RLS)

Storage buckets use Row Level Security (RLS) policies. You need to create policies that allow:

1. **Admins can upload files** - For creating invoices with PDFs
2. **Customers can download their invoice PDFs** - For viewing invoices
3. **Admins can download all invoice PDFs** - For viewing any invoice

### Using SQL Editor:

Run this SQL in your Supabase SQL Editor:

```sql
-- Policy: Admins can upload invoice PDFs
CREATE POLICY "Admins can upload invoice PDFs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'invoices' AND
  (SELECT auth.jwt() ->> 'role') = 'admin'
);

-- Policy: Admins can read all invoice PDFs
CREATE POLICY "Admins can read all invoice PDFs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'invoices' AND
  (SELECT auth.jwt() ->> 'role') = 'admin'
);

-- Policy: Customers can read their own invoice PDFs
-- This checks if the invoice belongs to the customer
CREATE POLICY "Customers can read their own invoice PDFs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'invoices' AND
  (SELECT auth.jwt() ->> 'role') = 'customer' AND
  -- Extract invoice ID from file path: invoices/invoice-{id}-{timestamp}.pdf
  EXISTS (
    SELECT 1 FROM invoices
    WHERE invoices.id::text = (storage.foldername(name))[2]
    AND invoices.customer_id = (SELECT auth.uid()::text)::uuid
  )
);
```

**Note**: The customer policy above is simplified. For a more robust implementation, you may need to:
- Store the invoice ID in the file metadata
- Use a mapping table between file paths and invoice IDs
- Or use a simpler approach: allow customers to read files, but control access at the API level

### Alternative: Public Read Access (Simpler, but less secure)

If you want customers to access PDFs via direct URLs (less secure but simpler):

```sql
-- Make the bucket public read
-- Then in Storage settings, enable "Public bucket"

-- Only admins can upload
CREATE POLICY "Admins can upload invoice PDFs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'invoices' AND
  (SELECT auth.jwt() ->> 'role') = 'admin'
);
```

## Step 3: Verify Setup

After creating the bucket and policies:

1. Try uploading a test PDF through the admin invoice creation form
2. Check that the file appears in the Storage → invoices bucket
3. Verify that the invoice record has the correct `pdf_url` in the database

## Troubleshooting

### Error: "Bucket not found"
- Make sure the bucket name is exactly `invoices` (case-sensitive)
- Check that the bucket was created successfully in the Storage dashboard

### Error: "New row violates row-level security policy"
- Verify that the storage policies were created correctly
- Check that the user's role is set correctly in their auth metadata
- For customers, ensure the invoice belongs to them

### Files not accessible
- Check if the bucket is public or private
- Verify the storage policies allow the required operations
- Check the `pdf_url` in the database matches the actual file path

## Security Notes

- **Private buckets** are more secure but require signed URLs for access
- **Public buckets** are simpler but anyone with the URL can access the file
- Consider using **signed URLs** with expiration for private buckets (not implemented in current code)
- File names include timestamps to prevent conflicts and overwrites
