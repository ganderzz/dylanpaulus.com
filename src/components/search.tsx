import elasticlunr from "elasticlunr";
import { Link } from "gatsby";
import React from "react";
import searchIndex from "../../search.json";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

const debounce = (function debounce(time) {
  let handle: unknown = undefined;

  return function (callback) {
    if (handle) {
      clearTimeout(handle as any);
    }

    handle = setTimeout(callback, time);
  };
})(300);

const idx: any = elasticlunr.Index.load(searchIndex);

function search(value: string) {
  return idx
    .search(value, {
      expand: true,
    })
    .slice(0, 6)
    .map((item) => searchIndex.documentStore.docs[item.ref]);
}

export function Search({ className = "" }: { className: string }) {
  const [value, setValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    debounce(() => {
      setSearchResults(search(value));
    });
  }, [value]);

  return (
    <>
      <form
        className={`relative inline-block ${className}`}
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
      >
        <input
          type="search"
          className="opacity-75 hover:opacity-100 focus:opacity-100 form-input block w-full dark:text-gray-100 text-gray-700 bg-gray-100 dark:bg-gray-600 p-4 pl-10 text-gray-300::placeholder sm:text-sm sm:leading-5 rounded-md shadow-md"
          value={value}
          placeholder="Search the site..."
          onChange={(e: any) => {
            setValue(e.currentTarget.value);
          }}
        />

        <SearchIcon
          className="dark:text-gray-400 text-gray-500"
          style={{ position: "absolute", top: 14, left: 8 }}
        />
      </form>

      {searchResults && searchResults.length > 0 && (
        <div className="animated fadeIn bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 absolute right-0 w-full p-0 m-0 z-10">
          <div className="relative block bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-right w-full font-bold py-2">
            <a
              className="z-30 block mr-4 dark:text-gray-100 text-gray-700"
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

          <div className="relative top-0 left-0 right-0 list-none bg-gray-200 dark:bg-gray-600 p-2 shadow-xl z-20">
            {searchResults.map((item) => (
              <Link
                to={item.slug}
                key={item.title}
                className="p-4 dark:text-gray-100 text-gray-700 block hover:bg-gray-300 bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors border-t border-gray-300 dark:border-gray-500"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
