import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../data/communityData';
const DEFAULT_ACTION_POINTS = {
    post: 10,
    reply: 5,
    answer: 15,
    accepted: 50,
    event: 20,
};
const ACTION_DESCRIPTIONS = {
    post: '发布帖子',
    reply: '回复帖子',
    answer: '回答问题',
    accepted: '回答被采纳',
    event: '参加活动',
};
export function getActionPoints() {
    try {
        const raw = localStorage.getItem('yuletech-point-rules');
        if (raw) {
            const parsed = JSON.parse(raw);
            return { ...DEFAULT_ACTION_POINTS, ...parsed };
        }
    }
    catch {
        // ignore
    }
    return { ...DEFAULT_ACTION_POINTS };
}
const DEFAULT_LEVEL_THRESHOLDS = [
    { level: 1, title: '初级工程师', min: 0, max: 100 },
    { level: 2, title: '中级工程师', min: 101, max: 500 },
    { level: 3, title: '高级工程师', min: 501, max: 2000 },
    { level: 4, title: '技术专家', min: 2001, max: Infinity },
];
export function getLevelThresholds() {
    try {
        const raw = localStorage.getItem('yuletech-level-thresholds');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed.map((t) => ({
                    ...t,
                    max: t.max ?? Infinity,
                }));
            }
        }
    }
    catch {
        // ignore
    }
    return [...DEFAULT_LEVEL_THRESHOLDS];
}
export function getLevelInfo(points) {
    const thresholds = getLevelThresholds();
    for (const t of thresholds) {
        if (points >= t.min && (t.max === Infinity || points <= t.max)) {
            return { ...t };
        }
    }
    return { ...thresholds[thresholds.length - 1] };
}
export function useUserSystem() {
    const [state, setState] = useLocalStorage('yuletech-user-system', {
        points: 0,
        history: [],
    });
    const addPoints = useCallback((action, description) => {
        const actionPoints = getActionPoints();
        const points = actionPoints[action];
        const item = {
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
    const setPoints = useCallback((points) => {
        setState((prev) => ({
            ...prev,
            points: Math.max(0, points),
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
        setPoints,
    };
}
export { DEFAULT_ACTION_POINTS, DEFAULT_LEVEL_THRESHOLDS };
