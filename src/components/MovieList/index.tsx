'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';

import { Jost } from 'next/font/google';

const jost = Jost ({
    subsets: ['latin'],
    weight: ['300', '100'],
})

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getMoviesUpTo250();
    }, []);

    const getMoviesUpTo250 = async () => {
        const API_KEY = '0ed637ff0d43f711ced0dfaac63b50ec';
        const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated';

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
                    }
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

        // Garante que terá no máximo 250 filmes
        setMovies(allMovies.slice(0, 250));
    };

    return (
        <ul className="movie-list">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </ul>
    );
}
