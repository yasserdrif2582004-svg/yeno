import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── UTILISATEUR ───────────────────────────────────────────

export async function getUserData(uid) {
  if (!uid) return null;
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  } catch (error) {
    console.error("Erreur getUserData:", error);
    return null;
  }
}

// ─── CATÉGORIES ─────────────────────────────────────────────

export async function getCategories(restaurantId) {
  if (!restaurantId) return [];
  try {
    const q = query(
      collection(db, "categories"),
      where("restaurantId", "==", restaurantId),
      orderBy("order", "asc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Erreur getCategories:", error);
    return [];
  }
}

export async function addCategory(data) {
  return await addDoc(collection(db, "categories"), data);
}

export async function deleteCategory(id) {
  return await deleteDoc(doc(db, "categories", id));
}

// ─── PLATS (ITEMS) ─────────────────────────────────────────

export async function getItems(categoryId) {
  if (!categoryId) return [];
  try {
    const q = query(
      collection(db, "items"),
      where("categoryId", "==", categoryId),
      orderBy("name", "asc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Erreur getItems:", error);
    return [];
  }
}

export async function addItem(data) {
  return await addDoc(collection(db, "items"), data);
}

export async function deleteItem(id) {
  return await deleteDoc(doc(db, "items", id));
}

export async function updateItem(id, data) {
  return await updateDoc(doc(db, "items", id), data);
}
