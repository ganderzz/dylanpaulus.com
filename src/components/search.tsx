import elasticlunr from "elasticlunr";
import { Link } from "gatsby";
import React from "react";
import searchIndex from "../../search.json";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
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
  const ref = React.useRef<HTMLDivElement | undefined>();

  const clickAwayHandler = React.useCallback(() => {
    setSearchResults([]);
    setValue("");
  }, [setValue, setSearchResults]);

  useOnClickOutside(ref, clickAwayHandler);

  React.useEffect(() => {
    debounce(() => {
      setSearchResults(search(value));
    });
  }, [value]);

  return (
    <div className="inline-block relative text-left" ref={ref}>
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
          className="opacity-75 hover:opacity-100 focus:opacity-100 focus:shadow-md form-input block w-full dark:text-gray-100 text-gray-700 bg-gray-100 dark:bg-gray-600 p-4 pl-10 text-gray-300::placeholder sm:text-sm sm:leading-5 rounded-md shadow-md"
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
        <div className="animated fadeIn min-w-full mr-4 bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-600 absolute right-0 p-0 m-0 mt-2 rounded-md shadow-lg overflow-hidden z-20">
          {searchResults.map((item) => (
            <Link
              to={item.slug}
              key={item.title}
              className="flex items-center p-4 text-gray-600 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-t border-gray-300 dark:border-gray-500"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
