"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Utensils } from "lucide-react";

const templates: Record<string, any> = {
  // ═══ 1. MODERN ═══
  modern: {
    name: "Modern",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 pb-20">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center py-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-20 h-20 mx-auto bg-gradient-to-tr from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl mb-4"
            >
              {restaurant.name?.[0]}
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">
              {restaurant.name}
            </h1>
            <p className="text-gray-500 mt-1">{restaurant.description}</p>
          </div>

          {showLangSwitcher && (
            <div className="flex justify-center gap-2 mb-6">
              {langs.map((l: string) => (
                <motion.button
                  key={l}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                    lang === l
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-600 border"
                  }`}
                >
                  {l.toUpperCase()}
                </motion.button>
              ))}
            </div>
          )}

          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-green-500" />
                {cat.name}
              </h2>
              <div className="space-y-3">
                {cat.items?.map((item: any) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        className="w-20 h-20 rounded-xl object-cover"
                        alt=""
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <span className="font-bold text-green-600">
                          {item.price} DH
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    ),
  },

  // ═══ 2. GLASS ═══
  glass: {
    name: "Glass",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center text-white text-3xl font-bold border border-white/30 shadow-2xl mb-4">
              {restaurant.name?.[0]}
            </div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              {restaurant.name}
            </h1>
            <p className="text-white/80 mt-2">{restaurant.description}</p>
          </motion.div>

          {showLangSwitcher && (
            <div className="flex justify-center gap-2 mb-6">
              {langs.map((l: string) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md ${
                    lang === l
                      ? "bg-white text-purple-600"
                      : "bg-white/20 text-white border border-white/30"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="mb-6"
            >
              <h2 className="text-white font-bold text-lg mb-3 ml-1">
                {cat.name}
              </h2>
              <div className="space-y-3">
                {cat.items?.map((item: any) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl flex gap-4"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        className="w-16 h-16 rounded-xl object-cover border border-white/30"
                        alt=""
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <span className="font-bold text-yellow-300">
                          {item.price} DH
                        </span>
                      </div>
                      <p className="text-sm text-white/70 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 3. DARK ═══
  dark: {
    name: "Dark",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-black text-white p-4 pb-20">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center py-10"
          >
            <div className="w-20 h-20 mx-auto bg-lime-400 rounded-full flex items-center justify-center text-black text-2xl font-black mb-4 shadow-[0_0_40px_rgba(163,230,53,0.4)]">
              {restaurant.name?.[0]}
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-gray-400 mt-2 uppercase tracking-widest text-xs">
              {restaurant.description}
            </p>
          </motion.div>

          {showLangSwitcher && (
            <div className="flex justify-center gap-2 mb-8">
              {langs.map((l: string) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 rounded-none text-sm font-bold border ${
                    lang === l
                      ? "bg-lime-400 text-black border-lime-400"
                      : "bg-transparent text-gray-400 border-gray-700"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {categories.map((cat: any, i: number) => (
            <div key={cat.id} className="mb-10">
              <h2 className="text-lime-400 font-black text-sm uppercase tracking-[0.2em] mb-4 border-b border-gray-800 pb-2">
                {cat.name}
              </h2>
              <div className="space-y-4">
                {cat.items?.map((item: any, idx: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex justify-between items-start py-3 border-b border-gray-900 hover:border-lime-400/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-lg group-hover:text-lime-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-mono font-bold text-lime-400 text-lg">
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 4. NEON ═══
  neon: {
    name: "Néon",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-[#050505] p-4 pb-20 overflow-hidden">
        <div className="max-w-md mx-auto relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-[100px]" />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-10 relative z-10"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px #00ff88",
                  "0 0 60px #00ff88",
                  "0 0 20px #00ff88",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto bg-black border-2 border-[#00ff88] rounded-xl flex items-center justify-center text-[#00ff88] text-2xl font-bold mb-4"
            >
              {restaurant.name?.[0]}
            </motion.div>
            <h1 className="text-3xl font-bold text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">
              {restaurant.name}
            </h1>
          </motion.div>

          {categories.map((cat: any) => (
            <div key={cat.id} className="mb-8 relative z-10">
              <h2
                className="text-[#ff00ff] font-bold text-lg mb-4 uppercase tracking-wider"
                style={{ textShadow: "0 0 10px #ff00ff" }}
              >
                ■ {cat.name}
              </h2>
              <div className="space-y-3">
                {cat.items?.map((item: any) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/50 border border-[#00ff88]/30 rounded-lg p-4 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white">{item.name}</h3>
                      <span className="font-mono text-[#00ff88] font-bold">
                        {item.price} DH
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 5. PASTEL ═══
  pastel: {
    name: "Pastel",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full flex items-center justify-center text-purple-600 text-3xl font-bold shadow-lg mb-4">
              {restaurant.name?.[0]}
            </div>
            <h1 className="text-3xl font-bold text-purple-800">
              {restaurant.name}
            </h1>
            <p className="text-purple-400 mt-1">{restaurant.description}</p>
          </motion.div>

          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="mb-8"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-purple-100">
                <h2 className="text-purple-600 font-bold text-lg mb-4 text-center">
                  ✦ {cat.name} ✦
                </h2>
                <div className="space-y-4">
                  {cat.items?.map((item: any) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.03, rotate: -1 }}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-purple-50 flex gap-3"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          className="w-16 h-16 rounded-2xl object-cover"
                          alt=""
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-800">
                            {item.name}
                          </h3>
                          <span className="font-bold text-pink-500 bg-pink-50 px-2 py-1 rounded-full text-sm">
                            {item.price} DH
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 6. MINIMAL ═══
  minimal: {
    name: "Minimal",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-white p-6 pb-20">
        <div className="max-w-md mx-auto">
          <div className="py-12 border-b border-black mb-8">
            <h1 className="text-5xl font-light tracking-tight text-black">
              {restaurant.name}
            </h1>
            <p className="text-gray-400 mt-2 text-sm tracking-wide uppercase">
              {restaurant.description}
            </p>
          </div>

          {categories.map((cat: any) => (
            <div key={cat.id} className="mb-12">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
                {cat.name}
              </h2>
              <div className="space-y-6">
                {cat.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-baseline group cursor-pointer"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-black group-hover:text-gray-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-4 flex items-baseline gap-2">
                      <div className="border-b border-dotted border-gray-300 w-8" />
                      <span className="font-light text-lg">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 7. ELEGANT ═══
  elegant: {
    name: "Élégant",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-stone-950 text-stone-100 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center py-12 border-b border-yellow-600/30"
          >
            <div className="w-16 h-16 mx-auto border-2 border-yellow-600 rounded-none flex items-center justify-center text-yellow-500 text-2xl font-serif mb-6">
              {restaurant.name?.[0]}
            </div>
            <h1 className="text-4xl font-serif text-yellow-500 tracking-wide">
              {restaurant.name}
            </h1>
            <div className="w-16 h-px bg-yellow-600/50 mx-auto mt-4" />
            <p className="text-stone-400 mt-4 italic font-serif">
              {restaurant.description}
            </p>
          </motion.div>

          {categories.map((cat: any, i: number) => (
            <div key={cat.id} className="mb-10 mt-8">
              <h2 className="text-yellow-600 font-serif text-xl mb-6 text-center italic">
                — {cat.name} —
              </h2>
              <div className="space-y-6">
                {cat.items?.map((item: any, idx: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex gap-4 pb-6 border-b border-stone-800"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        className="w-24 h-24 object-cover border border-yellow-600/30"
                        alt=""
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg text-stone-100">
                          {item.name}
                        </h3>
                        <span className="font-serif text-yellow-500 text-lg">
                          {item.price} DH
                        </span>
                      </div>
                      <p className="text-sm text-stone-500 mt-2 font-serif italic">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 8. CAFE ═══
  cafe: {
    name: "Café",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-[#fff7ed] p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto bg-[#92400e] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4">
              ☕
            </div>
            <h1 className="text-3xl font-bold text-[#78350f]">
              {restaurant.name}
            </h1>
            <p className="text-[#92400e] mt-1">{restaurant.description}</p>
          </div>

          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-6"
            >
              <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-[#fed7aa]">
                <h2 className="text-[#c2410c] font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ea580c] rounded-full" />
                  {cat.name}
                </h2>
                <div className="space-y-3">
                  {cat.items?.map((item: any) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-[#fff7ed] rounded-2xl p-3 flex gap-3"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          className="w-14 h-14 rounded-xl object-cover"
                          alt=""
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-[#78350f]">
                            {item.name}
                          </h3>
                          <span className="font-bold text-[#ea580c]">
                            {item.price} DH
                          </span>
                        </div>
                        <p className="text-xs text-[#92400e] mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 9. OCEAN ═══
  ocean: {
    name: "Océan",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4">
              🌊
            </div>
            <h1 className="text-3xl font-bold text-cyan-800">
              {restaurant.name}
            </h1>
          </motion.div>

          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="mb-6"
            >
              <h2 className="text-cyan-700 font-bold text-lg mb-3">
                {cat.name}
              </h2>
              <div className="space-y-3">
                {cat.items?.map((item: any) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-cyan-100 flex gap-4"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-200"
                        alt=""
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-cyan-900">{item.name}</h3>
                        <span className="font-bold text-blue-500">
                          {item.price} DH
                        </span>
                      </div>
                      <p className="text-sm text-cyan-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 10. SUNSET ═══
  sunset: {
    name: "Sunset",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-rose-100 to-purple-100 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center py-10">
            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-orange-400 to-rose-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
              🌅
            </div>
            <h1 className="text-3xl font-bold text-rose-800">
              {restaurant.name}
            </h1>
            <p className="text-orange-600 mt-1">{restaurant.description}</p>
          </div>

          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-orange-700 font-bold text-lg mb-4 text-center">
                {cat.name}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {cat.items?.map((item: any) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-3 shadow-md border border-orange-100"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        className="w-full h-24 rounded-xl object-cover mb-2"
                        alt=""
                      />
                    )}
                    <h3 className="font-bold text-sm text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <span className="block mt-2 font-bold text-rose-500 text-sm">
                      {item.price} DH
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 11. FOREST ═══
  forest: {
    name: "Forest",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 rotate-3">
              🌿
            </div>
            <h1 className="text-3xl font-bold text-green-800">
              {restaurant.name}
            </h1>
          </div>

          {categories.map((cat: any, i: number) => (
            <div key={cat.id} className="mb-6">
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-green-100">
                <h2 className="text-green-700 font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-xl">🍃</span> {cat.name}
                </h2>
                <div className="space-y-3">
                  {cat.items?.map((item: any) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-green-50 rounded-xl p-3 flex gap-3 border-l-4 border-green-400"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          className="w-14 h-14 rounded-lg object-cover"
                          alt=""
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-green-900">
                            {item.name}
                          </h3>
                          <span className="font-bold text-green-600 bg-white px-2 py-1 rounded-lg text-sm shadow-sm">
                            {item.price} DH
                          </span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 12. BERRY ═══
  berry: {
    name: "Berry",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-pink-50 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto bg-gradient-to-tr from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4"
            >
              🍓
            </motion.div>
            <h1 className="text-3xl font-bold text-pink-800">
              {restaurant.name}
            </h1>
          </div>

          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-6"
            >
              <h2 className="text-pink-600 font-bold text-lg mb-3 ml-2">
                {cat.name}
              </h2>
              <div className="space-y-3">
                {cat.items?.map((item: any) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border-2 border-pink-100 flex gap-4"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        className="w-16 h-16 rounded-2xl object-cover"
                        alt=""
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <span className="font-bold text-pink-500">
                          {item.price} DH
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 13. MONO ═══
  mono: {
    name: "Mono",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-slate-100 p-6 pb-20">
        <div className="max-w-md mx-auto">
          <div className="py-10 border-b-4 border-black mb-8">
            <h1 className="text-6xl font-black text-black uppercase tracking-tighter">
              {restaurant.name}
            </h1>
            <p className="text-gray-500 mt-2 font-mono text-sm">
              {restaurant.description}
            </p>
          </div>

          {categories.map((cat: any) => (
            <div key={cat.id} className="mb-10">
              <h2 className="text-2xl font-black text-black mb-6 uppercase">
                {cat.name}
              </h2>
              <div className="space-y-4">
                {cat.items?.map((item: any, idx: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white border-2 border-black p-4 flex justify-between items-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    <div>
                      <h3 className="font-bold text-lg uppercase">
                        {item.name}
                      </h3>
                      <p className="text-xs font-mono opacity-60">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-mono font-bold text-xl">
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 14. PLAYFUL ═══
  playful: {
    name: "Playful",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-yellow-50 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center py-8">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-24 h-24 mx-auto bg-yellow-400 rounded-[2rem] flex items-center justify-center text-4xl mb-4 shadow-lg"
            >
              🍔
            </motion.div>
            <h1 className="text-4xl font-black text-yellow-800">
              {restaurant.name}
            </h1>
            <p className="text-yellow-600 mt-2 font-bold">
              {restaurant.description}
            </p>
          </div>

          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, rotate: -2 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-8"
            >
              <div className="bg-white rounded-[2rem] p-6 shadow-lg border-4 border-yellow-300">
                <h2 className="text-yellow-700 font-black text-xl mb-4 text-center uppercase">
                  {cat.name}
                </h2>
                <div className="space-y-4">
                  {cat.items?.map((item: any) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      className="bg-yellow-100 rounded-2xl p-4 flex gap-4 border-2 border-yellow-300"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-white"
                          alt=""
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-black text-gray-800 uppercase">
                            {item.name}
                          </h3>
                          <span className="font-black text-yellow-600 bg-white px-3 py-1 rounded-full">
                            {item.price} DH
                          </span>
                        </div>
                        <p className="text-sm text-yellow-700 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ 15. PREMIUM ═══
  premium: {
    name: "Premium",
    render: ({
      restaurant,
      categories,
      lang,
      setLang,
      showLangSwitcher,
      langs,
    }: any) => (
      <div className="min-h-screen bg-zinc-950 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-300 to-yellow-500 rounded-none flex items-center justify-center text-black text-2xl font-bold shadow-[0_0_40px_rgba(251,191,36,0.3)] mb-6 border border-amber-400">
              {restaurant.name?.[0]}
            </div>
            <h1 className="text-3xl font-light text-amber-100 tracking-[0.2em] uppercase">
              {restaurant.name}
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
            <p className="text-zinc-500 mt-4 text-sm tracking-widest uppercase">
              {restaurant.description}
            </p>
          </div>

          {categories.map((cat: any, i: number) => (
            <div key={cat.id} className="mb-12">
              <h2 className="text-amber-500 font-light text-sm uppercase tracking-[0.3em] mb-6 text-center">
                ✦ {cat.name} ✦
              </h2>
              <div className="space-y-6">
                {cat.items?.map((item: any, idx: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative bg-zinc-900/50 border border-zinc-800 p-5 hover:border-amber-500/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex gap-4">
                      {item.image && (
                        <img
                          src={item.image}
                          className="w-20 h-20 object-cover border border-zinc-700 group-hover:border-amber-500/50 transition-colors"
                          alt=""
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-zinc-100 group-hover:text-amber-400 transition-colors">
                            {item.name}
                          </h3>
                          <span className="font-light text-amber-400 text-lg">
                            {item.price} DH
                          </span>
                        </div>
                        <p className="text-sm text-zinc-600 mt-2 group-hover:text-zinc-400 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export function MenuTemplate(props: any) {
  const templateId = props.template || "modern";
  const template = templates[templateId] || templates.modern;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={templateId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {template.render(props)}
      </motion.div>
    </AnimatePresence>
  );
}
