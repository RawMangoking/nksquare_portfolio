import type { ImageMetadata } from 'astro';
import melbourneGold from '../assets/proof/melbourne-design-awards-gold.png';
import googleCloud from '../assets/proof/google-cloud-launchpad.png';
import booth from '../assets/misc/raikan-ilmu-booth.jpg';

export type Rarity = 'legendary' | 'epic' | 'rare' | 'uncommon';
export type Icon = 'trophy' | 'chip' | 'stage' | 'cloud' | 'banner' | 'globe' | 'hand' | 'cap';

export interface Achievement {
  title: string;
  text: string;
  rarity: Rarity;
  icon: Icon;
  status: 'achieved' | 'in-progress';
  when: string;
  proof?: { image: ImageMetadata; caption: string };
  href?: string;
}

export const achievements: Achievement[] = [
  {
    title: 'Gold, Melbourne Design Awards 2026',
    text: 'Team member on Saber, SUTD’s quadruped robot, which won Gold in Product Design – Technology – International (Better Future Awards).',
    rarity: 'legendary',
    icon: 'trophy',
    status: 'achieved',
    when: '2026',
    proof: { image: melbourneGold, caption: 'Melbourne Design Awards 2026 Gold certificate for Saber, listing the project team.' },
  },
  {
    title: 'Research intern, SUTD ROAR Lab',
    text: 'Built secondary control systems on an STM32 for Saber, including its failsafe mechanism.',
    rarity: 'epic',
    icon: 'chip',
    status: 'achieved',
    when: 'May–Jul 2026',
    href: '/logs/sutd-roar-lab/',
  },
  {
    title: 'Volunteer, Raikan Ilmu 2026',
    text: 'Showcased Saber to the public at Our Tampines Hub, Singapore, and answered visitors’ questions.',
    rarity: 'epic',
    icon: 'stage',
    status: 'achieved',
    when: '2026',
    proof: { image: booth, caption: 'The SUTD booth at Raikan Ilmu 2026, with Saber at the front left.' },
  },
  {
    title: 'Google Cloud Career Launchpad',
    text: 'Completed all courses and labs in the Cloud Engineer track.',
    rarity: 'rare',
    icon: 'cloud',
    status: 'achieved',
    when: 'Dec 2025',
    proof: { image: googleCloud, caption: 'Google Cloud Career Launchpad, Cloud Engineer track. Certificate ID OHgm8ODw.' },
  },
  {
    title: 'Guild Head, Omnia',
    text: 'Led the SNU Chennai campus club for animal welfare, environmental care and inclusion.',
    rarity: 'rare',
    icon: 'banner',
    status: 'achieved',
    when: 'SNU Chennai',
  },
  {
    title: 'Explorer',
    text: 'Visited 13 countries across four continents and tried the local food in each.',
    rarity: 'uncommon',
    icon: 'globe',
    status: 'achieved',
    when: 'Ongoing',
    href: '/profile/#explorer',
  },
  {
    title: 'Finish the capstone',
    text: 'Train and test the door-opening robot hand on doors it has never seen.',
    rarity: 'epic',
    icon: 'hand',
    status: 'in-progress',
    when: '4 of 7 objectives done',
    href: '/creations/capstone-door-manipulation/',
  },
  {
    title: 'Graduate',
    text: 'Complete the B.Tech in Computer Science (IoT) at Shiv Nadar University Chennai.',
    rarity: 'rare',
    icon: 'cap',
    status: 'in-progress',
    when: '2027',
  },
];
