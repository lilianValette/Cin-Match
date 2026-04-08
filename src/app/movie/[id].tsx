import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { fetchMovieCredits, fetchMovieWatchProviders } from '@/services/tmdbService';
import { useAppStore } from '@/store/useAppStore';
import type { MovieCredits, StreamingPlatform } from '@/types';

import { styles } from './movie.styles';

export default function MovieDetailsScreen() {
	const router = useRouter();
	const params = useLocalSearchParams<{ id?: string | string[] }>();
	const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
	const movieId = Number(idParam);
	const movie = useAppStore((state) => {
		if (!Number.isFinite(movieId)) return undefined;
		return state.watchlistById[movieId] ?? (state.previewMovie?.id === movieId ? state.previewMovie : undefined);
	});
	const [platforms, setPlatforms] = useState<StreamingPlatform[]>([]);
	const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(false);
	const [platformMode, setPlatformMode] = useState<'subscription' | 'purchase'>('subscription');
	const [credits, setCredits] = useState<MovieCredits | null>(null);

	useEffect(() => {
		if (!movieId || !Number.isFinite(movieId)) return;

		let cancelled = false;
		setIsLoadingPlatforms(true);

		fetchMovieWatchProviders(movieId, 'FR')
			.then((data) => { if (!cancelled) setPlatforms(data); })
			.catch(() => { if (!cancelled) setPlatforms([]); })
			.finally(() => { if (!cancelled) setIsLoadingPlatforms(false); });

		fetchMovieCredits(movieId)
			.then((data) => { if (!cancelled) setCredits(data); })
			.catch(() => {});

		return () => { cancelled = true; };
	}, [movieId]);

	if (!movie) {
		return (
			<SafeAreaView style={styles.screen}>
				<View style={styles.emptyState}>
					<Text style={styles.emptyTitle}>Film introuvable</Text>
					<Text style={styles.emptyText}>
						Cette fiche est disponible uniquement pour les films présents dans votre watchlist.
					</Text>
					<Pressable style={styles.backButton} onPress={() => router.back()}>
						<Text style={styles.backButtonText}>Retour</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		);
	}

	const subscriptionPlatforms = platforms.filter((platform) =>
		platform.categories.includes('flatrate') || platform.categories.includes('free') || platform.categories.includes('ads'),
	);
	const purchasePlatforms = platforms.filter(
		(platform) => platform.categories.includes('buy') || platform.categories.includes('rent'),
	);
	const displayedPlatforms = platformMode === 'subscription' ? subscriptionPlatforms : purchasePlatforms;

	return (
		<SafeAreaView style={styles.screen}>
			<Stack.Screen options={{ title: `${movie.title} — CinéMatch` }} />
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.topBar}>
					<Pressable style={styles.backButton} onPress={() => router.back()}>
						<Text style={styles.backButtonText}>Retour</Text>
					</Pressable>
				</View>
				<Image source={{ uri: movie.backdropUrl || movie.posterUrl }} style={styles.backdrop} contentFit="cover" />
				<Text style={styles.title}>{movie.title.replace(/\n/g, ' ')}</Text>
				<Text style={styles.meta}>
					{movie.year} • {movie.duration > 0 ? `${movie.duration} min` : 'Durée inconnue'} • {movie.rating.toFixed(1)} IMDB
				</Text>
				<View style={styles.genreRow}>
					{movie.genres.map((genre) => (
						<View key={genre.id} style={styles.chip}>
							<Text style={styles.chipText}>{genre.name}</Text>
						</View>
					))}
				</View>
				<Text style={styles.overview}>{movie.overview}</Text>

				{credits && credits.directors.length > 0 && (
					<View style={styles.creditsSection}>
						<Text style={styles.sectionTitle}>Réalisé par</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.creditsRow}>
							{credits.directors.map((d) => (
								<View key={d.id} style={styles.creditItem}>
									{d.profileUrl ? (
										<Image source={{ uri: d.profileUrl }} style={styles.creditAvatar} contentFit="cover" />
									) : (
										<View style={styles.creditAvatarPlaceholder} />
									)}
									<Text style={styles.creditName} numberOfLines={2}>{d.name}</Text>
								</View>
							))}
						</ScrollView>
					</View>
				)}

				{credits && credits.topCast.length > 0 && (
					<View style={styles.creditsSection}>
						<Text style={styles.sectionTitle}>Avec</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.creditsRow}>
							{credits.topCast.slice(0, 8).map((actor) => (
								<View key={actor.id} style={styles.creditItem}>
									{actor.profileUrl ? (
										<Image source={{ uri: actor.profileUrl }} style={styles.creditAvatar} contentFit="cover" />
									) : (
										<View style={styles.creditAvatarPlaceholder} />
									)}
									<Text style={styles.creditName} numberOfLines={2}>{actor.name}</Text>
								</View>
							))}
						</ScrollView>
					</View>
				)}

				<View style={styles.providersSection}>
					<Text style={styles.sectionTitle}>Disponible sur</Text>
					<View style={styles.providerModeSwitch}>
						<Pressable
							onPress={() => setPlatformMode('subscription')}
							style={[styles.modeButton, platformMode === 'subscription' && styles.modeButtonActive]}
						>
							<Text style={[styles.modeButtonText, platformMode === 'subscription' && styles.modeButtonTextActive]}>
								Abonnements
							</Text>
						</Pressable>
						<Pressable
							onPress={() => setPlatformMode('purchase')}
							style={[styles.modeButton, platformMode === 'purchase' && styles.modeButtonActive]}
						>
							<Text style={[styles.modeButtonText, platformMode === 'purchase' && styles.modeButtonTextActive]}>
								Achats
							</Text>
						</Pressable>
					</View>
					{isLoadingPlatforms ? (
						<Text style={styles.providersHint}>Chargement des plateformes...</Text>
					) : displayedPlatforms.length === 0 ? (
						<Text style={styles.providersHint}>Aucune plateforme disponible pour la France.</Text>
					) : (
						<View style={styles.providersList}>
							{displayedPlatforms.map((platform) => (
								<View key={platform.id} style={styles.providerCard}>
									{platform.logoUrl ? (
										<Image source={{ uri: platform.logoUrl }} style={styles.providerLogo} contentFit="cover" />
									) : null}
									<Text style={styles.providerName}>{platform.name}</Text>
									<Text style={styles.providerCategories}>
										{platformMode === 'subscription' ? 'Abonnement' : 'Achat / location'}
									</Text>
								</View>
							))}
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
