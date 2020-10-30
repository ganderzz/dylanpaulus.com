import elasticlunr from "elasticlunr";
import { Link } from "gatsby";
import React from "react";
import searchIndex from "../../search.json";

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

export function Search() {
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
          className="form-input block w-full font-primary-100 p-4 bg-secondary-100 bg-secondary-100 sm:text-sm sm:leading-5 rounded-md shadow-lg"
          value={value}
          placeholder="Search the site..."
          onChange={(e: any) => {
            setValue(e.currentTarget.value);
          }}
        />
      </form>

      {searchResults && searchResults.length > 0 && (
        <div className="animated fadeIn bg-secondary-200 border-secondary-200 absolute w-full p-0 m-0 z-10">
          <div className="relative block bg-secondary-200 border-secondary-200 text-right w-full font-bold py-2">
            <a
              className=" z-30 block mr-4"
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

          <div className="relative top-0 left-0 right-0 list-none bg-secondary-200 text-primary-100 p-2 shadow-xl z-20">
            {searchResults.map((item) => (
              <Link
                to={item.slug}
                key={item.title}
                className="p-4 block hover:bg-secondary-300 bg-secondary-200 transition-colors border-t border-secondary-300"
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
