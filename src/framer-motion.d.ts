// Ambient fallback declaration for framer-motion.
//
// framer-motion@11.18.x ships a package.json whose "types" field points at
// ./dist/index.d.ts, but that file is not present in the installed package,
// so TypeScript reports TS7016 ("Could not find a declaration file for module
// 'framer-motion'") and `tsc` (and therefore `npm run build`) fails.
//
// This ambient declaration restores a clean build by treating the module as
// untyped. Runtime behavior is unaffected. Remove this file if a future
// framer-motion release ships working type declarations again.
declare module 'framer-motion'
