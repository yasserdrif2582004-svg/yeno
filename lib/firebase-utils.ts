import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Récupère les données d'un utilisateur depuis Firestore
 * @param {string} uid - L'UID de l'utilisateur Firebase
 * @returns {Promise<object|null>} - Les données utilisateur ou null
 */
export async function getUserData(uid) {
  if (!uid) return null;

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn("Aucune donnée utilisateur trouvée pour UID:", uid);
      return null;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur:",
      error
    );
    return null;
  }
}
