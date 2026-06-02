"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useDeferredValue
} from "react";

import {
    Film,
} from "lucide-react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import SelectedMovies from "./SelectedMovies";
import Recommendations from "./Recommendations";

export type Movie = {
    id: number;
    title: string;
    type: string;
    rating: string;
    release_year: number;
};

export type Recommendation = Movie & {
    score: number;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL 

export default function NetflixClient() {

    const [query, setQuery] =
        useState("");

    const [searchResults, setSearchResults] =
        useState<Movie[]>([]);

    const [selectedMovies, setSelectedMovies] =
        useState<Movie[]>([]);

    const [recommendations, setRecommendations] =
        useState<Recommendation[]>([]);

    const [loadingSearch, setLoadingSearch] =
        useState(false);

    const [loadingRecommendations,
        setLoadingRecommendations] =
        useState(false);

    const selectedIds = useMemo(
        () =>
            new Set(
                selectedMovies.map(
                    (m) => m.id
                )
            ),
        [selectedMovies]
    );

    const deferredQuery = useDeferredValue(query);

    // =====================================
    // BUSQUEDAS
    // =====================================

    useEffect(() => {

        if (!query.trim()) {

            setSearchResults([]);

            return;
        }

        const controller =
            new AbortController();

        const timeout =
            setTimeout(async () => {

                try {

                    setLoadingSearch(true);

                    const response =
                        await fetch(
                            `${API_URL}/search?query=${encodeURIComponent(deferredQuery)}`,
                            {
                                signal:
                                    controller.signal,
                            }
                        );

                    if (!response.ok) {

                        throw new Error(
                            "Search failed"
                        );
                    }

                    const data =
                        await response.json();

                    setSearchResults(
                        data.movies.slice(0, 5)
                    );

                } catch (error: any) {

                    if (
                        error.name !==
                        "AbortError"
                    ) {

                        console.error(error);
                    }

                } finally {

                    setLoadingSearch(false);
                }
            }, 400);

        return () => {

            controller.abort();

            clearTimeout(timeout);
        };

    }, [deferredQuery]);

    // =====================================
    // SELECCIONAR PELICULAS
    // =====================================

    const toggleMovie =
        useCallback(
            (movie: Movie) => {

                setSelectedMovies(
                    (prev) => {

                        const exists =
                            prev.some(
                                (m) =>
                                    m.id ===
                                    movie.id
                            );

                        if (exists) {

                            return prev.filter(
                                (m) =>
                                    m.id !==
                                    movie.id
                            );
                        }

                        return [
                            ...prev,
                            movie,
                        ];
                    }
                );
            },
            []
        );

    // =====================================
    // RECOMENDAR
    // =====================================

    const handleRecommend =
        useCallback(async () => {

            if (
                selectedMovies.length === 0
            ) return;

            try {

                setLoadingRecommendations(
                    true
                );

                const response =
                    await fetch(
                        `${API_URL}/recommend`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify({
                                movies:
                                    selectedMovies.map(
                                        (m) =>
                                            m.id
                                    ),
                            }),
                        }
                    );

                if (!response.ok) {

                    throw new Error(
                        "Recommendation failed"
                    );
                }

                const data =
                    await response.json();

                setRecommendations(
                    data.recommendations
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoadingRecommendations(
                    false
                );
            }
        }, [selectedMovies]);

    const handleReset = useCallback(() => {

            setQuery("");

            setSearchResults([]);

            setSelectedMovies([]);

            setRecommendations([]);

    }, []);

    return (

        <div className="
            px-6
            py-10
        ">

            {/* HERO */}

            <section className="
                max-w-5xl
                mx-auto
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    mb-8
                ">

                    <Film className="
                        text-red-500
                        w-10
                        h-10
                    " />

                    <h1 className="
                        text-4xl
                        md:text-5xl
                        font-black
                        bg-gradient-to-r
                        from-red-500
                        to-pink-500
                        bg-clip-text
                        text-transparent
                    ">
                        Netflix RBM
                    </h1>

                </div>

            </section>

            <SearchBar
                query={query}
                setQuery={setQuery}
            />

            <SearchResults
                movies={searchResults}
                loading={loadingSearch}
                selectedIds={selectedIds}
                onToggle={toggleMovie}
            />

            <SelectedMovies
                movies={selectedMovies}
                onRecommend={handleRecommend}
                onReset={handleReset}
                loading={loadingRecommendations}
            />

            <Recommendations
                movies={recommendations}
            />

        </div>
    );

    
}