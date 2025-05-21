'use client'

import Link from 'next/link';

import './index.scss';
import { Jost } from 'next/font/google';
import { useState } from 'react';

const jost = Jost ({
    subsets: ['latin'],
    weight: ['500'],
    variable: '--font-jost',
})

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <header className="header">
            <div className={`navbar ${isOpen ? 'active' : ''}`}>
                <div className="logo">
                    <Link href="/">
                        <img src="/logo.png" className='logo_navbar' alt="Absolute Cinema"></img>
                    </Link>
                </div>

                <div className={jost.className}>
                    <nav className="nav-links">
                        <Link href="/" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link href="/statistics" onClick={() => setIsOpen(false)}>
                            Estatísticas
                        </Link>
                    </nav>
                </div>

                {/* Botão de hambúrguer de volta dentro do .navbar */}
                <button className="hamburger" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </header>
    )
}