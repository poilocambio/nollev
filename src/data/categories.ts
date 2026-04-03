import { CategoryMeta } from '@/lib/types'

export const categories: CategoryMeta[] = [
  {
    id: 'audio',
    label: 'Audio e impianti',
    description: 'Casse · Mixer · Sistemi PA',
    icon: '🔊',
    keywords: ['casse', 'mixer', 'microfoni', 'sistemi PA', 'audio', 'impianto audio'],
  },
  {
    id: 'visual',
    label: 'Visual e ledwall',
    description: 'Ledwall · Proiettori · Schermi',
    icon: '📺',
    keywords: ['ledwall', 'proiettori', 'schermi', 'video', 'videowall'],
  },
  {
    id: 'illuminazione',
    label: 'Illuminazione',
    description: 'Luci · Luminarie · Fari',
    icon: '💡',
    keywords: ['luci', 'luminarie', 'fari', 'illuminazione', 'gobos', 'LED'],
  },
  {
    id: 'strutture',
    label: 'Strutture',
    description: 'Tensostrutture · Gazebo · Palchi',
    icon: '⛺',
    keywords: ['tensostrutture', 'gazebo', 'palchi', 'ponteggi', 'strutture'],
  },
  {
    id: 'arredi',
    label: 'Arredi',
    description: 'Tavoli · Sedie · Divani',
    icon: '🪑',
    keywords: ['tavoli', 'sedie', 'divani', 'ombrelloni', 'arredo'],
  },
  {
    id: 'strumenti',
    label: 'Strumenti musicali',
    description: 'Pianoforti · Amplificatori',
    icon: '🎹',
    keywords: ['pianoforte', 'amplificatori', 'monitor', 'strumenti'],
  },
]