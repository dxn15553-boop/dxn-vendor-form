
/**
 * DXN VMS - Firebase Service Layer
 * -----------------------------------------
 * INSTRUCTIONS: 
 * 1. Go to Firebase Console > Project Settings.
 * 2. Copy your SDK config and replace the placeholders below.
 */

// Since we are in a browser environment, we import from esm.sh
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, query, where, getDoc, orderBy, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDyPjDaP-uzmSD7PEwsf5LMJeFJf6-3iI",
  authDomain: "dxn-vms.firebaseapp.com",
  projectId: "dxn-vms",
  storageBucket: "dxn-vms.firebasestorage.app",
  messagingSenderId: "717254273542",
  appId: "1:717254273542:web:f14bf55ea2eeef5abc3187"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.warn("Firebase config missing. Running in Simulation Mode.");
}

export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export const auth = app ? getAuth(app) : null;

// --- FILE STORAGE ---
export const uploadVendorDocument = async (vendorId: string, file: File) => {
  if (!storage) throw new Error("Firebase Storage not initialized");
  const storageRef = ref(storage, `vendors/${vendorId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

// --- CMS / SITE CONTENT ---

// Save the entire site configuration to a single document
export const saveSiteConfig = async (content: any) => {
  if (!db) throw new Error("Firestore not initialized");
  // We use a specific collection 'site_content' and doc 'main_dxn_india'
  await setDoc(doc(db, "site_content", "main_dxn_india"), content, { merge: true });
};

// Get the site configuration
export const getSiteConfig = async () => {
  if (!db) return null;
  const docRef = doc(db, "site_content", "main_dxn_india");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};


// --- VENDOR MANAGEMENT ---

export const createVendorProfile = async (vendorData: any) => {
  if (!db) throw new Error("Firestore not initialized");
  // Add to 'vendors' collection
  const docRef = await addDoc(collection(db, "vendors"), {
    ...vendorData,
    status: 'pending',
    createdAt: Date.now(),
    products: []
  });
  return docRef.id;
};

export const updateVendor = async (docId: string, data: any) => {
  if (!db) throw new Error("Firestore not initialized");
  const vendorRef = doc(db, "vendors", docId);
  await updateDoc(vendorRef, data);
};

export const getVendors = async () => {
  if (!db) return null;

  try {
    const q = query(collection(db, "vendors"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (e: any) {
    console.warn("Firestore sort failed (likely missing index), falling back to basic fetch", e);
    try {
      const q = collection(db, "vendors");
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      return docs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (innerError) {
      console.error("Critical Firebase Failure", innerError);
      return null;
    }
  }
};

export const updateVendorStatus = async (docId: string, status: string) => {
  if (!db) throw new Error("Firestore not initialized");
  const vendorRef = doc(db, "vendors", docId);
  await updateDoc(vendorRef, {
    status: status
  });
};
// --- PRODUCT REVIEWS ---

// Fetch reviews for a specific product
export const getProductReviews = async (productName: string) => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, "reviews"),
      where("productName", "==", productName),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (e) {
    console.warn("Failed to fetch reviews", e);
    // Fallback if missing Firestore index
    const fallbackQ = query(collection(db, "reviews"), where("productName", "==", productName));
    const querySnapshot = await getDocs(fallbackQ);
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
    return docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
};

// Save a new review
export const addReview = async (productName: string, reviewData: any) => {
  if (!db) throw new Error("Firestore not initialized");
  const docRef = await addDoc(collection(db, "reviews"), {
    ...reviewData,
    productName,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    verifiedPurchase: false, // Defaulting to false since they aren't logged in
    helpfulCount: 0
  });
  return docRef.id;
};
