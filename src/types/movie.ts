export interface Movie {
  id: number,
  title: string,
  poster_path: string,
  overview: string,
  vote_average: number,
}

export type Genre = {
  id: number;
  name: string;
};