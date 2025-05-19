'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Jost } from 'next/font/google';

import './index.scss'

import Loading from '../Loading';

const jost = Jost ({
    subsets: ['latin'],
    weight: ['300', '100'],
})

interface Movie {
    id: number;
    title: string;
    genre_ids: number[];
    release_date: string;
    vote_average: number;
}

interface Genre {
    id: number;
    name: string;
}

interface Stats {
    averageRatingByGenre: { genre: string; average: number }[];
    countByGenre: { [genre: string]: number };
    sortedCountByYear: [string, number][];
    trendingInTopRated: Movie[];
}

export default function MovieStatsAdvanced() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetchAndProcessMovies();
    }, []);

    const fetchAndProcessMovies = async () => {
        try {
            const API_KEY = '0ed637ff0d43f711ced0dfaac63b50ec';

            // Buscar lista de gêneros
            const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
                params: { api_key: API_KEY, language: 'pt-BR' },
            });
            const genres: Genre[] = genreResponse.data.genres;

            // Função para mapear genre_id para nome
            const getGenreName = (id: number) => genres.find(g => g.id === id)?.name || 'Desconhecido';

            // Buscar Top Rated
            const topRatedMovies = await fetchTopRatedMoviesUpTo250(API_KEY);

            // Buscar Trending semanal 20 páginas
            const trendingMovies = await fetchTrendingMoviesWeekly(API_KEY, 20);

            // -- Estatística 1: Média de nota por gênero
            const genreRatings: { [genre: string]: number[] } = {};
            topRatedMovies.forEach(movie => {
                movie.genre_ids.forEach(genreId => {
                    const genreName = getGenreName(genreId);
                    if (!genreRatings[genreName]) genreRatings[genreName] = [];
                    genreRatings[genreName].push(movie.vote_average);
                });
            });

            const averageRatingByGenre = Object.entries(genreRatings).map(([genre, votes]) => ({
                genre,
                average: parseFloat((votes.reduce((sum, v) => sum + v, 0) / votes.length).toFixed(2)),
            }));

            // -- Estatística 2: Quantidade de filmes por gênero (Top Rated 250)
            const countByGenre: { [genre: string]: number } = {};
            topRatedMovies.forEach(movie => {
                movie.genre_ids.forEach(genreId => {
                    const genreName = getGenreName(genreId);
                    countByGenre[genreName] = (countByGenre[genreName] || 0) + 1;
                });
            });

            // -- Estatística 3: Quantidade de filmes por ano (Top Rated 250)
            const countByYear: { [year: string]: number } = {};
            topRatedMovies.forEach(movie => {
                const year = movie.release_date?.substring(0, 4) || 'Desconhecido';
                countByYear[year] = (countByYear[year] || 0) + 1;
            });
            const sortedCountByYear = Object.entries(countByYear).sort(([a], [b]) => parseInt(a) - parseInt(b));

            // -- Estatística 4: Quantos dos top 250 estão no trending (nas 20 primeiras páginas semanais)
            const trendingIds = new Set(trendingMovies.map(m => m.id));
            const trendingInTopRated = topRatedMovies.filter(movie => trendingIds.has(movie.id));

            // Atualizar state
            setStats({
                averageRatingByGenre,
                countByGenre,
                sortedCountByYear,
                trendingInTopRated,
            });
        } catch (error) {
            console.error('Erro ao processar filmes:', error);
        }
    };

    // Função para buscar Top Rated até 250
    const fetchTopRatedMoviesUpTo250 = async (apiKey: string): Promise<Movie[]> => {
        const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated';

        let allMovies: Movie[] = [];
        let page = 1;
        let totalPages = 1;

        while (allMovies.length < 250 && page <= totalPages) {
            const response = await axios.get(BASE_URL, {
                params: { api_key: apiKey, language: 'pt-BR', page },
            });

            const data = response.data;
            totalPages = data.total_pages;
            if (data.results) {
                allMovies = allMovies.concat(data.results);
            }

            page++;
        }

        return allMovies.slice(0, 250);
    };

    // Função para buscar Trending (semanal) nas 20 primeiras páginas
    const fetchTrendingMoviesWeekly = async (apiKey: string, maxPages: number): Promise<Movie[]> => {
        const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';

        const promises = [];
        for (let page = 1; page <= maxPages; page++) {
            promises.push(
                axios.get(BASE_URL, {
                    params: { api_key: apiKey, language: 'pt-BR', page },
                })
            );
        }

        const responses = await Promise.all(promises);
        let allMovies: Movie[] = [];
        responses.forEach(response => {
            if (response.data.results) {
                allMovies = allMovies.concat(response.data.results);
            }
        });

        return allMovies;
    };

    return (
        <div className={jost.className}>
            
            {stats ? (
                <div>
                    <h1 className='page_title'>Estatísticas Para Nerds</h1>
                        <div className='resultsList'>
                            <h2>1. Média de Nota por Gênero</h2>
                            <ul>
                                {stats.averageRatingByGenre.map((item) => (
                                    <li key={item.genre}>{item.genre}: {item.average}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='resultsList'>
                            <h2>2. Quantidade de Filmes por Gênero (Top 250)</h2>
                            <ul>
                                {Object.entries(stats.countByGenre).map(([genre, count]) => (
                                    <li key={genre}>{genre}: {count} filmes</li>
                                ))}
                            </ul>
                        </div>
                        <div className='resultsList'>
                            <h2>3. Quantidade de Filmes por Ano (Top 250)</h2>
                            <ul>
                                {stats.sortedCountByYear.map(([year, count]) => (
                                    <li key={year}>{year}: {count} filmes</li>
                                ))}
                            </ul>
                        </div>
                        <div className='resultsList'>
                            <h2>4. Filmes do Top 250 que estão no Trending Semanal</h2>
                            <p>Total: {stats.trendingInTopRated.length}</p>
                            <ul>
                                {stats.trendingInTopRated.map((movie: Movie) => (
                                    <li key={movie.id}>{movie.title}</li>
                                ))}
                            </ul>
                        </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
