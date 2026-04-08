import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
    gap: 14,
  },

  pageTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.4,
    marginBottom: 4,
  },

  // ── Cards ──────────────────────────────────────
  card: {
    backgroundColor: '#131313',
    borderRadius: 20,
    padding: 18,
    gap: 14,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },

  // ── Empty state (inside card) ──────────────────
  emptyState: {
    paddingVertical: 12,
  },
  emptyStateText: {
    color: '#B0B4BA',
    fontSize: 14,
    lineHeight: 20,
  },

  // ── Stats ──────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 4,
  },
  statValue: {
    color: '#ff8e80',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  statLabel: {
    color: '#B0B4BA',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#262626',
  },

  // ── Separator ──────────────────────────────────
  separator: {
    height: 1,
    backgroundColor: '#262626',
    marginVertical: 2,
  },

  // ── Genre chips ────────────────────────────────
  sectionLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHint: {
    color: '#B0B4BA',
    fontSize: 12,
    lineHeight: 17,
    marginTop: -8,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 999,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 7,
    gap: 6,
  },
  chipActive: {
    backgroundColor: '#ff8e80',
  },
  chipText: {
    color: '#B0B4BA',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  chipBadge: {
    backgroundColor: '#363636',
    borderRadius: 999,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  chipBadgeActive: {
    backgroundColor: '#c4614f',
  },
  chipBadgeText: {
    color: '#B0B4BA',
    fontSize: 11,
    fontWeight: '700',
  },
  chipBadgeTextActive: {
    color: '#ffffff',
  },

  // ── Settings rows ──────────────────────────────
  soonCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  settingsRowDisabled: {
    opacity: 0.5,
  },
  settingsIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIconWrapDisabled: {
    backgroundColor: '#1a1a1a',
  },
  settingsLabel: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  settingsLabelDisabled: {
    color: '#555',
  },
  soonBadge: {
    backgroundColor: '#1E1E1E',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  soonText: {
    color: '#B0B4BA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  editBadge: {
    backgroundColor: '#1c1700',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#fdc003',
  },
  editText: {
    color: '#fdc003',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#1E1E1E',
    marginLeft: 46,
  },

  // ── Top acteurs (card preview) ────────────────────────────
  actorsSection: {
    gap: 10,
  },
  actorsLoader: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  actorsEmpty: {
    color: '#B0B4BA',
    fontSize: 12,
  },
  actorsList: {
    gap: 8,
  },
  actorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actorRank: {
    color: '#ff8e80',
    fontSize: 15,
    fontWeight: '800',
    width: 22,
    textAlign: 'center',
  },
  actorName: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  actorBadge: {
    backgroundColor: '#262626',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  actorBadgeText: {
    color: '#B0B4BA',
    fontSize: 11,
    fontWeight: '700',
  },

  // ── Modale de confirmation ────────────────────────────────
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#131313',
    borderRadius: 20,
    padding: 24,
    gap: 12,
    width: '100%',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  modalBody: {
    color: '#B0B4BA',
    fontSize: 14,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  modalBtnCancel: {
    flex: 1,
    backgroundColor: '#262626',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  modalBtnCancelText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  modalBtnConfirm: {
    flex: 1,
    backgroundColor: '#3a0f0d',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  modalBtnConfirmText: {
    color: '#ff5a4a',
    fontSize: 15,
    fontWeight: '700',
  },

  // ── "+ de détails" button ──────────────────────────────────
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 999,
    marginTop: 2,
  },
  detailsButtonText: {
    color: '#ff8e80',
    fontSize: 13,
    fontWeight: '700',
  },
});
