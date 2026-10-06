export default function Sidebar({ id, title, items, wip }) {
  return (
    <aside id={id} className={'side' + (wip ? ' wip' : '')} aria-label={title}>
      <h2 className="side-title">{title}</h2>
      {items.length === 0 && <p className="empty">Пока пусто</p>}
      {items.map((p) => (
        <article className="proj" key={p.title}>
          <div className="meta">{wip ? `${p.year}, в работе` : p.year}</div>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
          <div className="tags">{p.tags.join(', ')}</div>
          {(p.demo || p.link) && (
            <div className="links">
              {p.demo && <a href={p.demo}>Демо</a>}
              {p.link && <a href={p.link}>GitHub</a>}
            </div>
          )}
        </article>
      ))}
    </aside>
  );
}