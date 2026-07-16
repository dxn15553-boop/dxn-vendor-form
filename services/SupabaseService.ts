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

export const getVendorById = async (id: string | number) => {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Failed to fetch vendor by ID:", error);
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

export const updateVendorApplication = async (vendorId: string | number, vendorData: Record<string, any>) => {
  const { error } = await supabase
    .from('vendors')
    .update(vendorData)
    .eq('id', vendorId);

  if (error) {
    console.error("Error updating vendor application:", error);
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

export const getVendorsFiltered = async (filters: {
  search?: string;
  activity?: string[];
  categories?: string[];
  status?: string[];
}) => {
  let query = supabase.from('vendors').select('*');
  if (filters.search) {
    // using or to search multiple fields
    query = query.or(`company_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,pan_number.ilike.%${filters.search}%,gst_number.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`);
  }
  if (filters.activity && filters.activity.length > 0) {
    // In a real scenario, this might be more complex. We map activity to status for now if needed, or handle custom logic.
    // For now we will rely on status if activity is just status chips. 
    // If activity means 'registered_today' we would need custom date filters.
    // Assuming status handles it for now or we filter in memory.
  }
  if (filters.status && filters.status.length > 0) {
    query = query.in('status', filters.status);
  }
  if (filters.categories && filters.categories.length > 0) {
    query = query.contains('category_list', filters.categories);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) {
    console.warn('Vendor filter error', error);
    return [];
  }
  return data;
};

export const saveAdminView = async (adminId: string, name: string, filters: any) => {
  const { error } = await supabase.from('saved_views').insert({
    admin_id: adminId,
    name,
    filters,
  });
  if (error) throw new Error(error.message);
};

export const getSavedViews = async (adminId: string) => {
  const { data, error } = await supabase
    .from('saved_views')
    .select('*')
    .eq('admin_id', adminId)
    .order('created_at', { ascending: false });
  if (error) {
    console.warn(error);
    return [];
  }
  return data;
};

export const batchUpdateStatus = async (ids: number[], newStatus: string) => {
  const { error } = await supabase.rpc('batch_update_status', {
    ids,
    new_status: newStatus,
  });
  if (error) throw new Error(error.message);
};

export const exportVendorsCsv = async (ids: number[]) => {
  const { data, error } = await supabase.from('vendors').select('*').in('id', ids);
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]).filter(key => key !== 'pan_numbet');
  const csvRows = [headers.join(',')];
  
  for (const row of data) {
    const values = headers.map(header => {
      let val = row[header];
      if (val === null || val === undefined) val = '';
      if (typeof val === 'object') val = JSON.stringify(val);
      val = String(val).replace(/"/g, '""');
      return `"${val}"`;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
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
    console.error("Error adding review — code:", error.code, "| message:", error.message, "| details:", error.details, "| hint:", error.hint);
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
