# svelte-clientside

A Svelte 5 component wrapper that prevents server-side rendering for client-only components while maintaining SEO-friendly SSR for the rest of your page.

## Features

- 🚫 **Prevents SSR**: Components wrapped with `ClientSide` only render in the browser
- 🎨 **Customizable Fallback**: Show loading states or custom content during SSR
- ⚡ **Zero Dependencies**: Only requires Svelte 5 as a peer dependency
- 🔧 **Flexible Options**: Optional delays, custom fallbacks, and more
- 📦 **Lightweight**: Minimal bundle impact

## Installation

```bash
npm install svelte-clientside
```

## Quick Start

```svelte
<script>
  import ClientSide from 'svelte-clientside';
  import MyClientOnlyComponent from './MyClientOnlyComponent.svelte';
</script>

<svelte:head>
  <meta property="og:title" content="Your Title" />
</svelte:head>

<h1>This content is server-rendered</h1>

<ClientSide>
  {#snippet children()}
    <MyClientOnlyComponent />
  {/snippet}
</ClientSide>
```

## Usage Examples

### Basic Usage

```svelte
<ClientSide>
  {#snippet children()}
    <MyGameComponent />
  {/snippet}
</ClientSide>
```

### With Custom Fallback

```svelte
<ClientSide>
  {#snippet children()}
    <MyGameComponent />
  {/snippet}
  
  {#snippet fallback()}
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading game engine...</p>
    </div>
  {/snippet}
</ClientSide>
```

### With Delay (prevents flash)

```svelte
<ClientSide delay={100}>
  {#snippet children()}
    <MyComponent />
  {/snippet}
</ClientSide>
```

### No Fallback (invisible during SSR)

```svelte
<ClientSide showFallback={false}>
  {#snippet children()}
    <MyComponent />
  {/snippet}
</ClientSide>
```

### Multiple Components

```svelte
<ClientSide>
  {#snippet children()}
    <GameEngine />
    <GameUI />
    <GameControls />
  {/snippet}
  
  {#snippet fallback()}
    <div class="game-skeleton">Game loading...</div>
  {/snippet}
</ClientSide>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showFallback` | `boolean` | `true` | Whether to show fallback content during SSR |
| `delay` | `number` | `0` | Optional delay in milliseconds before showing client content |

## Snippets

| Snippet | Required | Description |
|---------|----------|-------------|
| `children` | ✅ | The content to render only on the client-side |
| `fallback` | ❌ | Custom fallback content to show during SSR (optional) |

## Why Use This?

SvelteKit's SSR is great for SEO and performance, but some components need browser-only APIs (Canvas, WebGL, localStorage, etc.). Instead of disabling SSR for your entire route and losing SEO benefits, wrap only the problematic components with `ClientSide`.

### ❌ Before (loses SEO)

```js
// +page.js
export const ssr = false; // Entire page loses SSR
```

### ✅ After (keeps SEO)

```svelte
<svelte:head>
  <meta property="og:title" content="Your Title" /> <!-- Still works! -->
</svelte:head>

<h1>Server-rendered content</h1> <!-- SEO friendly -->

<ClientSide>
  {#snippet children()}
    <MyBrowserOnlyComponent /> <!-- Client-only -->
  {/snippet}
</ClientSide>
```

## Requirements

- Svelte 5.0.0 or higher
- SvelteKit (recommended)

## TypeScript Support

This package includes TypeScript definitions. No additional setup required.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Kite Captain
