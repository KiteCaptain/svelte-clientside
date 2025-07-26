import { SvelteComponent } from 'svelte';

export interface ClientSideProps {
  showFallback?: boolean;
  delay?: number;
  children: import('svelte').Snippet;
  fallback?: import('svelte').Snippet;
}

export default class ClientSide extends SvelteComponent<ClientSideProps> {}