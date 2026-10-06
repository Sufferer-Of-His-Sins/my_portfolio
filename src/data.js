export const profile = {
  name: 'Добро пожаловать на мое портфолио',
  role: 'Всем привет, меня зовут Дмитрий и я студент СибГУТИ, мое направление Информатика и Вычислительная Техника',
  about:'Я пишу код на языке C и C++, интересуюсь сетями, низкоуровневым кодом. Здесь я собрал свои проекты, которые я делал вне учебы.',
  email: 'batucenkodmitrij78@gmail.com',
  github: 'https://github.com/Sufferer-Of-His-Sins',
  telegram: 'https://t.me/Bom_ber_1',

};

export const projects = [
  {
    title: 'Сеть торговых терминалов',
    year: '2026',
    status: 'done',
    tags: ['C', 'Сети'],
    text: 'Клиент-серверная система для сети розничных терминалов.',
    link: 'https://github.com/Sufferer-Of-His-Sins/Trading-Terminal',
    demo: '#demo',
  },
  {
    title: 'Журнал пакетов',
    year: '2026',
    status: 'wip',
    tags: ['C', 'Сети', 'Linux'],
    text: 'Утилита для мониторинга сетевых пакетов.',
  },
  {
    title: 'BSPWM',
    year: '2026',
    status: 'wip',
    tags: ['Shell', 'Linux'],
    text: 'Пользовательский интерфейс для оконного менеджера BSPWM.',
  },
];

export const skills = [
  { title: 'Языки', items: ['C', 'C++', 'Python', 'Shell'] },
  {
    title: 'Системы и сети',
    items: ['Linux', 'Сокеты, клиент-сервер', 'Сетевые протоколы: TCP/IP, модель OSI'],
  },
  {
    title: 'Инструменты',
    items: ['Git, GitLab, GitHub', 'Docker', 'Wireshark'],
  },
  { title: 'ML', items: ['Основы машинного обучения'] },
];