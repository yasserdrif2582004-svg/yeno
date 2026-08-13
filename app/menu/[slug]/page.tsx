import {
  getRestaurantBySlug,
  getCategories,
  getItems,
} from "@/lib/firebase-utils";
import PublicMenuContent from "@/components/templates/PublicMenuContent";

export default async function PublicMenuPage({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await getRestaurantBySlug(params.slug);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Restaurant non trouvé
          </h1>
          <p className="text-gray-500">
            Ce menu n'existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }

  const categories = await getCategories(restaurant.id);
  const categoriesWithItems = await Promise.all(
    categories.map(async (cat: any) => {
      const items = await getItems(cat.id);
      return { ...cat, items };
    })
  );

  return (
    <PublicMenuContent
      restaurant={restaurant}
      categoriesWithItems={categoriesWithItems}
    />
  );
}
