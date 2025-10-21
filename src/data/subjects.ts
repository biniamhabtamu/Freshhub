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
    field: 'both',
    isPremium: true,
    description: 'English Language and Literature for Natural Sciences'
  },
  {
    id: 'coc-health',
    name: 'COC Health',
    icon: '🏥',
    field: 'both',
    isPremium: true,
    description: 'Common Course in Health Sciences'
  },
  {
    id: 'psychology-nat',
    name: 'Psychology',
    icon: '🧠',
    field: 'both',
    isPremium: true,
    description: 'Psychological Principles and Applications'
  },
  {
    id: 'logic-nat',
    name: 'Logic',
    icon: '🤔',
    field: 'both',
    isPremium: true,
    description: 'Logical Reasoning and Critical Thinking'
  },
  {
    id: 'anthropology-nat',
    name: 'Anthropology',
    icon: '🏛️',
    field: 'both',
    isPremium: false,
    description: 'Study of Human Culture and Society - FREE'
  },
  {
    id: 'geography-nat',
    name: 'Geography',
    icon: '🌍',
    field: 'both',
    isPremium: false,
    description: 'Physical and Human Geography'
  },
  {
    id: 'entrepreneurship-nat',
    name: 'Entrepreneurship',
    icon: '💼',
    field: 'both',
    isPremium: true,
    description: 'Business Development and Innovation'
  },
  {
    id: 'inclusive-education-nat',
    name: 'Inclusive Education',
    icon: '🎓',
    field: 'both',
    isPremium: true,
    description: 'Special Needs and Inclusive Learning'
  },
  {
    id: 'cpp-nat',
    name: 'C++',
    icon: '💻',
    field: 'both',
    isPremium: true,
    description: 'C++ Programming Language'
  },
  {
    id: 'civic-nat',
    name: 'Civic',
    icon: '🏛️',
    field: 'both',
    isPremium: true,
    description: 'Civic Education and Citizenship'
  },
  {
    id: 'economics-nat',
    name: 'Economics',
    icon: '📈',
    field: 'both',
    isPremium: true,
    description: 'Economic Principles and Theory'
  },
  {
    id: 'emerging-nat',
    name: 'Emerging',
    icon: '🌟',
    field: 'both',
    isPremium: true,
    description: 'Emerging Technologies and Trends'
  },

  // Social Sciences Subjects
  {
    id: 'english-soc',
    name: 'English',
    icon: '📖',
    field: 'social',
    isPremium: true,
    description: 'English Language and Literature for Social Sciences'
  },
  {
    id: 'coc-law',
    name: 'COC Law',
    icon: '⚖️',
    field: 'social',
    isPremium: true,
    description: 'Common Course in Legal Studies'
  },
  {
    id: 'psychology-soc',
    name: 'Psychology',
    icon: '🧠',
    field: 'social',
    isPremium: true,
    description: 'Psychological Principles and Applications'
  },
  {
    id: 'logic-soc',
    name: 'Logic',
    icon: '🤔',
    field: 'social',
    isPremium: true,
    description: 'Logical Reasoning and Critical Thinking'
  },
  {
    id: 'anthropology-soc',
    name: 'Anthropology',
    icon: '🏛️',
    field: 'both',
    isPremium: false,
    description: 'Study of Human Culture and Society - FREE'
  },
  {
    id: 'geography-soc',
    name: 'Geography',
    icon: '🌍',
    field: 'social',
    isPremium: true,
    description: 'Physical and Human Geography'
  },
  {
    id: 'entrepreneurship-soc',
    name: 'Entrepreneurship',
    icon: '💼',
    field: 'social',
    isPremium: true,
    description: 'Business Development and Innovation'
  },
  {
    id: 'inclusive-education-soc',
    name: 'Inclusive Education',
    icon: '🎓',
    field: 'social',
    isPremium: true,
    description: 'Special Needs and Inclusive Learning'
  },
  {
    id: 'cpp-soc',
    name: 'C++',
    icon: '💻',
    field: 'social',
    isPremium: true,
    description: 'C++ Programming Language'
  },
  {
    id: 'civic-soc',
    name: 'Civic',
    icon: '🏛️',
    field: 'social',
    isPremium: true,
    description: 'Civic Education and Citizenship'
  },
  {
    id: 'economics-soc',
    name: 'Economics',
    icon: '📈',
    field: 'social',
    isPremium: true,
    description: 'Economic Principles and Theory'
  },
  {
    id: 'emerging-soc',
    name: 'Emerging',
    icon: '🌟',
    field: 'social',
    isPremium: true,
    description: 'Emerging Technologies and Trends'
  }
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