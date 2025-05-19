import Link from 'next/link';

import './index.scss';
import { Jost } from 'next/font/google';

const jost = Jost ({
    subsets: ['latin'],
    weight: ['500'],
    variable: '--font-jost',
})

export const Header: React.FC = () => {
    return(
        <header className="header">
            <div className="navbar">
                <div className="logo">
                    <Link href="/">
                        <img src="/logo.png" className='logo_navbar' alt="Absolute Cinema"></img>
                    </Link>
                </div>
            
                <div className={jost.className}>
                    <nav className="nav-links">
                        <Link href="/">
                            Home
                        </Link>
                        <Link href="/statistics">
                            Estatísticas
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}