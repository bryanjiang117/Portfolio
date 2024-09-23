import { dev } from '$app/environment';

// hot-reload (only during dev)
export const csr = dev;

// prerender since the page is static => faster loading and better SEO
export const prerender = true;
