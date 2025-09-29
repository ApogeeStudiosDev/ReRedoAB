import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useAdminActivity = () => {
  const { user } = useAuth();

  const logActivity = async (
    actionType: string,
    entityType: string,
    entityId?: string,
    description?: string,
    oldValues?: any,
    newValues?: any
  ) => {
    if (!user) return;

    try {
      await supabase.rpc('log_admin_activity', {
        p_admin_user_id: user.id,
        p_action_type: actionType,
        p_entity_type: entityType,
        p_entity_id: entityId || null,
        p_old_values: oldValues || null,
        p_new_values: newValues || null,
        p_description: description || null
      });
    } catch (error) {
      console.error('Failed to log admin activity:', error);
    }
  };

  return { logActivity };
};