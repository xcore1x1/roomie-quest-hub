-- Make shubhamydv61@gmail.com an admin
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = '57b8a7f4-bbc5-4f32-bd83-983c4b7a7be0';

-- Drop the existing update policy
DROP POLICY IF EXISTS "Owners can update their own hostels" ON public.hostels;

-- Create a new update policy that allows owners to update their hostels BUT NOT the verified field
-- We'll use a trigger to enforce this
CREATE POLICY "Owners can update their own hostels except verified" 
ON public.hostels 
FOR UPDATE 
USING ((auth.uid() = owner_id) OR has_role(auth.uid(), 'admin'::app_role));

-- Create a trigger function to prevent owners from changing verified field
CREATE OR REPLACE FUNCTION public.prevent_owner_verify_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If the verified field is being changed
  IF OLD.verified IS DISTINCT FROM NEW.verified THEN
    -- Only allow if user is admin
    IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
      -- Revert the verified field to its original value
      NEW.verified := OLD.verified;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS enforce_admin_verify ON public.hostels;
CREATE TRIGGER enforce_admin_verify
BEFORE UPDATE ON public.hostels
FOR EACH ROW
EXECUTE FUNCTION public.prevent_owner_verify_change();