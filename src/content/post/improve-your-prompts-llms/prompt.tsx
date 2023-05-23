export const Prompt = ({
  children,
  header,
}: {
  children: any;
  header: string;
}) => {
  return (
    <div class="bg-slate-800 border-solid border-2 border-slate-500 rounded-lg my-4">
      <div class="text-base bg-slate-900 rounded px-4 py-2 font-semibold">
        {header}
      </div>

      <div class="text-base px-4 py-2 m-0">{children}</div>
    </div>
  );
};
