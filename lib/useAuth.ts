"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import { getUserData } from "./firebase-utils";
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) { const data = await getUserData(u.uid); setUserData(data); }
      else { setUserData(null); }
      setLoading(false);
    });
    return () => unsub();
  }, []);
  return { user, userData, loading };
}
