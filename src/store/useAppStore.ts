import { create } from 'zustand';

import type { DiscoveryFilters, Movie } from '@/types';

interface AppStore {
	watchlistMovieIds: number[];
	watchlistById: Record<number, Movie>;
	dislikedMovieIds: Record<number, true>;
	previewMovie: Movie | null;
	setPreviewMovie: (movie: Movie) => void;
	likeMovie: (movie: Movie) => void;
	dislikeMovie: (movieId: number) => void;
	removeFromWatchlist: (movieId: number) => void;
	clearWatchlist: () => void;
	getWatchlist: () => Movie[];
	filters: DiscoveryFilters;
	isLiked: (movieId: number) => boolean;
	hasSwiped: (movieId: number) => boolean;
	updateFilters: (newFilters: Partial<DiscoveryFilters>) => void;
	resetSwipes: () => void;
}

function withoutId(record: Record<number, true>, id: number): Record<number, true> {
	const next = { ...record };
	delete next[id];
	return next;
}

function removeAndDislike(
	state: Pick<AppStore, 'watchlistMovieIds' | 'watchlistById' | 'dislikedMovieIds'>,
	movieId: number,
) {
	const nextWatchlistById = { ...state.watchlistById };
	delete nextWatchlistById[movieId];
	return {
		watchlistMovieIds: state.watchlistMovieIds.filter((id) => id !== movieId),
		watchlistById: nextWatchlistById,
		dislikedMovieIds: { ...state.dislikedMovieIds, [movieId]: true as const },
	};
}

export const useAppStore = create<AppStore>((set, get) => ({
	watchlistMovieIds: [],
	watchlistById: {},
	dislikedMovieIds: {},
	previewMovie: null,
	filters: {
		includedGenres: [],
		excludedGenres: [],
		minReleaseYear: 1990,
	},

	setPreviewMovie: (movie) => set({ previewMovie: movie }),

	likeMovie: (movie) => {
		set((state) => {
			if (state.watchlistById[movie.id]) {
				return { dislikedMovieIds: withoutId(state.dislikedMovieIds, movie.id) };
			}
			return {
				watchlistMovieIds: [movie.id, ...state.watchlistMovieIds],
				watchlistById: { ...state.watchlistById, [movie.id]: movie },
				dislikedMovieIds: withoutId(state.dislikedMovieIds, movie.id),
			};
		});
	},

	dislikeMovie: (movieId) => set((state) => removeAndDislike(state, movieId)),

	removeFromWatchlist: (movieId) => {
		set((state) => {
			if (!state.watchlistById[movieId]) return state;
			return removeAndDislike(state, movieId);
		});
	},

	clearWatchlist: () => {
		set((state) => {
			const nextDisliked = { ...state.dislikedMovieIds };
			state.watchlistMovieIds.forEach((id) => { nextDisliked[id] = true; });
			return { watchlistMovieIds: [], watchlistById: {}, dislikedMovieIds: nextDisliked };
		});
	},

	getWatchlist: () => {
		const { watchlistMovieIds, watchlistById } = get();
		return watchlistMovieIds
			.map((id) => watchlistById[id])
			.filter((movie): movie is Movie => Boolean(movie));
	},

	isLiked: (movieId) => Boolean(get().watchlistById[movieId]),

	hasSwiped: (movieId) => {
		const { watchlistById, dislikedMovieIds } = get();
		return Boolean(watchlistById[movieId] || dislikedMovieIds[movieId]);
	},

	updateFilters: (newFilters) =>
		set((state) => ({ filters: { ...state.filters, ...newFilters } })),

	resetSwipes: () => set({ watchlistMovieIds: [], watchlistById: {}, dislikedMovieIds: {} }),
}));
