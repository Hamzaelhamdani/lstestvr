const user = supabase.auth.getUser();
const role = Array.isArray(user.user_metadata.role)
  ? user.user_metadata.role[0]
  : user.user_metadata.role;