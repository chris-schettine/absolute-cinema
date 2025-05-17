import Link from 'next/link';

import './index.scss';

export const Header: React.FC = () => {
    return(
        <header className="navbar bg-base-100">
            <div className="navbar-start px-3">
                <Link href="/">
                    LOGO
                </Link>
            </div>

            <div className="navbar-end">
                <div className='px-3'>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/statistics">
                        Estatísticas
                    </Link>
                </div>
            </div>
        </header>
    )
}