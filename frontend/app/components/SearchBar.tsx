import { Search } from "lucide-react";

type Props = {
    query: string;
    setQuery: (
        value: string
    ) => void;
};

export default function SearchBar({
    query,
    setQuery,
}: Props) {

    return (

        <section className="
            max-w-5xl
            mx-auto
        ">

            <div className="relative">

                <Search className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                    w-5
                    h-5
                " />

                <input
                    type="text"
                    placeholder="Buscar películas..."
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        bg-zinc-900
                        border
                        border-zinc-800
                        rounded-2xl
                        pl-12
                        pr-4
                        py-4
                        text-lg
                        outline-none
                        focus:border-red-500
                    "
                />

            </div>

        </section>
    );
}