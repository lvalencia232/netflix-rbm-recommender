import { memo } from "react";

import {
    Sparkles,
} from "lucide-react";

import {
    Movie,
} from "./Clients";

type Props = {
    movies: Movie[];
    onRecommend: () => void;
    onReset: () => void;
    loading: boolean;
};

function SelectedMovies({
    movies,
    onRecommend,
    onReset,
    loading,
}: Props) {

    return (

        <section className="
            max-w-5xl
            mx-auto
            mt-12
        ">

            <div className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-3xl
                p-6
            ">

                <div className="
                    flex
                    items-center
                    gap-2
                    mb-5
                ">

                    <Sparkles className="
                        text-yellow-400
                        w-6
                        h-6
                    " />

                    <h2 className="
                        text-2xl
                        font-bold
                    ">
                        Seleccionadas
                    </h2>

                </div>

                {movies.length === 0 ? (

                    <p className="
                        text-zinc-500
                    ">
                        No has seleccionado películas.
                    </p>

                ) : (

                    <div className="
                        flex
                        flex-wrap
                        gap-3
                    ">

                        {movies.map(
                            (movie) => (

                                <div
                                    key={movie.id}
                                    className="
                                        px-4
                                        py-2
                                        rounded-full
                                        bg-red-500/20
                                        border
                                        border-red-500/40
                                        text-sm
                                    "
                                >
                                    {movie.title}
                                </div>
                            )
                        )}

                    </div>
                )}

                <div className="
                    mt-8
                    flex
                    gap-3
                ">

                    <button
                        onClick={onRecommend}
                        disabled={
                            loading ||
                            movies.length === 0
                        }
                        className="
                            flex-1
                            bg-red-600
                            hover:bg-red-500
                            rounded-2xl
                            py-4
                            text-lg
                            font-bold
                            transition-colors
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {loading
                            ? "Generando..."
                            : "Obtener recomendaciones"}

                    </button>

                    <button
                        onClick={onReset}
                        disabled={
                            movies.length === 0
                        }
                        className="
                            px-6
                            bg-zinc-800
                            border
                            border-zinc-700
                            rounded-2xl
                            font-semibold
                            hover:bg-zinc-700
                            transition-colors
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        Reiniciar

                    </button>

                </div>

            </div>

        </section>
    );
}

export default memo(
    SelectedMovies
);