
import { supabase } from "@/integrations/supabase/client";
import { Address } from "@/types/supabase";
import { useAuth } from "@/hooks/useAuth";

export const addressService = {
  // Get all addresses for the current user
  async getUserAddresses(): Promise<Address[]> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get a single address by ID
  async getAddressById(addressId: string): Promise<Address> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('Not authenticated');
    }
    
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', addressId)
      .eq('user_id', user.user.id)
      .single();
    
    if (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new address for the current user
  async createAddress(address: Omit<Address, "id" | "created_at" | "updated_at" | "user_id">): Promise<Address> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('Not authenticated');
    }
    
    // If this is set as default, unset any existing default
    if (address.is_default) {
      await this.clearDefaultAddresses();
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
  
  // Update an existing address
  async updateAddress(addressId: string, address: Partial<Address>): Promise<Address> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('Not authenticated');
    }
    
    // If this is set as default, unset any existing default
    if (address.is_default) {
      await this.clearDefaultAddresses();
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
  
  // Delete an address
  async deleteAddress(addressId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('Not authenticated');
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
  
  // Set an address as the default
  async setDefaultAddress(addressId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('Not authenticated');
    }
    
    // First, clear any existing default addresses
    await this.clearDefaultAddresses();
    
    // Then set this address as default
    const { error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', addressId)
      .eq('user_id', user.user.id);
    
    if (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  },
  
  // Helper to clear all default addresses
  private async clearDefaultAddresses(): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return;
    }
    
    const { error } = await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.user.id)
      .eq('is_default', true);
    
    if (error) {
      console.error('Error clearing default addresses:', error);
      throw error;
    }
  }
};
