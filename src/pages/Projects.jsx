import React, { useState, useMemo, useDeferredValue } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import ScrollReveal from "../components/ScrollReveal";
import { projects } from "../data/portfolio";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return projects.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch =
        normalizedSearch === "" ||
        p.title.toLowerCase().includes(normalizedSearch) ||
        p.description.toLowerCase().includes(normalizedSearch) ||
        p.tags.some((t) => t.toLowerCase().includes(normalizedSearch));
      return matchCat && matchSearch;
    });
  }, [activeCategory, deferredSearch]);

  return (
    <main className="page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// my work"
          title="Projects & Case Studies"
          subtitle="A curated selection of web apps, APIs, and mobile applications I've built across different industries."
        />

        {/* Filters */}
        <ScrollReveal className="flex flex-col sm:flex-row gap-4 mb-10" direction="up" duration={0.55}>
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-brand-400 dark:focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-display font-medium transition-[background-color,color,box-shadow,transform] duration-200 active:scale-95 ${
                  activeCategory === cat.id
                    ? "brand-gradient text-white shadow-lg shadow-brand-500/25"
                    : "bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-500"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Results count */}
        <ScrollReveal
          key={`${activeCategory}-${search}`}
          as="p"
          direction="left"
          duration={0.35}
          className="text-sm text-gray-400 dark:text-gray-600 font-mono mb-6"
        >
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </ScrollReveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          ) : (
            <ScrollReveal
              key="empty"
              direction="up"
              className="text-center py-24"
            >
              <div className="text-4xl mb-4">🔍</div>
              <p className="font-display font-semibold text-gray-400 dark:text-gray-600 mb-2">No projects found</p>
              <p className="text-sm text-gray-400 dark:text-gray-600">Try adjusting your search or filter</p>
            </ScrollReveal>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
