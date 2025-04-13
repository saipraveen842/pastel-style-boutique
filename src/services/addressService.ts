
import { supabase } from "@/integrations/supabase/client";
import { Address } from "@/types/supabase";

export const addressService = {
  async getUserAddresses(): Promise<Address[]> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.user.id);
    
    if (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async getAddressById(addressId: string): Promise<Address | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', addressId)
      .eq('user_id', user.user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
    
    return data;
  },
  
  async createAddress(address: Omit<Address, "id" | "created_at" | "updated_at" | "user_id">): Promise<Address | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('addresses')
      .insert({
        ...address,
        user_id: user.user.id
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating address:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateAddress(addressId: string, address: Partial<Address>): Promise<Address | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('addresses')
      .update(address)
      .eq('id', addressId)
      .eq('user_id', user.user.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating address:', error);
      throw error;
    }
    
    return data;
  },
  
  async deleteAddress(addressId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return;
    }
    
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.user.id);
    
    if (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  },
  
  async setDefaultAddress(addressId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return;
    }
    
    // First, unset any current default
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.user.id);
    
    // Then set the new default
    const { error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', addressId)
      .eq('user_id', user.user.id);
    
    if (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  }
};
