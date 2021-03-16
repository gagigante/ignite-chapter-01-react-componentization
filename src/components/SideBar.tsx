import { useEffect, useState } from 'react';

import { Button } from './Button';

import { api } from '../services/api';

import { GenreResponseProps } from '../App';

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

export function SideBar({ selectedGenreId, handleClickButton }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function updateGenre(genreId: number): void {
    handleClickButton(genreId);
  }

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          id={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => updateGenre(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
  );
}