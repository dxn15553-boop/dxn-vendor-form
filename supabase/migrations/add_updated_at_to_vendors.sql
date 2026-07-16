-- ============================================================
-- Migration: Add updated_at column + auto-update trigger
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Add updated_at column
ALTER TABLE vendors
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- 2. Set existing rows to have updated_at = created_at
UPDATE vendors SET updated_at = created_at WHERE updated_at IS NULL;

-- 3. Create a trigger function that auto-updates updated_at on every UPDATE
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Attach the trigger to the vendors table
DROP TRIGGER IF EXISTS vendors_set_updated_at ON vendors;
CREATE TRIGGER vendors_set_updated_at
  BEFORE UPDATE ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
