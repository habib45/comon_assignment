"use client";

import { useEffect, useMemo, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface CategoriesProps {
  activeCategory?: number | null;
  onSelect?: (categoryId: number | null) => void;
}

export default function Categories({
  activeCategory,
  onSelect,
}: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error("Unable to load categories");
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Could not load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect = (categoryId: number | null) => {
    onSelect?.(categoryId);
  };

  const enhancedCategories = useMemo(() => {
    const palette = [
      "#6435C9",
      "#2185D0",
      "#00B5AD",
      "#21BA45",
      "#FBBD08",
      "#F2711C",
      "#B03060",
    ];
    return categories.map((category, index) => ({
      ...category,
      accent: palette[index % palette.length],
    }));
  }, [categories]);

  return (
    <div className="ui segment">
      <h3 className="ui header">Categories</h3>
      <p className="ui tiny grey text">
        Jump between game collections without leaving the page.
      </p>
      {loading && (
        <div className="ui active inline loader" aria-live="polite"></div>
      )}
      {error && <div className="ui negative message">{error}</div>}
      {!loading && !error && (
        <div className="ui very relaxed divided selection list">
          {enhancedCategories.map((category) => (
            <button
              type="button"
              className={`item category-chip ${
                activeCategory === category.id ? "active" : ""
              }`}
              key={category.id}
              onClick={() => handleSelect(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              <div
                className="ui empty circular label"
                style={{ backgroundColor: category.accent }}
              ></div>
              <div className="content">
                <div className="header">{category.name}</div>
                <div className="description">
                  Tap to focus on {category.name} releases.
                </div>
              </div>
              {activeCategory === category.id && (
                <i className="check icon" aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
