import { memo } from "react";

import {
    Movie,
} from "./Clients";

type Props = {
    movies: Movie[];
    loading: boolean;
    selectedIds: Set<number>;
    onToggle: (
        movie: Movie
    ) => void;
};

function SearchResults({
    movies,
    loading,
    selectedIds,
    onToggle,
}: Props) {

    if (loading) {

        return (

            <section className="
                max-w-5xl
                mx-auto
                mt-4
            ">

                <p className="
                    text-zinc-500
                ">
                    Buscando...
                </p>

            </section>
        );
    }

    if (movies.length === 0) {
        return null;
    }

    return (

        <section className="
            max-w-5xl
            mx-auto
            mt-4
        ">

            <div className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                overflow-hidden
            ">

                {movies.map((movie) => {

                    const selected =
                        selectedIds.has(
                            movie.id
                        );

                    return (

                        <button
                            key={movie.id}
                            onClick={() =>
                                onToggle(movie)
                            }
                            className={`
                                w-full
                                text-left
                                px-5
                                py-4
                                border-b
                                border-zinc-800
                                transition-colors
                                ${
                                    selected
                                        ? "bg-red-500/20"
                                        : "hover:bg-zinc-800"
                                }
                            `}
                        >

                            <div className="
                                font-semibold
                            ">
                                {movie.title}
                            </div>

                            <div className="
                                text-sm
                                text-zinc-500
                                mt-1
                            ">
                                {movie.release_year}
                                {" • "}
                                {movie.rating}
                            </div>

                        </button>
                    );
                })}

            </div>

        </section>
    );
}

export default memo(SearchResults);