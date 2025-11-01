export interface Subject {
  id: string;
  name: string;
  icon: string;
  field: 'natural' | 'social' | 'both';
  isPremium: boolean;
  description: string;
}

export const subjects: Subject[] = [
  // Natural Sciences Subjects
  {
    id: 'english-nat',
    name: 'English',
    icon: '📚',
    field: 'natural',
    isPremium: true,
    description: 'English Language and Literature for Natural Sciences'
  },
  {
    id: 'math-nat',
    name: 'Math-Natural science',
    icon: '🏥',
    field: 'natural',
    isPremium: true,
    description: 'Common Course in Health Sciences'
  },
  {
    id: 'biology-nat',
    name: 'Biology',
    icon: '🧠',
    field: 'natural',
    isPremium: true,
    description: 'Psychological Principles and Applications'
  },
  {
    id: 'chemistry-nat',
    name: 'Chemistry',
    icon: '🤔',
    field: 'natural',
    isPremium: true,
    description: 'Logical Reasoning and Critical Thinking'
  },
  {
    id: 'physics-nat',
    name: 'Physics',
    icon: '🏛️',
    field: 'natural',
    isPremium: false,
    description: 'Study of Human Culture and Society - FREE'
  },
  {
    id: 'geography-soc',
    name: 'Geography',
    icon: '🌍',
    field: 'social',
    isPremium: false,
    description: 'Physical and Human Geography'
  },
  {
    id: 'historysoc',
    name: 'History',
    icon: '💼',
    field: 'social',
    isPremium: true,
    description: 'Business Development and Innovation'
  },
  {
    id: 'mathsocial-soc',
    name: 'math-social',
    icon: '🎓',
    field: 'social',
    isPremium: true,
    description: 'Special Needs and Inclusive Learning'
  },
  
];

export const getSubjectsByField = (field: 'natural' | 'social') => {
  return subjects.filter(subject => subject.field === field || subject.field === 'both');
};

export const getFreeSubjects = () => {
  return subjects.filter(subject => !subject.isPremium);
};

export const getPremiumSubjects = () => {
  return subjects.filter(subject => subject.isPremium);
};