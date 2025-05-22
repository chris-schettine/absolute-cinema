export type Stats = {
  averageRatingByGenre: {
    [genre: string]: number;
  };
  countByGenre: {
    [genre: string]: number;
  };
  sortedCountByYear: {
    [year: string]: number;
  };
  trendingInTopRated: {
    id: number;
    title: string;
  }[];
};
