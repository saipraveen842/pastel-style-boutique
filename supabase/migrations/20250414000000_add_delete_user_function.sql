
-- Create a function to allow users to delete themselves
CREATE OR REPLACE FUNCTION public.delete_user()
RETURNS void AS $$
BEGIN
  -- Delete the user from auth.users which will cascade to profiles
  -- and all related data due to foreign key constraints
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
