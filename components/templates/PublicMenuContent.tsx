"use client";

import { useState } from "react";
import { MenuTemplate } from "@/components/templates";

export default function PublicMenuContent({
  restaurant,
  categoriesWithItems,
  template,
}: any) {
  const [lang, setLang] = useState("fr");

  const langs = restaurant?.languages?.split(",") || ["fr"];
  const showLangSwitcher = langs.length > 1;

  return (
    <MenuTemplate
      restaurant={restaurant}
      categoriesWithItems={categoriesWithItems || []}
      lang={lang}
      setLang={setLang}
      showLangSwitcher={showLangSwitcher}
      langs={langs}
      template={template || "modern"}
    />
  );
}
