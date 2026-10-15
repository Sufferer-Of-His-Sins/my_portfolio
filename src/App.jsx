import { useState, useEffect } from 'react';
import { profile, projects, skills } from './data.js';
import Sidebar from './components/Sidebar.jsx';
import Projects from './components/Projects.jsx';

export default function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    const dark = theme
      ? theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(dark ? 'light' : 'dark');
  }

  const done = projects.filter((p) => p.status === 'done');
  const wip = projects.filter((p) => p.status === 'wip');

  return (
    <div className="layout">
      <Sidebar title="Готовые проекты" items={done} />

      <div className="main">
        <nav>
          <a className="logo" href="#top">{profile.name}</a>
          <a href="#projects">Проекты</a>
          <a href="#demo">Демо</a>
          <a href="#skills">Навыки</a>
          <a href="#contact">Контакты</a>
          <button className="theme" onClick={toggleTheme}>Тема</button>
        </nav>

        <header className="hero" id="top">
          <h1>{profile.title}</h1>
          <p className="lead">{profile.role}. {profile.about}</p>
          <div>
            <a className="btn" href="#projects">Смотреть проекты</a>
            <a className="btn ghost" href={`mailto:${profile.email}`}>Написать</a>
          </div>
        </header>

        <Projects />

        <section id="skills">
          <h2>Навыки</h2>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.title}>
                <h3>{s.title}</h3>
                <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <footer id="contact">
          <h2>Контакты</h2>
          <p>Почта: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p>GitHub: <a href={profile.github}>{profile.github}</a></p>
          <p>Telegram: <a href={profile.telegram}>{profile.telegram}</a></p>
        </footer>
      </div>

      <Sidebar title="В разработке" items={wip} wip />
    </div>
  );
}