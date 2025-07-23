export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  field: 'natural' | 'social';
  isPremium: boolean;
  createdAt: Date;
  avatar?: string;
}

export interface Question {
  id: string;
  subject: string;
  field: 'natural' | 'social';
  year: number;
  type: 'mid' | 'final';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuestionProgress {
  questionId: string;
  answered: boolean;
  correct: boolean;
  attempts: number;
}

export interface TestSession {
  id: string;
  userId: string;
  subject: string;
  questions: Question[];
  answers: Record<string, number>;
  score: number;
  timeSpent: number;
  completed: boolean;
  withTimer: boolean;
  startTime: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  groupId?: string;
  channelId?: string;
}

export interface ChatGroup {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  members: string[];
  createdAt: Date;
  isChannel: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  field: 'natural' | 'social';
  totalScore: number;
  testsCompleted: number;
  averageScore: number;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'ppt' | 'doc';
  fileSize: string;
  subject: string;
  isPremium: boolean;
}

export type Theme = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

export interface AppSettings {
  theme: Theme;
  notifications: boolean;
  soundEnabled: boolean;
  darkMode: boolean;
}