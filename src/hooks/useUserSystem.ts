import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../data/communityData';

export type PointsAction = 'post' | 'reply' | 'answer' | 'accepted' | 'event';

export interface PointsHistoryItem {
  id: string;
  action: PointsAction;
  description: string;
  points: number;
  timestamp: string;
}

export interface UserSystemState {
  points: number;
  history: PointsHistoryItem[];
}

const ACTION_POINTS: Record<PointsAction, number> = {
  post: 10,
  reply: 5,
  answer: 15,
  accepted: 50,
  event: 20,
};

const ACTION_DESCRIPTIONS: Record<PointsAction, string> = {
  post: '发布帖子',
  reply: '回复帖子',
  answer: '回答问题',
  accepted: '回答被采纳',
  event: '参加活动',
};

export function getLevelInfo(points: number) {
  if (points <= 100) return { level: 1, title: '初级工程师', min: 0, max: 100 };
  if (points <= 500) return { level: 2, title: '中级工程师', min: 101, max: 500 };
  if (points <= 2000) return { level: 3, title: '高级工程师', min: 501, max: 2000 };
  return { level: 4, title: '技术专家', min: 2001, max: Infinity };
}

export function useUserSystem() {
  const [state, setState] = useLocalStorage<UserSystemState>('yuletech-user-system', {
    points: 0,
    history: [],
  });

  const addPoints = useCallback((action: PointsAction, description?: string) => {
    const points = ACTION_POINTS[action];
    const item: PointsHistoryItem = {
      id: generateId('pts'),
      action,
      description: description || ACTION_DESCRIPTIONS[action],
      points,
      timestamp: new Date().toISOString(),
    };
    setState((prev) => ({
      points: prev.points + points,
      history: [item, ...prev.history],
    }));
  }, [setState]);

  const levelInfo = getLevelInfo(state.points);

  return {
    points: state.points,
    history: state.history,
    level: levelInfo.level,
    title: levelInfo.title,
    min: levelInfo.min,
    max: levelInfo.max,
    addPoints,
  };
}
