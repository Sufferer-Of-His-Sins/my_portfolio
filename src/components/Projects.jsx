import { useState } from 'react';
import { projects } from '../data.js';
import Trace from './Trace.jsx';
import TerminalDemo from './TerminalDemo.jsx';

const demos = {
  'Журнал пакетов': Trace,
  'Сеть торговых терминалов': TerminalDemo,
};

const isLink = (s) => /^(https?:\/\/|\/)/.test(s);

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

      {shown.map((p) => {
        const Demo = demos[p.title];
        return (
          <article className="story" key={p.title}>
            <div className="meta">{p.status === 'wip' ? `${p.year}, в работе` : p.year}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>

            {p.why && (
              <>
                <h4>Зачем я это делал</h4>
                <p>{p.why}</p>
              </>
            )}

            {p.how && (
              <>
                <h4>Как это делалось</h4>
                <ul>
                  {p.how.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </>
            )}

            {p.image && (
              <figure className="shot">
                {isLink(p.image.src) ? (
                  <img src={p.image.src} alt={p.image.alt} loading="lazy" />
                ) : (
                  <div className="shot-placeholder">{p.image.src}</div>
                )}
                {p.image.caption && <figcaption>{p.image.caption}</figcaption>}
              </figure>
            )}

            <div className="tags">{p.tags.join(', ')}</div>
            {(p.demo || p.link) && (
              <div className="links">
                {p.demo && <a href={p.demo}>Демо</a>}
                {p.link && <a href={p.link}>GitHub</a>}
              </div>
            )}

            {Demo && (
              <div className="demo-block">
                <Demo />
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}