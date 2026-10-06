import { useState, useEffect } from 'react';

const protocols = ['TCP', 'TCP', 'UDP', 'ICMP'];
const addresses = ['192.168.1.12', '192.168.1.40', '10.0.0.5', '10.0.0.17', '172.16.0.3'];
const ports = [22, 53, 80, 443, 8080];
const errors = ['bad checksum', 'RST', 'timeout'];
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function makeLine() {
  const proto = pick(protocols);
  const failed = Math.random() < 0.2;
  const src = pick(addresses);
  let dst = pick(addresses);
  while (dst === src) dst = pick(addresses);
  return {
    id: Math.random(),
    time: new Date().toTimeString().slice(0, 8),
    proto,
    src,
    dst: proto === 'ICMP' ? dst : `${dst}:${pick(ports)}`,
    bytes: Math.floor(Math.random() * 1400) + 40,
    failed,
    reason: failed ? pick(errors) : null,
  };
}

export default function Trace() {
  const [rows, setRows] = useState(() => Array.from({ length: 4 }, makeLine));

  useEffect(() => {
    const timer = setInterval(() => {
      setRows((r) => [...r, makeLine()].slice(-7));
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div aria-hidden="true">
      <div className="trace-title">Журнал пакетов (демо)</div>
      <div className="trace">
        {rows.map((r) => (
          <div key={r.id}>
            <span className="dim">{r.time} </span>
            <b>{r.proto}</b> {r.src} → {r.dst} {r.bytes} B{' '}
            {r.failed ? (
              <span className="err">Error: {r.reason}</span>
            ) : (
              <span className="dim">ok</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}