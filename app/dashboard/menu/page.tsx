"use client";
import { Pencil, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import {
  getCategories,
  addCategory,
  deleteCategory,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} from "@/lib/firebase-utils";

export default function MenuPage() {
  const { userData } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (userData?.uid) {
      loadCategories();
    }
  }, [userData]);

  async function loadCategories() {
    try {
      if (!userData?.uid) return;
      const cats = await getCategories(userData.uid);
      const withItems = await Promise.all(
        cats.map(async (cat) => ({
          ...cat,
          items: await getItems(cat.id),
        }))
      );
      setCategories(withItems);
    } catch (err: any) {
      console.error(err);
      setError("Erreur chargement menu: " + (err.message || ""));
    }
  }

  async function handleAddCategory() {
    if (!newCatName.trim() || !userData?.uid) return;
    await addCategory({
      name: newCatName,
      restaurantId: userData.uid,
      order: categories.length,
    });
    setNewCatName("");
    loadCategories();
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Supprimer cette catégorie et tous ses plats ?")) return;
    await deleteCategory(id);
    loadCategories();
  }

  async function handleAddItem(categoryId: string) {
    if (!newItem.name || !newItem.price) return;
    await addItem({
      name: newItem.name,
      price: parseFloat(newItem.price),
      description: newItem.description,
      image: newItem.image,
      categoryId,
      available: true,
    });
    setNewItem({ name: "", price: "", description: "", image: "" });
    loadCategories();
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Supprimer ce plat ?")) return;
    await deleteItem(id);
    loadCategories();
  }

  function handleEditStart(item: any, categoryId: string) {
    setEditingItemId(item.id);
    setEditingCategoryId(categoryId);
    setNewItem({
      name: item.name,
      price: item.price.toString(),
      description: item.description || "",
      image: item.image || "",
    });
  }

  function handleEditCancel() {
    setEditingItemId(null);
    setEditingCategoryId(null);
    setNewItem({ name: "", price: "", description: "", image: "" });
  }

  async function handleEditSave(categoryId: string) {
    if (!editingItemId || !newItem.name || !newItem.price) return;
    await updateItem(editingItemId, {
      name: newItem.name,
      price: parseFloat(newItem.price),
      description: newItem.description,
      image: newItem.image,
    });
    setEditingItemId(null);
    setEditingCategoryId(null);
    setNewItem({ name: "", price: "", description: "", image: "" });
    loadCategories();
  }

  if (!userData) return <div className="p-8">Chargement...</div>;

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Mon Menu</h1>
        <div className="flex items-center gap-2">
          <input
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Nouvelle catégorie..."
            className="px-4 py-2 rounded-xl border border-gray-200 focus:border-yeno-500 outline-none"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 rounded-xl bg-yeno-500 text-white font-medium hover:bg-yeno-600 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
            >
              <div className="flex items-center gap-3">
                {expanded === cat.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <span className="text-sm text-gray-400">
                  ({cat.items?.length || 0} plats)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(cat.id);
                }}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {expanded === cat.id && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                <div className="space-y-3 mb-4">
                  {cat.items?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-50"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-yeno-600">
                              {item.price} DH
                            </span>
                            {/* ✏️ BOUTON CRAYON */}
                            <button
                              onClick={() => handleEditStart(item, cat.id)}
                              className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Modifier"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            {/* 🗑️ BOUTON POUBELLE */}
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 p-3 rounded-xl bg-yeno-50">
                  <div className="flex items-end gap-2">
                    <input
                      placeholder="Nom du plat"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-yeno-500"
                    />
                    <input
                      placeholder="Prix (DH)"
                      type="number"
                      value={newItem.price}
                      onChange={(e) =>
                        setNewItem({ ...newItem, price: e.target.value })
                      }
                      className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-yeno-500"
                    />
                  </div>
                  <input
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-yeno-500"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="Lien de la photo (URL)"
                      value={newItem.image}
                      onChange={(e) =>
                        setNewItem({ ...newItem, image: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-yeno-500"
                    />
                    {newItem.image && (
                      <img
                        src={newItem.image}
                        alt="Preview"
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                    )}
                    {editingCategoryId === cat.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSave(cat.id)}
                          disabled={!newItem.name || !newItem.price}
                          className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition disabled:opacity-50"
                        >
                          Enregistrer
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-400 transition"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddItem(cat.id)}
                        disabled={!newItem.name || !newItem.price}
                        className="px-4 py-2 rounded-lg bg-yeno-500 text-white text-sm font-medium hover:bg-yeno-600 transition disabled:opacity-50"
                      >
                        Ajouter le plat
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {categories.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">
              Aucune catégorie. Ajoutez votre première catégorie ci-dessus.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
