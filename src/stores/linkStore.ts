import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Link {
  id: string;
  productId: string;
  expiresAt: number;
}

interface LinkState {
  links: Link[];
  createLink: (productId: string, expirationMinutes: number) => string;
  isLinkValid: (linkId: string) => boolean;
  getLinkProduct: (linkId: string) => string | null;
}

export const useLinkStore = create<LinkState>()(
  persist(
    (set, get) => ({
      links: [],
      createLink: (productId, expirationMinutes) => {
        const linkId = Math.random().toString(36).substring(7);
        const expiresAt = Date.now() + expirationMinutes * 60 * 1000;
        
        set((state) => ({
          links: [...state.links, { id: linkId, productId, expiresAt }]
        }));
        
        return linkId;
      },
      isLinkValid: (linkId) => {
        const link = get().links.find(l => l.id === linkId);
        if (!link) return false;
        return link.expiresAt > Date.now();
      },
      getLinkProduct: (linkId) => {
        const link = get().links.find(l => l.id === linkId);
        return link?.productId || null;
      }
    }),
    {
      name: 'link-storage'
    }
  )
);