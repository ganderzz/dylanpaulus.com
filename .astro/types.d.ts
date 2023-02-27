declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"post": {
"advice-for-new-software-engineers/index.md": {
  id: "advice-for-new-software-engineers/index.md",
  slug: "advice-for-new-software-engineers",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"albums-2010-2020-decade/index.md": {
  id: "albums-2010-2020-decade/index.md",
  slug: "albums-2010-2020-decade",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"clean-code/index.md": {
  id: "clean-code/index.md",
  slug: "clean-code",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"css-box-model/index.md": {
  id: "css-box-model/index.md",
  slug: "css-box-model",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"encapsulating-state-with-functional-children/index.md": {
  id: "encapsulating-state-with-functional-children/index.md",
  slug: "encapsulating-state-with-functional-children",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"generic-jsx-type-argument/index.md": {
  id: "generic-jsx-type-argument/index.md",
  slug: "generic-jsx-type-argument",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"global-component-registration/index.md": {
  id: "global-component-registration/index.md",
  slug: "global-component-registration",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"higher-order-components/index.md": {
  id: "higher-order-components/index.md",
  slug: "higher-order-components",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"house-update-2022-2023/index.mdx": {
  id: "house-update-2022-2023/index.mdx",
  slug: "house-update-2022-2023",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"how-fb-avoids-adblockers/index.md": {
  id: "how-fb-avoids-adblockers/index.md",
  slug: "how-fb-avoids-adblockers",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"injecting-react-tag-types/index.md": {
  id: "injecting-react-tag-types/index.md",
  slug: "injecting-react-tag-types",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"intro-functional-programming/index.md": {
  id: "intro-functional-programming/index.md",
  slug: "intro-functional-programming",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"intro-to-flight-js/index.md": {
  id: "intro-to-flight-js/index.md",
  slug: "intro-to-flight-js",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"introducing-react-scroll-to-v2/index.md": {
  id: "introducing-react-scroll-to-v2/index.md",
  slug: "introducing-react-scroll-to-v2",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"level-terminal-navigation/index.md": {
  id: "level-terminal-navigation/index.md",
  slug: "level-terminal-navigation",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"lost-connections/index.md": {
  id: "lost-connections/index.md",
  slug: "lost-connections",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"making-react-fast/index.md": {
  id: "making-react-fast/index.md",
  slug: "making-react-fast",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-dependency-types/index.md": {
  id: "node-dependency-types/index.md",
  slug: "node-dependency-types",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"not-everything-is-state/index.md": {
  id: "not-everything-is-state/index.md",
  slug: "not-everything-is-state",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"react-controlling-rendering-with-keys/index.md": {
  id: "react-controlling-rendering-with-keys/index.md",
  slug: "react-controlling-rendering-with-keys",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"reusable-components-factory-component/index.md": {
  id: "reusable-components-factory-component/index.md",
  slug: "reusable-components-factory-component",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"start-with-no/index.md": {
  id: "start-with-no/index.md",
  slug: "start-with-no",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"tips-on-creating-reusable-components/index.md": {
  id: "tips-on-creating-reusable-components/index.md",
  slug: "tips-on-creating-reusable-components",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"tips-on-improving-fabricjs-speed/index.md": {
  id: "tips-on-improving-fabricjs-speed/index.md",
  slug: "tips-on-improving-fabricjs-speed",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"using-typescript-with-react-part-one/index.md": {
  id: "using-typescript-with-react-part-one/index.md",
  slug: "using-typescript-with-react-part-one",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"using-typescript-with-redux-part-two/index.md": {
  id: "using-typescript-with-redux-part-two/index.md",
  slug: "using-typescript-with-redux-part-two",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"write-software-that-evolves/index.md": {
  id: "write-software-that-evolves/index.md",
  slug: "write-software-that-evolves",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
