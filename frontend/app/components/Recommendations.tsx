import { memo } from "react";

import {
    Recommendation,
} from "./Clients";

type Props = {
    movies: Recommendation[];
};

function Recommendations({
    movies,
}: Props) {

    if (movies.length === 0) {
        return null;
    }

    return (

        <section className="
            max-w-5xl
            mx-auto
            mt-12
        ">

            <h2 className="
                text-3xl
                font-black
                mb-6
            ">
                Recomendaciones
            </h2>

            <div className="
                grid
                gap-4
            ">

                {movies.map((movie) => (

                    <div
                        key={movie.id}
                        className="
                            bg-zinc-900
                            border
                            border-zinc-800
                            rounded-2xl
                            p-5
                        "
                    >

                        <h3 className="
                            text-xl
                            font-bold
                        ">
                            {movie.title}
                        </h3>

                        <div className="
                            text-zinc-500
                            mt-2
                        ">
                            {movie.release_year}
                            {" • "}
                            {movie.rating}
                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default memo(
    Recommendations
);