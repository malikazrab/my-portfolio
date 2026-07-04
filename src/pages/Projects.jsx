import React, { useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import ScrollReveal from "../components/ScrollReveal";
import { projects } from "../data/portfolio";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return projects.filter((project) => {
      const matchCategory = activeCategory === "all" || project.category === activeCategory;
      const matchSearch =
        normalizedSearch === "" ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch) ||
        project.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      return matchCategory && matchSearch;
    });
  }, [activeCategory, deferredSearch]);

  return (
    <main className="page-shell page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// my work"
          title="Projects & Case Studies"
          subtitle="A selection of Laravel apps, API work, and frontend projects built around the resume you shared."
        />

        <ScrollReveal direction="up" className="flex flex-col sm:flex-row gap-4 mb-8">
          <label className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm border border-white/10 bg-white/5 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-300/40 transition-colors"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-display font-medium transition-colors ${
                  activeCategory === category.id ? "brand-gradient text-white shadow-lg shadow-cyan-500/20" : "bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal as="p" direction="left" className="text-sm text-slate-500 dark:text-slate-400 font-mono mb-6">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </ScrollReveal>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <ScrollReveal direction="up" className="text-center py-24">
            <p className="font-display font-semibold text-slate-700 dark:text-slate-200 mb-2">No projects found</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filter.</p>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
