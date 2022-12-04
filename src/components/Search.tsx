import * as elasticlunr from "elasticlunr";
import searchIndex from "../../search.json";
import { useState, useEffect } from "preact/hooks";

const debounce = (function debounce(time) {
    let handle: unknown = undefined;

    return function (callback: any) {
        if (handle) {
            clearTimeout(handle as any);
        }

        handle = setTimeout(callback, time);
    };
})(300);

const idx: any = elasticlunr.Index.load(searchIndex as any);

function search(value: string) {
    return idx
        .search(value, {
            expand: true,
        })
        .slice(0, 6)
        .map((item: { ref: keyof typeof searchIndex.documentStore.docs }) => searchIndex.documentStore.docs[item.ref]);
}

export function Search({ ...rest }) {
    const [value, setValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        debounce(() => {
            setSearchResults(search(value));
        });
    }, [value]);

    console.log(searchResults);

    return (
        <>
            <form
                style={{ position: "relative", marginRight: 16 }}
                onSubmit={(e) => {
                    e.preventDefault();
                    setSearchResults(search(value));
                }}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        e.preventDefault();

                        setSearchResults([]);
                        setValue("");
                    }
                }}
                {...rest}
            >
                <input
                    type="search"
                    value={value}
                    placeholder="Search the site..."
                    style={{ height: "2.4rem", paddingLeft: 42, border: 0 }}
                    onChange={(e: any) => {
                        setValue(e.currentTarget.value);
                    }}
                />

                {/* <Icon
                    name="material-symbols:search-rounded"
                    class="absolute"
                    style={{
                        top: "0.5rem",
                        left: 8,
                        color: "#000",
                    }}
                /> */}
            </form>

            {searchResults && searchResults.length > 0 && (
                <div style={{ position: "absolute", top: 65 }}>
                    <div>
                        <a
                            aria-label="close"
                            onClick={() => {
                                setSearchResults([]);
                                setValue("");
                            }}
                            href="#close"
                        >
                            ^ Close
                        </a>
                    </div>

                    <div>
                        {searchResults.map((item: any) => (
                            <a href={item.slug} key={item.title}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}