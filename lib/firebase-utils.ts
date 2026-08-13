import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./firebase";
import { PLANS } from "@/types";

const PLAN_LIMITS: Record<string, number> = {
  standard: 10,
  premium: 20,
  pro: 9999,
};

export async function registerUser(
  name: string,
  email: string,
  password: string,
  planId: string
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 1);
  const plan = PLANS.find((p) => p.id === planId) || PLANS[0];
  await setDoc(doc(db, "users", uid), {
    uid,
    name,
    email,
    role: "client",
    plan: planId,
    planExpiry: Timestamp.fromDate(expiry),
    changesUsed: 0,
    changesLimit: PLAN_LIMITS[planId] || 10,
    languages: planId === "pro" ? "fr|en|es" : "fr",
    createdAt: serverTimestamp(),
  });
  await setDoc(doc(db, "restaurants", uid), {
    uid,
    name: name ? `${name}'s Restaurant` : "Mon Restaurant",
    slug: `restaurant-${uid.slice(-6)}`,
    description: "",
    logo: "",
    phone: "",
    address: "",
    template: "modern",
    primaryColor: "#22c55e",
    accentColor: "#16a34a",
    userId: uid,
    createdAt: serverTimestamp(),
  });
  return cred.user;
}

export async function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return signOut(auth);
}

export async function getUserData(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return { uid, ...snap.data() };
}

export async function getRestaurant(userId: string) {
  const snap = await getDoc(doc(db, "restaurants", userId));
  if (!snap.exists()) return null;
  return snap.data();
}

export async function getRestaurantBySlug(slug: string) {
  const q = query(collection(db, "restaurants"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

export async function updateRestaurant(userId: string, data: any) {
  await setDoc(
    doc(db, "restaurants", userId),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

// ─── CATEGORIES ──────────────────────────────────────────────

export async function getCategories(restaurantId: string) {
  if (!restaurantId) return [];
  const q = query(
    collection(db, "categories"),
    where("restaurantId", "==", restaurantId),
    orderBy("order")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addCategory(data: {
  name: string;
  restaurantId: string;
  order: number;
}) {
  const ref = await addDoc(collection(db, "categories"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCategory(id: string, data: any) {
  await updateDoc(doc(db, "categories", id), data);
}

export async function deleteCategory(id: string) {
  await deleteDoc(doc(db, "categories", id));
}

// ─── ITEMS ───────────────────────────────────────────────────

export async function getItems(categoryId: string) {
  if (!categoryId) return [];
  const q = query(
    collection(db, "items"),
    where("categoryId", "==", categoryId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addItem(data: any) {
  const ref = await addDoc(collection(db, "items"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateItem(id: string, data: any) {
  await updateDoc(doc(db, "items", id), data);
}

export async function deleteItem(id: string) {
  await deleteDoc(doc(db, "items", id));
}

// ─── IMAGES ──────────────────────────────────────────────────

export async function uploadImage(file: File, path: string) {
  const cloudName = "qdholgwh";
  const uploadPreset = "MENU_UPLOADS";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "yeno-menus");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Erreur upload image");

  const data = await res.json();
  return data.secure_url;
}

// ─── CHANGE REQUESTS ─────────────────────────────────────────

export async function createChangeRequest(data: any) {
  const ref = await addDoc(collection(db, "changeRequests"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getChangeRequests(userId?: string) {
  let q;
  if (userId) {
    q = query(
      collection(db, "changeRequests"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
  } else {
    q = query(collection(db, "changeRequests"), orderBy("createdAt", "desc"));
  }
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateChangeRequest(id: string, status: string) {
  await updateDoc(doc(db, "changeRequests", id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

// ─── ADMIN ───────────────────────────────────────────────────

export async function getAllClients() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
}

export function getCurrentUser(): Promise<FirebaseUser | null> {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}
