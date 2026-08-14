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
    price: "",
    description: "",
    image: "",
  });
  const [nameEntries, setNameEntries] = useState([{ lang: "fr", name: "" }]);
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

  function resetForm() {
    setNewItem({ price: "", description: "", image: "" });
    setNameEntries([{ lang: "fr", name: "" }]);
    setEditingItemId(null);
    setEditingCategoryId(null);
  }

  function addNameEntry() {
    setNameEntries([...nameEntries, { lang: "", name: "" }]);
  }

  function removeNameEntry(index: number) {
    setNameEntries(nameEntries.filter((_, i) => i !== index));
  }

  function updateNameEntry(index: number, field: string, value: string) {
    const updated = [...nameEntries];
    updated[index] = { ...updated[index], [field]: value };
    setNameEntries(updated);
  }

  async function handleAddItem(categoryId: string) {
    if (!nameEntries[0]?.name || !newItem.price) return;
    const translations: Record<string, string> = {};
    nameEntries.forEach((entry) => {
      if (entry.lang && entry.name) translations[entry.lang] = entry.name;
    });
    await addItem({
      name: nameEntries[0].name,
      translations,
      price: parseFloat(newItem.price),
      description: newItem.description,
      image: newItem.image,
      categoryId,
      available: true,
    });
    resetForm();
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
      price: item.price?.toString() || "",
      description: item.description || "",
      image: item.image || "",
    });
    if (item.translations && Object.keys(item.translations).length > 0) {
      setNameEntries(
        Object.entries(item.translations).map(([lang, name]) => ({
          lang,
          name: name as string,
        }))
      );
    } else {
      setNameEntries([{ lang: "fr", name: item.name || "" }]);
    }
  }

  async function handleEditSave(categoryId: string) {
    if (!editingItemId || !nameEntries[0]?.name || !newItem.price) return;
    const translations: Record<string, string> = {};
    nameEntries.forEach((entry) => {
      if (entry.lang && entry.name) translations[entry.lang] = entry.name;
    });
    await updateItem(editingItemId, {
      name: nameEntries[0].name,
      translations,
      price: parseFloat(newItem.price),
      description: newItem.description,
      image: newItem.image,
    });
    resetForm();
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
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.name}
                              {item.translations &&
                                Object.keys(item.translations).length > 1 && (
                                  <span className="text-xs text-gray-400 ml-2">
                                    (
                                    {Object.keys(item.translations)
                                      .map((l) => l.toUpperCase())
                                      .join(", ")}
                                    )
                                  </span>
                                )}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-yeno-600">
                              {item.price} DH
                            </span>
                            <button
                              onClick={() => handleEditStart(item, cat.id)}
                              className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Modifier"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
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
                  <div className="space-y-2 mb-2">
                    {nameEntries.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <select
                          value={entry.lang}
                          onChange={(e) =>
                            updateNameEntry(index, "lang", e.target.value)
                          }
                          className="w-24 px-2 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-yeno-500"
                        >
                          <option value="fr">FR 🇫🇷</option>
                          <option value="ar">AR 🇲🇦</option>
                          <option value="en">EN 🇬🇧</option>
                          <option value="es">ES 🇪🇸</option>
                        </select>
                        <input
                          placeholder={`Nom du plat (${entry.lang.toUpperCase()})`}
                          value={entry.name}
                          onChange={(e) =>
                            updateNameEntry(index, "name", e.target.value)
                          }
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-yeno-500"
                        />
                        {nameEntries.length > 1 && (
                          <button
                            onClick={() => removeNameEntry(index)}
                            className="p-2 text-red-400 hover:text-red-600 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addNameEntry}
                      className="text-sm text-yeno-600 hover:text-yeno-700 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Ajouter une langue
                    </button>
                  </div>
                  <div className="flex items-end gap-2">
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
                          disabled={!nameEntries[0]?.name || !newItem.price}
                          className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition disabled:opacity-50"
                        >
                          Enregistrer
                        </button>
                        <button
                          onClick={resetForm}
                          className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-400 transition"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddItem(cat.id)}
                        disabled={!nameEntries[0]?.name || !newItem.price}
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
