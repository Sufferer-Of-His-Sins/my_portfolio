import { useState, useRef, useEffect } from 'react';

const terminals = [
  { id: 'POS-01', y: 40 },
  { id: 'POS-02', y: 110 },
  { id: 'POS-03', y: 180 },
];
const SERVER = { x: 260, y: 110 };
const DB = { x: 480, y: 110 };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function TerminalDemo() {
  const [selected, setSelected] = useState(0);
  const [dbDown, setDbDown] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pkt, setPkt] = useState({ x: 140, y: 40, show: false, failed: false, instant: true });
  const [log, setLog] = useState([]);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  const add = (text, err) =>
    setLog((l) => [...l, { id: Math.random(), text, err }].slice(-8));

  async function go(pos, text, err) {
    if (!alive.current) return false;
    setPkt((p) => ({ ...p, ...pos }));
    add(text, err);
    await wait(750);
    return alive.current;
  }

  async function send() {
    if (busy) return;
    setBusy(true);
    const t = terminals[selected];
    const bytes = Math.floor(Math.random() * 300) + 60;
    const down = dbDown;

    setPkt({ x: 140, y: t.y, show: false, failed: false, instant: true });
    await wait(50);
    setPkt((p) => ({ ...p, show: true }));
    await wait(50);
    setPkt((p) => ({ ...p, instant: false }));
    await wait(30);

    if (!(await go(SERVER, `${t.id} → сервер: sale ${bytes} B`, false))) return;
    if (!(await go(DB, 'сервер → база данных: запись операции', false))) return;
    if (!(await go({ ...SERVER, failed: down },
      down ? 'база данных → сервер: Error: нет ответа' : 'база данных → сервер: ok', down))) return;
    if (!(await go({ x: 140, y: t.y },
      down ? `сервер → ${t.id}: Error: база данных недоступна` : `сервер → ${t.id}: ok`, down))) return;

    setPkt((p) => ({ ...p, show: false }));
    setBusy(false);
  }

  return (
    <section id="demo">
      <h2>Как работает сеть терминалов</h2>
      <p className="lead">
        Терминал отправляет операцию серверу, сервер записывает её в базу данных и
        возвращает терминалу результат.
      </p>

      <svg className="diagram" viewBox="0 0 600 220"
        role="img" aria-label="Схема: терминалы отправляют операции на сервер, сервер записывает их в базу данных">
        {terminals.map((t, i) => (
          <g key={t.id}>
            <line className="edge" x1="140" y1={t.y} x2="260" y2="110" />
            <rect className={'node' + (i === selected ? ' on' : '')} x="20" y={t.y - 20} width="120" height="40" rx="6" />
            <text x="80" y={t.y + 5} textAnchor="middle">{t.id}</text>
          </g>
        ))}
        <line className="edge" x1="360" y1="110" x2="480" y2="110" />
        <rect className="node" x="260" y="70" width="100" height="80" rx="6" />
        <text x="310" y="115" textAnchor="middle">Сервер</text>
        <rect className={'node' + (dbDown ? ' bad' : '')} x="480" y="70" width="100" height="80" rx="6" />
        <text x="530" y="115" textAnchor="middle">База данных</text>
        <g style={{
          transform: `translate(${pkt.x}px, ${pkt.y}px)`,
          opacity: pkt.show ? 1 : 0,
          transition: pkt.instant ? 'none' : 'transform 0.7s ease, opacity 0.2s',
        }}>
          <circle r="8" className={pkt.failed ? 'pkt bad' : 'pkt'} />
        </g>
      </svg>

      <div className="controls">
        <div className="filters" role="group" aria-label="Выбор терминала">
          {terminals.map((t, i) => (
            <button key={t.id} className="chip" aria-pressed={i === selected}
              disabled={busy} onClick={() => setSelected(i)}>{t.id}</button>
          ))}
        </div>
        <label className="check">
          <input type="checkbox" checked={dbDown} disabled={busy}
            onChange={(e) => setDbDown(e.target.checked)} />
          Имитировать сбой БД
        </label>
        <button className="btn" disabled={busy} onClick={send}>Отправить операцию</button>
      </div>

      <div className="trace" aria-live="polite">
        {log.length === 0 && <span className="dim">Журнал пуст. Нажмите "Отправить операцию".</span>}
        {log.map((l) => (
          <div key={l.id} className={l.err ? 'err' : ''}>{l.text}</div>
        ))}
      </div>
      <p className="note">Демо показывает общую схему "терминал - сервер - база данных", обмен в нём упрощён.</p>
    </section>
  );
}