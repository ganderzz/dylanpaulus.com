declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"post": {
"advice-for-new-software-engineers/index.md": {
	id: "advice-for-new-software-engineers/index.md";
  slug: "advice-for-new-software-engineers";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"albums-2010-2020-decade/index.md": {
	id: "albums-2010-2020-decade/index.md";
  slug: "albums-2010-2020-decade";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"clean-code/index.md": {
	id: "clean-code/index.md";
  slug: "clean-code";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"common-table-expressions-in-sql/index.mdx": {
	id: "common-table-expressions-in-sql/index.mdx";
  slug: "common-table-expressions-in-sql";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"creating-fast-time-series-graph-with-postgres/index.mdx": {
	id: "creating-fast-time-series-graph-with-postgres/index.mdx";
  slug: "creating-fast-time-series-graph-with-postgres";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"css-box-model/index.md": {
	id: "css-box-model/index.md";
  slug: "css-box-model";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"debugging-using-python/index.mdx": {
	id: "debugging-using-python/index.mdx";
  slug: "debugging-using-python";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"easily-generate-mock-data-with-postgresql/index.mdx": {
	id: "easily-generate-mock-data-with-postgresql/index.mdx";
  slug: "easily-generate-mock-data-with-postgresql";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"encapsulating-state-with-functional-children/index.mdx": {
	id: "encapsulating-state-with-functional-children/index.mdx";
  slug: "encapsulating-state-with-functional-children";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"explaining-postgresql-explain/index.mdx": {
	id: "explaining-postgresql-explain/index.mdx";
  slug: "explaining-postgresql-explain";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"exploring-adjacency-lists-and-matrices/index.mdx": {
	id: "exploring-adjacency-lists-and-matrices/index.mdx";
  slug: "exploring-adjacency-lists-and-matrices";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"generic-jsx-type-argument/index.md": {
	id: "generic-jsx-type-argument/index.md";
  slug: "generic-jsx-type-argument";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"git-worktree/index.mdx": {
	id: "git-worktree/index.mdx";
  slug: "git-worktree";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"global-component-registration/index.md": {
	id: "global-component-registration/index.md";
  slug: "global-component-registration";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"higher-order-components/index.md": {
	id: "higher-order-components/index.md";
  slug: "higher-order-components";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"how-fb-avoids-adblockers/index.md": {
	id: "how-fb-avoids-adblockers/index.md";
  slug: "how-fb-avoids-adblockers";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"how-this-site-works/index.mdx": {
	id: "how-this-site-works/index.mdx";
  slug: "how-this-site-works";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"how-to-design-postgres-database-schemas/index.mdx": {
	id: "how-to-design-postgres-database-schemas/index.mdx";
  slug: "how-to-design-postgres-database-schemas";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"how-to-reduce-bloat-in-large-postgresql-tables/index.mdx": {
	id: "how-to-reduce-bloat-in-large-postgresql-tables/index.mdx";
  slug: "how-to-reduce-bloat-in-large-postgresql-tables";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"how-to-reduce-your-postgresql-database-size/index.mdx": {
	id: "how-to-reduce-your-postgresql-database-size/index.mdx";
  slug: "how-to-reduce-your-postgresql-database-size";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"how-to-use-postgres-for-data-normalization/index.mdx": {
	id: "how-to-use-postgres-for-data-normalization/index.mdx";
  slug: "how-to-use-postgres-for-data-normalization";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"improve-your-prompts-llms/index.mdx": {
	id: "improve-your-prompts-llms/index.mdx";
  slug: "improve-your-prompts-llms";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"injecting-react-tag-types/index.md": {
	id: "injecting-react-tag-types/index.md";
  slug: "injecting-react-tag-types";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"intro-functional-programming/index.mdx": {
	id: "intro-functional-programming/index.mdx";
  slug: "intro-functional-programming";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"intro-to-flight-js/index.md": {
	id: "intro-to-flight-js/index.md";
  slug: "intro-to-flight-js";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"introducing-react-scroll-to-v2/index.md": {
	id: "introducing-react-scroll-to-v2/index.md";
  slug: "introducing-react-scroll-to-v2";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"level-terminal-navigation/index.md": {
	id: "level-terminal-navigation/index.md";
  slug: "level-terminal-navigation";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"lost-connections/index.md": {
	id: "lost-connections/index.md";
  slug: "lost-connections";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"making-react-fast/index.mdx": {
	id: "making-react-fast/index.mdx";
  slug: "making-react-fast";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"node-dependency-types/index.md": {
	id: "node-dependency-types/index.md";
  slug: "node-dependency-types";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"not-everything-is-state/index.md": {
	id: "not-everything-is-state/index.md";
  slug: "not-everything-is-state";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"postgres-is-a-graph-database/index.mdx": {
	id: "postgres-is-a-graph-database/index.mdx";
  slug: "postgres-is-a-graph-database";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"postgres-security-guide/index.mdx": {
	id: "postgres-security-guide/index.mdx";
  slug: "postgres-security-guide";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"react-controlling-rendering-with-keys/index.md": {
	id: "react-controlling-rendering-with-keys/index.md";
  slug: "react-controlling-rendering-with-keys";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"recursive-query-in-sql-what-it-is-and-how-to-write-one/index.mdx": {
	id: "recursive-query-in-sql-what-it-is-and-how-to-write-one/index.mdx";
  slug: "recursive-query-in-sql-what-it-is-and-how-to-write-one";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"resizing-mac-aws-volumes/index.mdx": {
	id: "resizing-mac-aws-volumes/index.mdx";
  slug: "resizing-mac-aws-volumes";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"reusable-components-factory-component/index.md": {
	id: "reusable-components-factory-component/index.md";
  slug: "reusable-components-factory-component";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"start-with-no/index.md": {
	id: "start-with-no/index.md";
  slug: "start-with-no";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"tips-on-creating-reusable-components/index.md": {
	id: "tips-on-creating-reusable-components/index.md";
  slug: "tips-on-creating-reusable-components";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"tips-on-improving-fabricjs-speed/index.md": {
	id: "tips-on-improving-fabricjs-speed/index.md";
  slug: "tips-on-improving-fabricjs-speed";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"understanding-postgres-foreign-keys/index.mdx": {
	id: "understanding-postgres-foreign-keys/index.mdx";
  slug: "understanding-postgres-foreign-keys";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"understanding-postgres-tablespaces/index.mdx": {
	id: "understanding-postgres-tablespaces/index.mdx";
  slug: "understanding-postgres-tablespaces";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"understanding-sql-aggregate-functions/index.mdx": {
	id: "understanding-sql-aggregate-functions/index.mdx";
  slug: "understanding-sql-aggregate-functions";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"using-typescript-with-react-part-one/index.md": {
	id: "using-typescript-with-react-part-one/index.md";
  slug: "using-typescript-with-react-part-one";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"using-typescript-with-redux-part-two/index.md": {
	id: "using-typescript-with-redux-part-two/index.md";
  slug: "using-typescript-with-redux-part-two";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"write-software-that-evolves/index.md": {
	id: "write-software-that-evolves/index.md";
  slug: "write-software-that-evolves";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
