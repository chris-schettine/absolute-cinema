'use client';
import { BrowserRouter, Link, useNavigate } from "react-router-dom";

import './index.scss';

export default function Navbar() {
    return(
        <BrowserRouter>
        <nav className="navbar">
            <h1 className="page-title">Filmes</h1>
        <h2>
            <Link to="/">
                Filmes
            </Link>
            <Link to="@/Statistics">
                Estatísticas
            </Link>
        </h2>
        </nav>
        </BrowserRouter>
  );
}