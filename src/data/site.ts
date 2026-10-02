/**
 * Everything personal lives here. Change a value, save, and every page updates.
 */

export const profile = {
  name: 'Narenkarthik Kesavamoorthy',
  occupation: 'Robotics & embedded systems',
  studyingAt: 'Shiv Nadar University Chennai',
  degree: 'B.Tech CSE (IoT), 2023–2027',
  cgpa: '8.42',
  availability: 'Open to opportunities',
  hobby: 'Playing the flute',
  // Set to a short line in your own words to show it in the left panel.
  motto: null as string | null,
  email: 'narenkarthik21122005tnj@gmail.com',
  github: 'https://github.com/RawMangoking',
  githubHandle: 'RawMangoking',
  linkedin: 'https://www.linkedin.com/in/narenkarthik-kesavamoorthy-8391a0283/',
  steam: 'https://steamcommunity.com/profiles/76561199513364067/',
  steamHandle: 'Mangoraja',
  // Replace the file in public/resume/ to update the download.
  resume: '/resume/Narenkarthik_Kesavamoorthy_Resume.pdf',
};

export const about = {
  paragraph:
    "Outside of engineering, I'm an adventurous person who loves to travel. I've been to 13 countries so far, and what I enjoy most is experiencing different cultures, especially through their food. Some of the more adventurous things I've tried are deer, pufferfish and crocodile, all in Singapore, and one of my favourite discoveries is Ema Datshi, Bhutan's spicy chilli-and-cheese dish. When I want to slow down, I play the flute; it's what gives me peace.",
  guild: {
    title: 'Guild Head, Omnia, SNU Chennai',
    text: 'Led the campus club for animal welfare, environmental care and inclusion.',
  },
};

/** The capstone, shown as the Active Quest on every page. */
export const quest = {
  label: 'Final-year capstone',
  name: 'Door-opening robot hand',
  goal: 'Train a robot hand with reinforcement learning to open a door that feels different each time, with changing friction and weight.',  href: '/creations/capstone-door-manipulation/',
  team: ['Naren Kumar C', 'Lakshmi Narayanan P'],
  mentor: 'Dr. Priya GL',
  objectives: [
    { text: 'Hand and door modelled in SolidWorks', done: true },
    { text: 'Both converted into MuJoCo', done: true },
    { text: 'Keyboard and gamepad control to verify joints', done: true },
    { text: 'RL environment with reach, handle and door stages', done: true },
    { text: 'Randomize the door’s physical parameters', done: false },
    { text: 'Train with fixed vs randomized doors', done: false },
    { text: 'Test on new door conditions', done: false },
    ],
};

/** Travel map. Country ids are ISO 3166 numeric codes. Add a photo later by setting `photo`. */
export const travel: Record<string, { note?: string }> = {
  '826': {},
  '250': {},
  '756': {},
  '276': {},
  '840': {},
  '156': {},
  '064': { note: 'Found my favourite dish here: Ema Datshi.' },
  '144': {},
  '764': {},
  '458': {},
  '702': { note: 'Research internship at SUTD. Tried deer, pufferfish and crocodile.' },
  '784': {},
  '690': {},
};

export const nav = [
  { href: '/', key: 'home', label: 'Beginning', hint: 'Start screen' },
  { href: '/logs/', key: 'logs', label: 'Logs', hint: 'Internships and research' },
  { href: '/achievements/', key: 'achievements', label: 'Achievements', hint: 'Awards and certificates' },
  { href: '/creations/', key: 'creations', label: 'Creations', hint: 'Projects and side quests' },
  { href: '/profile/', key: 'profile', label: 'Profile', hint: 'About me and my travels' },
] as const;

export type NavKey = (typeof nav)[number]['key'];
