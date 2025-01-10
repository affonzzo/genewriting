import { useState, useCallback, useRef, useEffect } from 'react';
import { BombWritingTimer } from '../utils/bomb-writing/timer';
import { calculateStats } from '../utils/bomb-writing/stats';
import { BombWritingSettings, BombWritingState, BombWritingStats } from '../utils/bomb-writing/types';

export function useBombWriting(
  settings: BombWritingSettings,
  onVictory: (stats: BombWritingStats) => void,
  onDefeat: () => void
) {
  const [state, setState] = useState<BombWritingState>({
    isSessionActive: false,
    timeLeft: settings.totalTime * 60,
    pauseTimeLeft: settings.maxPauseTime,
    currentContent: ''
  });

  const timerRef = useRef<BombWritingTimer>();
  const startTimeRef = useRef<number>();
  const activeTimeRef = useRef<number>(0);
  const lastTypeRef = useRef<number>();
  const contentRef = useRef<string>('');

  const handleTick = useCallback((timeLeft: number) => {
    setState(prev => ({ ...prev, timeLeft }));
  }, []);

  const handlePauseTick = useCallback((pauseTimeLeft: number) => {
    setState(prev => ({ ...prev, pauseTimeLeft }));
  }, []);

  const handleExplosion = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.stopTimers();
    }
    setState(prev => ({ ...prev, isSessionActive: false }));
    onDefeat();
  }, [onDefeat]);

  const handleComplete = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.stopTimers();
    }

    // Adiciona o último intervalo de digitação ao tempo ativo
    const now = Date.now();
    if (lastTypeRef.current) {
      activeTimeRef.current += (now - lastTypeRef.current) / 1000;
    }

    const activeWritingTime = activeTimeRef.current;
    const { wordsCount, averageWPM } = calculateStats(state.currentContent, activeWritingTime);
    
    setState(prev => ({ ...prev, isSessionActive: false }));
    onVictory({ wordsCount, averageWPM, activeWritingTime });
  }, [state.currentContent, onVictory]);

  const startSession = useCallback(() => {
    timerRef.current = new BombWritingTimer(
      handleTick,
      handlePauseTick,
      handleExplosion,
      handleComplete
    );

    startTimeRef.current = Date.now();
    activeTimeRef.current = 0;
    lastTypeRef.current = Date.now();
    contentRef.current = '';

    setState({
      isSessionActive: true,
      timeLeft: settings.totalTime * 60,
      pauseTimeLeft: settings.maxPauseTime,
      currentContent: ''
    });

    timerRef.current.startSession(settings.totalTime * 60);
    timerRef.current.startPauseCountdown(settings.maxPauseTime);
  }, [settings, handleTick, handlePauseTick, handleExplosion, handleComplete]);

  const handleType = useCallback((content: string) => {
    if (!state.isSessionActive || !timerRef.current) return;

    // Verifica se houve mudança real no conteúdo
    if (content === contentRef.current) return;
    
    // Primeiro reseta o timer de pausa e atualiza o estado
    if (timerRef.current) {
      timerRef.current.resetPauseCountdown();
      setState(prev => ({ 
        ...prev, 
        currentContent: content,
        pauseTimeLeft: settings.maxPauseTime 
      }));
    }
    
    // Atualiza o conteúdo de referência
    contentRef.current = content;

    const now = Date.now();
    if (lastTypeRef.current) {
      activeTimeRef.current += (now - lastTypeRef.current) / 1000;
    }
    lastTypeRef.current = now;

    // Inicia o timer de pausa imediatamente
    if (timerRef.current && state.isSessionActive) {
      timerRef.current.startPauseCountdown(settings.maxPauseTime);
    }
  }, [state.isSessionActive, settings.maxPauseTime]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        timerRef.current.stopTimers();
      }
    };
  }, []);

  const resetSession = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.stopTimers();
      timerRef.current = undefined;
    }
    
    // Reseta todas as refs
    startTimeRef.current = undefined;
    activeTimeRef.current = 0;
    lastTypeRef.current = undefined;
    contentRef.current = '';

    // Reseta o estado
    setState({
      isSessionActive: false,
      timeLeft: settings.totalTime * 60,
      pauseTimeLeft: settings.maxPauseTime,
      currentContent: ''
    });
  }, [settings]);

  return {
    state,
    startSession,
    handleType,
    resetSession
  };
}