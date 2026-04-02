import type { Movie } from '@/types';

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Neon\nEchoes',
    overview:
      "Dans un futur proche, un détective solitaire traque un hacker fantôme à travers les néons d'une mégalopole cyberpunk.",
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&q=80',
    genres: [
      { id: 1, name: 'SciFi' },
      { id: 2, name: 'Thriller' },
    ],
    rating: 8.4,
    year: 2024,
    duration: 124,
    isPremium: true,
  },
  {
    id: 2,
    title: 'The Last\nFrontier',
    overview:
      "Un astronaute perdu aux confins du système solaire doit trouver un moyen de rentrer chez lui avant que ses ressources s'épuisent.",
    posterUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1280&q=80',
    genres: [
      { id: 1, name: 'SciFi' },
      { id: 3, name: 'Drame' },
    ],
    rating: 7.9,
    year: 2023,
    duration: 138,
  },
  {
    id: 3,
    title: 'Crimson\nTide',
    overview:
      "Dans les rues de Barcelone, un détective tente de démêler une conspiration qui remonte à la guerre civile espagnole.",
    posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1280&q=80',
    genres: [
      { id: 2, name: 'Thriller' },
      { id: 4, name: 'Policier' },
    ],
    rating: 8.1,
    year: 2024,
    duration: 112,
    isPremium: true,
  },
  {
    id: 4,
    title: 'Silent\nWaves',
    overview:
      "Une surfeuse professionnelle découvre un secret enfoui sous les eaux turquoise d'une île isolée du Pacifique.",
    posterUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1280&q=80',
    genres: [
      { id: 5, name: 'Aventure' },
      { id: 3, name: 'Drame' },
    ],
    rating: 7.5,
    year: 2023,
    duration: 105,
  },
  {
    id: 5,
    title: 'Iron\nMask',
    overview:
      "Un justicier masqué affronte un syndicat criminel qui a pris le contrôle d'une ville entière depuis les ombres.",
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1280&q=80',
    genres: [
      { id: 6, name: 'Action' },
      { id: 2, name: 'Thriller' },
    ],
    rating: 7.2,
    year: 2024,
    duration: 118,
  },
];
