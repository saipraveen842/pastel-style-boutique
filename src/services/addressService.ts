
import { supabase } from "@/integrations/supabase/client";
import { Address } from "@/types/supabase";

export const addressService = {
  async getAddresses(): Promise<Address[]> {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .order('is_default', { ascending: false });
    
    if (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async getAddressById(id: string): Promise<Address | null> {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching address with id ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async getDefaultAddress(): Promise<Address | null> {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('is_default', true)
      .limit(1)
      .single();
    
    if (error) {
      // If no default address is found, return null without throwing an error
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching default address:', error);
      throw error;
    }
    
    return data;
  },
  
  async createAddress(address: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Address> {
    const { data, error } = await supabase
      .from('addresses')
      .insert(address)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating address:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
    const { data, error } = await supabase
      .from('addresses')
      .update(address)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating address with id ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async deleteAddress(id: string): Promise<void> {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting address with id ${id}:`, error);
      throw error;
    }
  },
  
  async setDefaultAddress(id: string): Promise<void> {
    // First, set all addresses to non-default
    const { error: updateError } = await supabase
      .from('addresses')
      .update({ is_default: false })
      .not('id', 'eq', id);
    
    if (updateError) {
      console.error('Error resetting default addresses:', updateError);
      throw updateError;
    }
    
    // Then set the selected address as default
    const { error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', id);
    
    if (error) {
      console.error(`Error setting address ${id} as default:`, error);
      throw error;
    }
  }
};
