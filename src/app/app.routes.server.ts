import { RenderMode, ServerRoute } from '@angular/ssr';
import { POST_SLUGS } from './data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => POST_SLUGS.map((id) => ({ id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
