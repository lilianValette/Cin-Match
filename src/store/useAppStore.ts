import { create } from 'zustand';

import type { Movie } from '@/types';

interface AppStore {
	watchlistMovieIds: number[];
	watchlistById: Record<number, Movie>;
	dislikedMovieIds: Record<number, true>;
	likeMovie: (movie: Movie) => void;
	dislikeMovie: (movieId: number) => void;
	removeFromWatchlist: (movieId: number) => void;
	clearWatchlist: () => void;
	getWatchlist: () => Movie[];
	isLiked: (movieId: number) => boolean;
	hasSwiped: (movieId: number) => boolean;
}

export const useAppStore = create<AppStore>((set, get) => ({
	watchlistMovieIds: [],
	watchlistById: {},
	dislikedMovieIds: {},

	likeMovie: (movie) => {
		set((state) => {
			if (state.watchlistById[movie.id]) {
				return {
					dislikedMovieIds: (() => {
						const next = { ...state.dislikedMovieIds };
						delete next[movie.id];
						return next;
					})(),
				};
			}

			const nextDisliked = { ...state.dislikedMovieIds };
			delete nextDisliked[movie.id];

			return {
				watchlistMovieIds: [movie.id, ...state.watchlistMovieIds],
				watchlistById: {
					...state.watchlistById,
					[movie.id]: movie,
				},
				dislikedMovieIds: nextDisliked,
			};
		});
	},

	dislikeMovie: (movieId) => {
		set((state) => {
			const nextWatchlistById = { ...state.watchlistById };
			delete nextWatchlistById[movieId];

			return {
				watchlistMovieIds: state.watchlistMovieIds.filter((id) => id !== movieId),
				watchlistById: nextWatchlistById,
				dislikedMovieIds: {
					...state.dislikedMovieIds,
					[movieId]: true,
				},
			};
		});
	},

	removeFromWatchlist: (movieId) => {
		set((state) => {
			if (!state.watchlistById[movieId]) return state;

			const nextWatchlistById = { ...state.watchlistById };
			delete nextWatchlistById[movieId];

			return {
				watchlistMovieIds: state.watchlistMovieIds.filter((id) => id !== movieId),
				watchlistById: nextWatchlistById,
				dislikedMovieIds: {
					...state.dislikedMovieIds,
					[movieId]: true,
				},
			};
		});
	},

	clearWatchlist: () => {
		set((state) => {
			const nextDisliked = { ...state.dislikedMovieIds };
			state.watchlistMovieIds.forEach((movieId) => {
				nextDisliked[movieId] = true;
			});

			return {
				watchlistMovieIds: [],
				watchlistById: {},
				dislikedMovieIds: nextDisliked,
			};
		});
	},

	getWatchlist: () => {
		const { watchlistMovieIds, watchlistById } = get();
		return watchlistMovieIds
			.map((id) => watchlistById[id])
			.filter((movie): movie is Movie => Boolean(movie));
	},

	isLiked: (movieId) => {
		return Boolean(get().watchlistById[movieId]);
	},

	hasSwiped: (movieId) => {
		const state = get();
		return Boolean(state.watchlistById[movieId] || state.dislikedMovieIds[movieId]);
	},
}));
