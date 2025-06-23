export interface Project {
  id: string
  slug: string
  title: string
  description: string
  category: string
  year: string
  color: string
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'mama-mangos',
    title: 'Mama Mango\'s',
    description: 'More Than Just A Bakery',
    category: 'Branding',
    year: '2024',
    color: '#FFB800',
  },
  {
    id: '2',
    slug: 'lifelog',
    title: 'LifeLog',
    description: 'Turn Daily Snaps Into Lifelong Memories',
    category: 'UX/UI Design',
    year: '2024',
    color: '#4A90E2',
  },
  {
    id: '3',
    slug: 'odu-impact-report',
    title: 'ODU Student Recreation & Wellness Center',
    description: 'Impact Report 2025',
    category: 'Editorial Design',
    year: '2024',
    color: '#2ECC71',
  },
  {
    id: '4',
    slug: 'odu-works',
    title: 'ODU Student Recreation & Wellness Center',
    description: 'Works',
    category: 'Editorial Design',
    year: '2024',
    color: '#E74C3C',
  },
  {
    id: '5',
    slug: 'quickway',
    title: 'QuickWay',
    description: 'Say Goodbye to Bus Confusions',
    category: 'UX/UI Design',
    year: '2024',
    color: '#9B59B6',
  },
  {
    id: '6',
    slug: 'brand-guidelines',
    title: 'Department of Graphic Design',
    description: 'Brand Guidelines',
    category: 'Branding',
    year: '2024',
    color: '#34495E',
  },
  {
    id: '7',
    slug: 'utilitarian',
    title: 'Utilitarian',
    description: 'Typography Exploration',
    category: 'Typography',
    year: '2023',
    color: '#16A085',
  },
  {
    id: '8',
    slug: 'ube-cold-brew',
    title: 'Ube Cold Brew',
    description: 'From Bean to Screen',
    category: 'Packaging Design',
    year: '2023',
    color: '#8E44AD',
  },
  {
    id: '9',
    slug: 'shiori',
    title: 'Shiori',
    description: 'The Art of Simplicity',
    category: 'Branding',
    year: '2023',
    color: '#D35400',
  },
  {
    id: '10',
    slug: 'vibeify',
    title: 'Vibeify',
    description: 'Your City, Your Sound',
    category: 'UX/UI Design',
    year: '2023',
    color: '#27AE60',
  },
]