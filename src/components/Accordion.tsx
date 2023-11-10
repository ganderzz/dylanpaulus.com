import type { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

type Props = {
    title: string;
    defaultOpen?: boolean;
};

export const Accordion: FunctionComponent<Props> = ({ title, defaultOpen = false, children }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div style={{ gridColumn: 2 }} class="mb-4">
            <div>
                <button type="button" onClick={() => setIsOpen(!isOpen)} class="flex items-center justify-between w-full py-2 px-4 text-left text-gray-500 border border-gray-200 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-gray-800" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                    <span class="text-sm font-semibold">{title}</span>
                    <svg data-accordion-icon class={`w-3 h-3 ${isOpen ? "" : "rotate-180"} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </div>
            <div class={isOpen ? "" : "hidden"} aria-labelledby="accordion-collapse-heading-1">
                <div class="px-6 py-4 text-md border border-gray-200 dark:border-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};
