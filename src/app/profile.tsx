import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

import ProfileDetailModal from '@/components/ui/ProfileDetailModal';
import { fetchMovieCredits } from '@/services/tmdbService';
import { useAppStore } from '@/store/useAppStore';
import type { Movie, PersonCredit } from '@/types';

import { styles } from './profile.styles';

// ─── types ───────────────────────────────────────────────────────────────────

interface PersonCount extends PersonCredit { count: number }

interface ProfileStats {
  total: number;
  avgRating: number;
  topGenre: string;
  decade: number;
  sortedGenres: { id: number; name: string; count: number }[];
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function computeStats(watchlist: Movie[]): ProfileStats | null {
  if (watchlist.length === 0) return null;

  const avgRating = watchlist.reduce((s, m) => s + m.rating, 0) / watchlist.length;

  const genreMap = new Map<number, string>();
  const genreCount = new Map<number, number>();
  for (const movie of watchlist) {
    for (const genre of movie.genres) {
      genreMap.set(genre.id, genre.name);
      genreCount.set(genre.id, (genreCount.get(genre.id) ?? 0) + 1);
    }
  }
  const sortedGenres = Array.from(genreCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => ({ id, name: genreMap.get(id) ?? '—', count }));
  const topGenreId = sortedGenres[0]?.id;

  const avgYear = watchlist.reduce((s, m) => s + m.year, 0) / watchlist.length;
  const decade = Math.floor(avgYear / 10) * 10;

  return {
    total: watchlist.length,
    avgRating,
    topGenre: topGenreId != null ? (genreMap.get(topGenreId) ?? '—') : '—',
    decade,
    sortedGenres,
  };
}

// ─── credits hook (shared by card + modal) ───────────────────────────────────

function useWatchlistCredits(watchlist: Movie[]) {
  const [loading, setLoading] = useState(false);
  const [topActors, setTopActors] = useState<PersonCount[]>([]);
  const [topDirectors, setTopDirectors] = useState<PersonCount[]>([]);
  const fetchedKey = useRef('');

  useEffect(() => {
    if (watchlist.length === 0) return;
    const key = watchlist.map((m) => m.id).join(',');
    if (fetchedKey.current === key) return;

    let cancelled = false;
    setLoading(true);

    Promise.all(watchlist.map((m) => fetchMovieCredits(m.id)))
      .then((allCredits) => {
        if (cancelled) return;
        const actorMap = new Map<number, PersonCount>();
        const dirMap = new Map<number, PersonCount>();

        allCredits.forEach(({ topCast, directors }) => {
          topCast.forEach(({ id, name }) => {
            const e = actorMap.get(id);
            if (e) e.count += 1; else actorMap.set(id, { id, name, count: 1 });
          });
          directors.forEach(({ id, name }) => {
            const e = dirMap.get(id);
            if (e) e.count += 1; else dirMap.set(id, { id, name, count: 1 });
          });
        });

        setTopActors(Array.from(actorMap.values()).sort((a, b) => b.count - a.count).slice(0, 5));
        setTopDirectors(Array.from(dirMap.values()).sort((a, b) => b.count - a.count).slice(0, 3));
        fetchedKey.current = key;
      })
      .catch(() => { if (!cancelled) { setTopActors([]); setTopDirectors([]); } })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [watchlist]);

  return { loading, topActors, topDirectors };
}

// ─── sub-components ──────────────────────────────────────────────────────────

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const RANKS = ['①', '②', '③'];

function TopActorsPreview({
  actors,
  loading,
}: {
  actors: PersonCount[];
  loading: boolean;
}) {
  return (
    <View style={styles.actorsSection}>
      <Text style={styles.sectionLabel}>Top acteurs</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#ff8e80" style={styles.actorsLoader} />
      ) : actors.length === 0 ? (
        <Text style={styles.actorsEmpty}>Chargement des crédits…</Text>
      ) : (
        <View style={styles.actorsList}>
          {actors.slice(0, 3).map(({ id, name, count }, i) => (
            <View key={id} style={styles.actorRow}>
              <Text style={styles.actorRank}>{RANKS[i]}</Text>
              <Text style={styles.actorName} numberOfLines={1}>{name}</Text>
              <View style={styles.actorBadge}>
                <Text style={styles.actorBadgeText}>{count} film{count > 1 ? 's' : ''}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const SETTINGS_ITEMS = [
  { icon: 'language-outline' as const, label: 'Langue' },
  { icon: 'earth-outline' as const, label: 'Région' },
  { icon: 'notifications-outline' as const, label: 'Notifications' },
  { icon: 'person-outline' as const, label: 'Compte' },
];

// ─── screen ──────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const watchlistMovieIds = useAppStore((state) => state.watchlistMovieIds);
  const watchlistById = useAppStore((state) => state.watchlistById);

  const watchlist = useMemo(
    () =>
      watchlistMovieIds
        .map((id) => watchlistById[id])
        .filter((movie): movie is Movie => Boolean(movie)),
    [watchlistMovieIds, watchlistById],
  );

  const stats = useMemo(() => computeStats(watchlist), [watchlist]);
  const { loading: creditsLoading, topActors, topDirectors } = useWatchlistCredits(watchlist);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <Text style={styles.pageTitle}>Mon Profil</Text>

        {/* ── Card : Mes préférences ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mes préférences</Text>

          {!stats ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Likez des films dans Découverte pour voir vos préférences apparaître ici.
              </Text>
            </View>
          ) : (
            <>
              {/* Stats */}
              <View style={styles.statsRow}>
                <StatBlock value={String(stats.total)} label="Matchs" />
                <View style={styles.statDivider} />
                <StatBlock value={stats.avgRating.toFixed(1)} label="Note moy." />
                <View style={styles.statDivider} />
                <StatBlock value={stats.topGenre} label="Top genre" />
              </View>
              <View style={styles.statsRow}>
                <StatBlock value={`Années ${stats.decade}`} label="Décennie fav." />
                <View style={styles.statDivider} />
                <StatBlock value={String(stats.sortedGenres.length)} label="Genres vus" />
              </View>

              <View style={styles.separator} />

              {/* Top 3 acteurs */}
              <TopActorsPreview actors={topActors} loading={creditsLoading} />

              {/* + de détails */}
              <Pressable onPress={() => setDetailsVisible(true)} style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>+ de détails</Text>
                <Ionicons name="chevron-forward" size={13} color="#ff8e80" />
              </Pressable>
            </>
          )}
        </View>

        {/* ── Card : Réglages ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Réglages</Text>
          {SETTINGS_ITEMS.map((item, index) => (
            <React.Fragment key={item.label}>
              <View style={styles.settingsRow}>
                <View style={styles.settingsIconWrap}>
                  <Ionicons name={item.icon} size={18} color="#B0B4BA" />
                </View>
                <Text style={styles.settingsLabel}>{item.label}</Text>
                <View style={styles.soonBadge}>
                  <Text style={styles.soonText}>Bientôt</Text>
                </View>
              </View>
              {index < SETTINGS_ITEMS.length - 1 && <View style={styles.rowDivider} />}
            </React.Fragment>
          ))}
        </View>

      </ScrollView>

      <ProfileDetailModal
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        watchlist={watchlist}
        topActors={topActors}
        topDirectors={topDirectors}
        creditsLoading={creditsLoading}
      />
    </SafeAreaView>
  );
}
