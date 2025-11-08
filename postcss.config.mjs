const config = {
  plugins: {
    // Allow importing CSS from node_modules using @import "package-name";
    // This is required for imports like `@import "tw-animate-css"` in globals.css
    "postcss-import": {},
    "@tailwindcss/postcss": {},
  },
};

export default config;