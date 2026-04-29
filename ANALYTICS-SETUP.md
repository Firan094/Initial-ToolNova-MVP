# ToolNova Analytics Setup

Current live URL:

https://toolnova.pages.dev/

## Recommended first analytics option

Use Cloudflare Web Analytics first.

Reason:
- Free
- Simple
- Works well with Cloudflare Pages
- Good enough for early traffic checks
- Privacy-friendly

## Cloudflare Web Analytics setup for Pages

1. Open Cloudflare dashboard.
2. Go to Workers & Pages.
3. Select the ToolNova Pages project.
4. Go to Metrics.
5. Find Web Analytics.
6. Click Enable.

Cloudflare Pages can automatically add the Web Analytics JavaScript snippet on the next deployment.

## Important

If Cloudflare asks for a manual JavaScript snippet, paste it before the closing body tag on each HTML page.

Example location:

```html
<!-- Analytics snippet goes here later -->
</body>
</html>