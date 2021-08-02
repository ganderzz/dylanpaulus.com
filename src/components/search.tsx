import elasticlunr from "elasticlunr";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
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

const SearchContainer = styled.div`
  position: absolute;
  top: 65px;

  > a {
    display: block;
    padding: 1rem 2rem;
  }
`;

export function Search({ ...rest }: React.PropsWithoutRef<unknown>) {
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

        <SearchIcon
          style={{
            position: "absolute",
            top: "0.5rem",
            left: 8,
            color: "#000",
          }}
        />
      </form>

      {searchResults && searchResults.length > 0 && (
        <SearchContainer>
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
            {searchResults.map((item) => (
              <Link to={item.slug} key={item.title}>
                {item.title}
              </Link>
            ))}
          </div>
        </SearchContainer>
      )}
    </>
  );
}
