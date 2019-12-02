import * as React from "react";

interface IProps {
  book: any;
}

export function BookCard({ book }: IProps) {
  if (!book) {
    return null;
  }

  const { title, author, cover } = book.frontmatter;

  return (
    <div className="max-w-sm w-full shadow-lg rounded border">
      <a
        href={`/books${book.fields.slug}`}
        className="block h-48 flex-none bg-cover rounded-t text-center overflow-hidden"
        style={{
          backgroundImage: `url('${require(`../../books/book-covers/${cover}`)}')`
        }}
        title={title}
      />

      <div className="p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <a
            href={`/books${book.fields.slug}`}
            className="font-bold text-xl mb-2"
          >
            {title}
          </a>
          <p className="text-gray-700 text-base">{author}</p>
        </div>
      </div>
    </div>
  );
}
