'use client';
import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { Tag } from '@/types/note';

const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(true);

  return (
    <div className={css.menuContainer}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/All`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
