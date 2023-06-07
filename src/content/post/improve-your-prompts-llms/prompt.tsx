export const Prompt = ({
  children,
  header,
  isResponse,
  className = "",
  ...rest
}: {
  children: any;
  header: string;
  className?: string;
  isResponse?: boolean;
}) => {
  const color = isResponse
    ? `border-green-600 dark:border-green-600 bg-green-200 dark:bg-green-700`
    : `border-slate-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-800`;

  const headerColor = isResponse
    ? `bg-green-500 dark:bg-green-800`
    : `bg-gray-200 dark:bg-slate-900`;

  return (
    <div
      class={`border-solid border-2 ${color} rounded-lg my-4 ${className}`}
      {...rest}>
      <div class={`text-base ${headerColor} rounded px-4 py-2 font-semibold`}>
        {header}
      </div>

      <div class="text-base px-4 py-2 m-0">{children}</div>
    </div>
  );
};
