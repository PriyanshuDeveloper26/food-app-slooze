# CSS Linter Warnings - Not Errors!

## About the @tailwind and @apply Warnings

You may see these warnings in your IDE:
- `Unknown at rule @tailwind`
- `Unknown at rule @apply`

## These are NOT errors!

These are **TailwindCSS directives** that are processed during the build step. The CSS linter doesn't recognize them because they're not standard CSS, but they are completely valid and required for TailwindCSS to work.

## What happens:

1. **Development:** Vite processes these directives in real-time
2. **Build:** PostCSS + TailwindCSS converts them to standard CSS
3. **Result:** Your app works perfectly!

## To disable these warnings (optional):

Add to your VS Code settings:
```json
{
  "css.lint.unknownAtRules": "ignore"
}
```

## Bottom line:

**Ignore these warnings - your app is working correctly!** ✅
