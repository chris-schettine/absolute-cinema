import { FaFilm } from 'react-icons/fa';
import './index.scss';

export default function Loading() {
  return (
    <div className="loading">
      <FaFilm className="loading__icon" />
      <p className="loading__text">Carregando os melhores filmes...</p>
    </div>
  );
}