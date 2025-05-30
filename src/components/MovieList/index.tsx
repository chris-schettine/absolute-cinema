'use client';

import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { Jost } from 'next/font/google';
import axios from 'axios';
import MovieCard from '../MovieCard';
import Loading from '../Loading';

import './index.scss';

const jost = Jost ({
    subsets: ['latin'],
    weight: ['300', '100'],
})

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getMoviesUpTo250();
  }, []);

  const getMoviesUpTo250 = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated';

    if (!API_KEY) {
      throw new Error("A variável de ambiente NEXT_PUBLIC_API_KEY não está definida.");
    }

    let allMovies: Movie[] = [];
    let page = 1;
    let totalPages = 1;

    while (allMovies.length < 250 && page <= totalPages) {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page: page,
          },
        });

        const data = response.data;
        totalPages = data.total_pages;

        if (data.results) {
          allMovies = allMovies.concat(data.results);
        }

        page++;
      } catch (error) {
        console.error(`Erro ao buscar página ${page}:`, error);
        break;
      }
    }

    setMovies(allMovies.slice(0, 250));
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={jost.className}>
      <h1 className='page_title'>Os 250 Filmes Mais Bem Avaliados do TMDb</h1>
        <ul className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
    </div>
  );
}
