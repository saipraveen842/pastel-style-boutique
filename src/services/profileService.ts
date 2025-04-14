
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/supabase";

export const profileService = {
  async getProfile(): Promise<Profile | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateProfile(profile: Partial<Profile>): Promise<Profile | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.user.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    
    return data;
  },
  
  async createProfileIfNotExists(userData: { firstName?: string; lastName?: string; email: string }): Promise<Profile | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return null;
    }
    
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .maybeSingle();
    
    if (existingProfile) {
      return existingProfile;
    }
    
    // Create new profile if it doesn't exist
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: user.user.id,
        first_name: userData.firstName || null,
        last_name: userData.lastName || null,
        email: userData.email
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
    
    return data;
  }
};
