import type { FunctionComponent } from "preact";

type Props = {
  href: string;
};

export const MenuLink: FunctionComponent<Props> = ({ href, children }) => {
  const isActive = window.location.pathname.startsWith(href);
  const activeClasses = isActive
    ? `bg-gray-700 text-white hover:bg-gray-800 hover:text-white`
    : `text-slate-900 dark:text-white hover:bg-gray-800 hover:text-white`;

  return (
    <a
      href={href}
      class={`rounded no-underline font-bold text-xl mr-4 p-4 transition-colors text-opacity-90 hover:text-opacity-100 ${activeClasses} `}
    >
      {children}
    </a>
  );
};
