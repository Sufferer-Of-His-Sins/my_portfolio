import { useState } from 'react';
import { projects } from '../data.js';

export default function Projects() {
  const [filter, setFilter] = useState('Все');

  const tags = ['Все', ...new Set(projects.flatMap((p) => p.tags))];
  const shown = projects.filter((p) => filter === 'Все' || p.tags.includes(filter));

  return (
    <section id="projects">
      <h2>Проекты</h2>
      <div className="filters">
        {tags.map((t) => (
          <button
            key={t}
            className="chip"
            aria-pressed={t === filter}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {shown.map((p) => (
        <article className="proj" key={p.title}>
          <div className="meta">{p.year}</div>
          <div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <div className="tags">{p.tags.join(', ')}</div>
          </div>
        </article>
      ))}
    </section>
  );
}
