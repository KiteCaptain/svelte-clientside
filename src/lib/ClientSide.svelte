<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let { children, fallback = null, showFallback = true, delay = 0 } = $props();

    let mounted = $state(false);
    let ready = $state(false);

    onMount(async () => {
        mounted = true;
        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        ready = true;
    });

    // Only render children if we're in the browser and mounted
    let shouldRender = $derived( browser && mounted && ready )
</script>

{#if shouldRender}
    <!-- Render the slotted content only on client-side -->
    {@render children()}
{:else if showFallback}
    <!-- Show fallback content during SSR or while mounting -->
    {#if fallback}
        {@render fallback()}
    {:else}
        <!-- Default fallback -->
        <p>Loading...</p>
    {/if}
{/if}