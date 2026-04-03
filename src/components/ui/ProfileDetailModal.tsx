import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { ActivityIndicator, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import type { Movie, PersonCredit } from '@/types';

import { ms } from './ProfileDetailModal.styles';

// ─── types ───────────────────────────────────────────────────────────────────

interface GenreEntry  { name: string; count: number }
interface ChartEntry  { label: string; value: number }
interface PersonCount extends PersonCredit { count: number }

interface DetailStats {
  total: number;
  avgRating: number;
  topGenre: string;
  decade: number;
  totalGenres: number;
  topGenres: GenreEntry[];
  ratingBuckets: ChartEntry[];
  decadeData: ChartEntry[];
}

// ─── data helpers ────────────────────────────────────────────────────────────

const RATING_BUCKETS = [
  { label: '< 6', min: 0,  max: 6  },
  { label: '6-7', min: 6,  max: 7  },
  { label: '7-8', min: 7,  max: 8  },
  { label: '8-9', min: 8,  max: 9  },
  { label: '9+',  min: 9,  max: 11 },
];

function computeDetailStats(watchlist: Movie[]): DetailStats | null {
  if (watchlist.length === 0) return null;

  const avgRating = watchlist.reduce((s, m) => s + m.rating, 0) / watchlist.length;

  const genreMap = new Map<number, GenreEntry>();
  for (const movie of watchlist) {
    for (const genre of movie.genres) {
      const e = genreMap.get(genre.id);
      if (e) e.count += 1; else genreMap.set(genre.id, { name: genre.name, count: 1 });
    }
  }
  const sortedGenres = Array.from(genreMap.values()).sort((a, b) => b.count - a.count);

  const ratingBuckets = RATING_BUCKETS.map(({ label, min, max }) => ({
    label,
    value: watchlist.filter((m) => m.rating >= min && m.rating < max).length,
  }));

  const decadeMap = new Map<number, number>();
  for (const movie of watchlist) {
    const d = Math.floor(movie.year / 10) * 10;
    decadeMap.set(d, (decadeMap.get(d) ?? 0) + 1);
  }
  const decadeData = Array.from(decadeMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([decade, value]) => ({ label: `${decade}s`, value }));

  const avgYear = watchlist.reduce((s, m) => s + m.year, 0) / watchlist.length;

  return {
    total: watchlist.length,
    avgRating,
    topGenre: sortedGenres[0]?.name ?? '—',
    decade: Math.floor(avgYear / 10) * 10,
    totalGenres: sortedGenres.length,
    topGenres: sortedGenres.slice(0, 6),
    ratingBuckets,
    decadeData,
  };
}

// ─── donut chart ─────────────────────────────────────────────────────────────

const DONUT_SIZE   = 140;
const OUTER_R      = 60;
const INNER_R      = 38;
const GAP           = 0.05; // radians gap between segments
const DONUT_COLORS = ['#ff8e80', '#fdc003', '#7EC8E3', '#A8E6CF', '#C9A0FF', '#FFB347'];

function polarToXY(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad - Math.PI / 2),
    y: cy + r * Math.sin(angleRad - Math.PI / 2),
  };
}

function segmentPath(
  cx: number, cy: number,
  outerR: number, innerR: number,
  startAngle: number, endAngle: number,
): string {
  const o1 = polarToXY(cx, cy, outerR, startAngle);
  const o2 = polarToXY(cx, cy, outerR, endAngle);
  const i2 = polarToXY(cx, cy, innerR, endAngle);
  const i1 = polarToXY(cx, cy, innerR, startAngle);
  const large = endAngle - startAngle > Math.PI ? 1 : 0;
  return [
    `M ${o1.x.toFixed(2)} ${o1.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${o2.x.toFixed(2)} ${o2.y.toFixed(2)}`,
    `L ${i2.x.toFixed(2)} ${i2.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${i1.x.toFixed(2)} ${i1.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

function DonutChart({ genres }: { genres: GenreEntry[] }) {
  const total = genres.reduce((s, g) => s + g.count, 0);
  if (total === 0 || genres.length === 0) return null;

  const cx = DONUT_SIZE / 2;
  const cy = DONUT_SIZE / 2;

  let angle = 0;
  const segments = genres.map((g, i) => {
    const span  = (g.count / total) * Math.PI * 2;
    const start = angle + GAP / 2;
    const end   = angle + span - GAP / 2;
    angle += span;
    return {
      path:  segmentPath(cx, cy, OUTER_R, INNER_R, start, end),
      color: DONUT_COLORS[i % DONUT_COLORS.length] ?? '#ff8e80',
      name:  g.name,
      pct:   Math.round((g.count / total) * 100),
    };
  });

  return (
    <View style={ms.donutRow}>
      <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
        {segments.map((s) => (
          <Path key={s.name} d={s.path} fill={s.color} />
        ))}
      </Svg>
      <View style={ms.donutLegend}>
        {segments.map((s) => (
          <View key={s.name} style={ms.legendItem}>
            <View style={[ms.legendDot, { backgroundColor: s.color }]} />
            <Text style={ms.legendName} numberOfLines={1}>{s.name}</Text>
            <Text style={ms.legendPct}>{s.pct}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── shared primitives ───────────────────────────────────────────────────────

const V_HEIGHT = 90;

function HorizontalBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.max((value / max) * 100, 3) : 3;
  return (
    <View style={ms.hBarRow}>
      <Text style={ms.hBarLabel} numberOfLines={1}>{label}</Text>
      <View style={ms.hBarTrack}>
        <View style={[ms.hBarFill, { width: `${pct}%` as `${number}%` }]} />
      </View>
      <Text style={ms.hBarCount}>{value}</Text>
    </View>
  );
}

function VerticalBars({ data }: { data: ChartEntry[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <View style={ms.vBarsWrap}>
      {data.map(({ label, value }) => {
        const h = value > 0 ? Math.max((value / max) * V_HEIGHT, 6) : 0;
        return (
          <View key={label} style={ms.vBarItem}>
            <Text style={ms.vBarCount}>{value > 0 ? String(value) : ''}</Text>
            <View style={[ms.vBarTrack, { height: V_HEIGHT }]}>
              <View style={[ms.vBarFill, { height: h }]} />
            </View>
            <Text style={ms.vBarLabel}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

function ChartSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={ms.chartSection}>
      <Text style={ms.chartTitle}>{title}</Text>
      {children}
    </View>
  );
}

const RANKS = ['①', '②', '③', '④', '⑤'];

function RankedList({ data }: { data: PersonCount[] }) {
  return (
    <View style={ms.rankedList}>
      {data.map(({ id, name, count }, i) => (
        <View key={id} style={ms.rankedRow}>
          <Text style={ms.rankedIndex}>{RANKS[i] ?? `${i + 1}.`}</Text>
          <Text style={ms.rankedName} numberOfLines={1}>{name}</Text>
          <View style={ms.rankedBadge}>
            <Text style={ms.rankedCount}>{count} film{count > 1 ? 's' : ''}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function StatGrid({ stats }: { stats: DetailStats }) {
  const items = [
    { value: String(stats.total),        label: 'Matchs' },
    { value: stats.avgRating.toFixed(1), label: 'Note moy.' },
    { value: stats.topGenre,             label: 'Top genre' },
    { value: `${stats.decade}s`,         label: 'Décennie fav.' },
    { value: String(stats.totalGenres),  label: 'Genres vus' },
  ];
  return (
    <View style={ms.statGrid}>
      {items.map(({ value, label }) => (
        <View key={label} style={ms.statCell}>
          <Text style={ms.statCellValue}>{value}</Text>
          <Text style={ms.statCellLabel}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── modal ───────────────────────────────────────────────────────────────────

interface Props {
  visible: boolean;
  onClose: () => void;
  watchlist: Movie[];
  topActors: PersonCount[];
  topDirectors: PersonCount[];
  creditsLoading: boolean;
}

export default function ProfileDetailModal({
  visible, onClose, watchlist, topActors, topDirectors, creditsLoading,
}: Props) {
  const stats = useMemo(() => computeDetailStats(watchlist), [watchlist]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <SafeAreaView style={ms.container}>

        <View style={ms.header}>
          <Text style={ms.headerTitle}>Analyse détaillée</Text>
          <Pressable onPress={onClose} style={ms.closeBtn} accessibilityLabel="Fermer">
            <Ionicons name="close" size={20} color="#ffffff" />
          </Pressable>
        </View>

        {!stats ? (
          <View style={ms.empty}>
            <Text style={ms.emptyText}>Aucune donnée disponible.</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={ms.scrollContent} showsVerticalScrollIndicator={false}>

            <StatGrid stats={stats} />

            {/* Donut : répartition des genres */}
            <ChartSection title="Répartition des genres">
              <DonutChart genres={stats.topGenres} />
            </ChartSection>

            {/* Barres verticales : notes */}
            <ChartSection title="Distribution des notes">
              <VerticalBars data={stats.ratingBuckets} />
            </ChartSection>

            {/* Barres horizontales : décennies */}
            {stats.decadeData.length > 0 && (
              <ChartSection title="Films par décennie">
                {stats.decadeData.map(({ label, value }) => (
                  <HorizontalBar
                    key={label}
                    label={label}
                    value={value}
                    max={Math.max(...stats.decadeData.map((d) => d.value))}
                  />
                ))}
              </ChartSection>
            )}

            {/* Crédits */}
            {creditsLoading ? (
              <View style={ms.creditsLoader}>
                <ActivityIndicator size="small" color="#ff8e80" />
                <Text style={ms.creditsLoaderText}>Chargement des crédits…</Text>
              </View>
            ) : (
              <>
                {topActors.length > 0 && (
                  <ChartSection title="Top 5 acteurs">
                    <RankedList data={topActors} />
                  </ChartSection>
                )}
                {topDirectors.length > 0 && (
                  <ChartSection title="Top 3 réalisateurs">
                    <RankedList data={topDirectors} />
                  </ChartSection>
                )}
              </>
            )}

          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
}
