'use client'

import { useEffect, useState } from 'react';
import './index.scss'
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/movie/top_rated',
            params: {
                api_key: '0ed637ff0d43f711ced0dfaac63b50ec',
                language: 'pt-BR',
                page: '1',
            }
        }).then(response => {
            setMovies(response.data.results);
        })
    }

    getMovies();

    return(
        <ul className="movie-list">
            {movies.map((movie) =>
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    );
}