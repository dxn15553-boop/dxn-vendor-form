import { supabase } from '../lib/supabaseClient';

/**
 * DXN VMS - Supabase Service Layer
 */

// --- FILE STORAGE ---
export const uploadVendorDocument = async (vendorId: string, file: File) => {
  const filePath = `vendors/${vendorId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from('vendor-documents')
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(error.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('vendor-documents')
    .getPublicUrl(filePath);

  return publicUrl;
};

// --- CMS / SITE CONTENT ---
export const saveSiteConfig = async (content: any) => {
  const { error } = await supabase
    .from('site_content')
    .upsert({ id: 'main_dxn_india', data: content });

  if (error) {
    console.error("Error saving site config:", error);
    throw new Error(error.message);
  }
};

export const getSiteConfig = async () => {
  const { data, error } = await supabase
    .from('site_content')
    .select('data')
    .eq('id', 'main_dxn_india')
    .single();

  if (error) {
    console.warn("Could not fetch site config from Supabase:", error);
    return null;
  }
  return data?.data || null;
};

// --- VENDOR MANAGEMENT ---
export const createVendorProfile = async (vendorData: any) => {
  const payload = {
    ...vendorData,
    status: 'pending',
    created_at: new Date().toISOString(),
    products: []
  };

  const { data, error } = await supabase
    .from('vendors')
    .insert([payload])
    .select('id')
    .single();

  if (error) {
    console.error("Error creating vendor profile:", error);
    throw new Error(error.message);
  }
  return data.id;
};

export const updateVendor = async (docId: string, data: any) => {
  const { error } = await supabase
    .from('vendors')
    .update(data)
    .eq('id', docId);

  if (error) {
    console.error("Error updating vendor:", error);
    throw new Error(error.message);
  }
};

export const getVendors = async () => {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn("Failed to fetch vendors:", error);
    return null;
  }
  return data;
};

export const updateVendorStatus = async (docId: string, status: string) => {
  const { error } = await supabase
    .from('vendors')
    .update({ status })
    .eq('id', docId);

  if (error) {
    console.error("Error updating vendor status:", error);
    throw new Error(error.message);
  }
};

export const getVendorDocuments = async (vendorId: string) => {
  const { data, error } = await supabase.storage
    .from('vendor-documents')
    .list(`vendors/${vendorId}`);

  if (error) {
    console.warn("Failed to fetch vendor documents:", error);
    return [];
  }

  return data.map((file) => {
    const { data: { publicUrl } } = supabase.storage
      .from('vendor-documents')
      .getPublicUrl(`vendors/${vendorId}/${file.name}`);
    return { name: file.name, url: publicUrl };
  });
};

// --- PRODUCT REVIEWS ---
export const getProductReviews = async (productName: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('productName', productName)
    .order('date', { ascending: false });

  if (error) {
    console.warn("Failed to fetch reviews:", error);
    return [];
  }
  return data;
};

export const addReview = async (productName: string, reviewData: any) => {
  const payload = {
    ...reviewData,
    productName,
    date: new Date().toISOString(), // Standardized date for Supabase
    verifiedPurchase: false,
    helpfulCount: 0
  };

  const { data, error } = await supabase
    .from('reviews')
    .insert([payload])
    .select('id')
    .single();

  if (error) {
    console.error("Error adding review:", error);
    throw new Error(error.message);
  }
  return data.id;
};

export const deleteReview = async (reviewId: string) => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId);

  if (error) {
    console.error("Error deleting review:", error);
    throw new Error(error.message);
  }
};
