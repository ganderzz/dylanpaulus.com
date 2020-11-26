import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";

export function Code({
  children,
  language,
}: {
  children: string;
  language: Language;
}) {
  console.log(children);
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: 20 }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
