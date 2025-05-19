export type Stats = {
  averageRatingByGenre: {
    [genre: string]: number; // ex: { "Ação": 7.5 }
  };
  countByGenre: {
    [genre: string]: number; // ex: { "Drama": 25 }
  };
  sortedCountByYear: {
    [year: string]: number; // ex: { "2021": 18 }
  };
  trendingInTopRated: {
    id: number;
    title: string;
  }[]; // filmes que estão tanto nos top-rated quanto nos trending
};
