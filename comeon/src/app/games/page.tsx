"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";

interface Game {
  name: string;
  description: string;
  code: string;
  icon: string;
  categoryIds: number[];
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setStatus("loading");
        const res = await fetch("/api/games", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Unable to load games");
        }
        const data = await res.json();
        setGames(data);
        setStatus("idle");
      } catch (err) {
        console.error(err);
        setError("Could not load games");
        setStatus("error");
      }
    };

    fetchGames();
  }, []);

  const filteredGames = useMemo(() => {
    const loweredSearch = search.trim().toLowerCase();
    return games.filter((game) => {
      const matchesSearch =
        !loweredSearch ||
        game.name.toLowerCase().includes(loweredSearch) ||
        game.description.toLowerCase().includes(loweredSearch);
      const matchesCategory =
        activeCategory === null || game.categoryIds.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [games, search, activeCategory]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    startTransition(() => {
      setSearch(value);
    });
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setActiveCategory(categoryId);
  };

  return (
    <>
      <Navbar />
      <div className="ui main container" style={{ marginTop: "120px" }}>
        <div className="ui segment">
          <div className="ui fluid icon input">
            <input
              type="text"
              placeholder="Search Game"
              value={search}
              onChange={handleSearchChange}
              aria-label="Search games"
            />
            <i className={`search icon ${isPending ? "loading" : ""}`}></i>
          </div>
        </div>
        <div className="ui stackable grid">
          <div className="sixteen wide mobile twelve wide computer column">
            <h2 className="ui header">Games</h2>
            {status === "loading" && (
              <div className="ui segment">
                <div className="ui active loader"></div>
              </div>
            )}
            {status === "error" && error && (
              <div className="ui negative message">{error}</div>
            )}
            {status === "idle" && (
              <div className="ui divided items games-list" aria-live="polite">
                {filteredGames.length === 0 && (
                  <div className="ui placeholder segment empty-state">
                    <div className="ui icon header">
                      <i className="search icon"></i>
                      No games matched your filters
                    </div>
                  </div>
                )}
                {filteredGames.map((game) => (
                  <div className="item" key={game.code}>
                    <div className="image">
                      <Image
                        src={game.icon}
                        alt={game.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="content">
                      <a className="header">{game.name}</a>
                      <div className="description">
                        <p>{game.description}</p>
                      </div>
                      <div className="extra">
                        <button className="ui black button right floated">
                          Play
                          <i className="right chevron icon"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="four wide computer only column">
            <Categories
              activeCategory={activeCategory}
              onSelect={handleCategorySelect}
            />
          </div>
          <div className="sixteen wide mobile only column">
            <Categories
              activeCategory={activeCategory}
              onSelect={handleCategorySelect}
            />
          </div>
        </div>
      </div>
    </>
  );
}
