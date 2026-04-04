import { StyleSheet } from 'react-native';

export const ms = StyleSheet.create({
  // ── Modal shell ──────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 20,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#B0B4BA',
    fontSize: 14,
  },

  // ── Stats grid ───────────────────────────────────────────────
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCell: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: '#131313',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
  },
  statCellValue: {
    color: '#ff8e80',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  statCellLabel: {
    color: '#B0B4BA',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    textAlign: 'center',
  },

  // ── Chart section wrapper ────────────────────────────────────
  chartSection: {
    backgroundColor: '#131313',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  chartTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.1,
  },

  // ── Horizontal bar chart ─────────────────────────────────────
  hBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hBarLabel: {
    width: 80,
    color: '#B0B4BA',
    fontSize: 12,
    fontWeight: '600',
  },
  hBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#262626',
    borderRadius: 999,
    overflow: 'hidden',
  },
  hBarFill: {
    height: '100%',
    backgroundColor: '#ff8e80',
    borderRadius: 999,
  },
  hBarCount: {
    width: 24,
    color: '#B0B4BA',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
  },

  // ── Vertical bar chart ───────────────────────────────────────
  vBarsWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 6,
  },
  vBarItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  vBarCount: {
    color: '#ff8e80',
    fontSize: 11,
    fontWeight: '700',
    minHeight: 16,
  },
  vBarTrack: {
    width: '100%',
    backgroundColor: '#262626',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  vBarFill: {
    width: '100%',
    backgroundColor: '#ff8e80',
    borderRadius: 6,
  },
  vBarLabel: {
    color: '#B0B4BA',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ── Donut chart ───────────────────────────────────────────────
  donutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  donutLegend: {
    flex: 1,
    gap: 7,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    flexShrink: 0,
  },
  legendName: {
    flex: 1,
    color: '#B0B4BA',
    fontSize: 12,
    fontWeight: '600',
  },
  legendPct: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    minWidth: 30,
    textAlign: 'right',
  },

  // ── Ranked list (acteurs / réalisateurs) ─────────────────────
  rankedList: {
    gap: 10,
  },
  rankedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rankedIndex: {
    color: '#ff8e80',
    fontSize: 16,
    fontWeight: '800',
    width: 24,
    textAlign: 'center',
  },
  rankedName: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  rankedBadge: {
    backgroundColor: '#262626',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  rankedCount: {
    color: '#B0B4BA',
    fontSize: 12,
    fontWeight: '700',
  },

  // ── Credits loading state ─────────────────────────────────────
  creditsLoader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
  },
  creditsLoaderText: {
    color: '#B0B4BA',
    fontSize: 13,
    fontWeight: '600',
  },
});
