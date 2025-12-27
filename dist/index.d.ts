import "@soustack/blocks-web";
/**
 * Discovers a Soustack recipe URL from link tags in the document.
 * Looks for <link rel="alternate" type="application/vnd.soustack+json" href="...">
 * @param doc - Document to search (defaults to document)
 * @returns The resolved URL string, or null if not found
 */
export declare function discoverSoustackUrl(doc?: Document): string | null;
/**
 * Initializes the embed by scanning the DOM for targets and rendering recipes.
 * @param opts - Options object
 * @param opts.root - Root element to search within (defaults to document)
 */
export declare function init(opts?: {
    root?: ParentNode;
}): void;
//# sourceMappingURL=index.d.ts.map