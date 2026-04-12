import useAuthStore from "./useAuthStore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const normalizeProduct = (product) => ({
    id: product?.id,
    name: product?.name || "Unnamed product",
    price: Number(product?.price || 0),
    rate: Number(product?.rate || 0),
    image: product?.image || "",
});

const decodeBase64Url = (value) => {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return atob(padded);
};

const getAccountStorageKey = () => {
    const token = useAuthStore.getState().token;
    if (!token) return null;

    try {
        const payload = JSON.parse(decodeBase64Url(token.split(".")[1] || ""));
        return (
            payload.email ||
            payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
            payload.unique_name ||
            payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
            payload.nameid ||
            payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
            payload.sub ||
            token
        );
    } catch {
        return token;
    }
};

const useWishlistStore = create(
    persist(
        (set, get) => ({
            items: [],
            accountItemsByAccount: {},
            guestItems: [],
            syncItemsWithAuth: () => {
                const storageKey = getAccountStorageKey();
                const nextItems = storageKey
                    ? get().accountItemsByAccount[storageKey] || []
                    : get().guestItems;

                set({ items: nextItems });
            },
            isFavorite: (productId) => get().items.some((item) => item.id === productId),
            toggleFavorite: (product, options = {}) => {
                const normalized = normalizeProduct(product);
                if (!normalized.id) return;

                const storageKey = getAccountStorageKey();
                const allowGuest = options.allowGuest === true;

                set((state) => {
                    if (!storageKey && !allowGuest) {
                        return state;
                    }

                    if (storageKey) {
                        const currentItems = state.accountItemsByAccount[storageKey] || [];
                        const exists = currentItems.some((item) => item.id === normalized.id);
                        const nextItems = exists
                            ? currentItems.filter((item) => item.id !== normalized.id)
                            : [normalized, ...currentItems];

                        return {
                            items: nextItems,
                            accountItemsByAccount: {
                                ...state.accountItemsByAccount,
                                [storageKey]: nextItems,
                            },
                        };
                    }

                    const exists = state.guestItems.some((item) => item.id === normalized.id);
                    const nextGuestItems = exists
                        ? state.guestItems.filter((item) => item.id !== normalized.id)
                        : [normalized, ...state.guestItems];

                    return {
                        items: nextGuestItems,
                        guestItems: nextGuestItems,
                    };
                });
            },
            removeFavorite: (productId) =>
                set((state) => {
                    const storageKey = getAccountStorageKey();

                    if (storageKey) {
                        const nextItems = (state.accountItemsByAccount[storageKey] || []).filter(
                            (item) => item.id !== productId
                        );

                        return {
                            items: nextItems,
                            accountItemsByAccount: {
                                ...state.accountItemsByAccount,
                                [storageKey]: nextItems,
                            },
                        };
                    }

                    const nextGuestItems = state.guestItems.filter((item) => item.id !== productId);
                    return {
                        items: nextGuestItems,
                        guestItems: nextGuestItems,
                    };
                }),
            clearGuestItems: () =>
                set({
                    guestItems: [],
                    items: getAccountStorageKey() ? get().items : [],
                }),
        }),
        {
            name: "moon-wishlist",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ accountItemsByAccount: state.accountItemsByAccount }),
        }
    )
);

export default useWishlistStore;
