import React, { useEffect, useRef, useState } from 'react';
import { catThemes } from './themeStyles';
import { apiFetch } from './lib/api';
import {
  Volume2,
  VolumeX,
  Play,
  ChevronRight,
  Lock,
  Sparkles,
  BookOpen,
  Eye,
  ShieldCheck,
  Home,
  Wind,
  Heart,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const GAME_ASSET_PATH = '/assets/game';

export default function GameScreen({ currentTheme = 'orange' }) {
  const [currentStage, setCurrentStage] = useState('intro');
  const [storyIndex, setStoryIndex] = useState(0);
  const [entranceIndex, setEntranceIndex] = useState(0);
  const [isPlayingBGM, setIsPlayingBGM] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [unlockedLessons, setUnlockedLessons] = useState([1]);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [gameMessage, setGameMessage] = useState('');
  const [selectedSafetyAnswer, setSelectedSafetyAnswer] = useState(null);
  const [safetyCheckFeedback, setSafetyCheckFeedback] = useState('');
  const [wrongAnswerPopup, setWrongAnswerPopup] = useState(null);
  const [hasStartedLessonModules, setHasStartedLessonModules] = useState(false);
  const [puzzleActions, setPuzzleActions] = useState({
    windowClosed: false,
    jacketTaken: false,
    jacketPlaced: false
  });
  const [showPuzzleHint, setShowPuzzleHint] = useState(false);
  const [puzzleMessage, setPuzzleMessage] = useState('');

  const theme = catThemes[currentTheme] || catThemes.orange;
  const bgmRef = useRef(null);
  const soundRefs = useRef({});
  const lessonIntroAudioRef = useRef(null);
  const observeWindAudioRef = useRef(null);

  const lessonCards = [
    {
      id: 1,
      title: 'Safe & Cozy Space',
      emoji: '🏠',
      description: 'Build a warm, calm room where your kitty feels protected.',
      tag: 'Basics',
      color: 'bg-pink-50 text-pink-600 border-pink-100'
    },
    {
      id: 2,
      title: 'Safe & Dangerous Objects',
      emoji: '🧸',
      description: 'Spot safe objects and remove risky things from a cat room.',
      tag: 'Safety',
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    },
    {
      id: 3,
      title: 'Meaning of Meow',
      emoji: '💬',
      description: 'Learn what your cat is trying to say to you!',
      tag: 'Language',
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      id: 4,
      title: 'Vaccine Fun',
      emoji: '🩺',
      description: 'Keep your little fluffball healthy and fully protected.',
      tag: 'Health',
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      id: 5,
      title: 'Litter Box 101',
      emoji: '⏳',
      description: 'Easy ways to help your cat get comfortable with litter.',
      tag: 'Training',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      id: 6,
      title: 'Making Friends',
      emoji: '🤝',
      description: 'How to earn the trust of a super shy or scared cat.',
      tag: 'Bonding',
      color: 'bg-rose-50 text-rose-600 border-rose-100'
    },
    {
      id: 7,
      title: 'Spa & Grooming',
      emoji: '✂️',
      description: 'Brushing hair, safely clipping nails, and sweet baths.',
      tag: 'Grooming',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      id: 8,
      title: 'Kitty ID Badges',
      emoji: '🏷️',
      description: 'All about microchips and collars to keep cats safe.',
      tag: 'Safety',
      color: 'bg-teal-50 text-teal-600 border-teal-100'
    },
    {
      id: 9,
      title: 'New Roommates',
      emoji: '🐶',
      description: 'Introducing your cat to other family pets smoothly.',
      tag: 'Social',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
    },
    {
      id: 10,
      title: 'Golden Years',
      emoji: '🧓',
      description: 'Special love and extra comfort tips for older cats.',
      tag: 'Senior',
      color: 'bg-violet-50 text-violet-600 border-violet-100'
    }
  ];

  const storyLines = [
    'It was a dark, stormy night...',
    'Mello the kitten was wandering outside, looking for shelter.',
    'Suddenly, she saw a warm glow coming from your window.'
  ];

  const entranceLines = [
    'Meowww... meowwww...',
    'Wait, is that a tiny cry coming from the front porch?'
  ];

  const safetyLessonCards = [
    {
      icon: Home,
      title: 'Safe shelter',
      short: 'Close windows, block cold wind, and remove escape risks.',
      tip: 'A scared cat relaxes faster when the room feels protected.'
    },
    {
      icon: Heart,
      title: 'Comfort zone',
      short: 'Add a soft bed, clean water, food, and a clean litter area.',
      tip: 'Comfort makes the room feel like a home, not a trap.'
    },
    {
      icon: Eye,
      title: 'Choice & hiding',
      short: 'Give Mello a quiet hiding spot and let her come out slowly.',
      tip: 'Never force a scared cat out. Choice builds trust.'
    }
  ];

  const safetyCheckOptions = [
    {
      id: 'calm-first',
      label: 'Make the room calmer first',
      detail: 'Close the windows, lower scary sounds, and give Mello a safe hiding spot.',
      isCorrect: true
    },
    {
      id: 'pull-cat',
      label: 'Pull Mello out immediately',
      detail: 'This can make a scared cat panic and trust you less.',
      isCorrect: false
    },
    {
      id: 'leave-wind',
      label: 'Leave the wind and rain as it is',
      detail: 'The storm keeps the room cold, loud, and unpredictable.',
      isCorrect: false
    }
  ];

  const validStages = [
    'intro',
    'story_scene',
    'entrance_scene',
    'kitten_revealed',
    'player_see_kitty',
    'player_confused',
    'wisp_scene',
    'portal_scene',
    'lesson1_intro',
    'lesson1_uncomfortable_room',
    'lesson1_safety_lesson',
    'lesson1_puzzle',
    'lesson1_kitten_box',
    'lesson1_key_reward',
    'lesson1_door_unlock',
    'lesson1_complete'
  ];

  const stopRainAudio = () => {
    if (!bgmRef.current) return;

    bgmRef.current.pause();
    bgmRef.current.currentTime = 0;
    setIsPlayingBGM(false);
  };

  const stopLessonIntroAudio = () => {
    if (!lessonIntroAudioRef.current) return;

    lessonIntroAudioRef.current.pause();
    lessonIntroAudioRef.current.currentTime = 0;
    lessonIntroAudioRef.current = null;
  };

  const stopObserveWindAudio = () => {
    if (!observeWindAudioRef.current) return;

    observeWindAudioRef.current.pause();
    observeWindAudioRef.current.currentTime = 0;
    observeWindAudioRef.current = null;
  };

  useEffect(() => {
    bgmRef.current = new Audio(`${GAME_ASSET_PATH}/rain_audio.mp3`);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.22;
    bgmRef.current.preload = 'auto';

    soundRefs.current = {
      click: new Audio(`${GAME_ASSET_PATH}/click.mp3`),
      meowInside: new Audio(`${GAME_ASSET_PATH}/cat_meow.mp3`),
      meow: new Audio(`${GAME_ASSET_PATH}/cat_meow_inside.mp3`),
      door: new Audio(`${GAME_ASSET_PATH}/creaky_door.mp3`),
      whoosh: new Audio(`${GAME_ASSET_PATH}/whoosh.mp3`),
      lessonStart: new Audio(`${GAME_ASSET_PATH}/soft_lesson_start.mp3`),
      sleepyMeow: new Audio(`${GAME_ASSET_PATH}/sleepy_meow.mp3`),
      success: new Audio(`${GAME_ASSET_PATH}/success.mp3`)
    };

    Object.entries(soundRefs.current).forEach(([name, audio]) => {
      if (name === 'lessonStart') {
        audio.volume = 0.5;
      } else if (name === 'sleepyMeow') {
        audio.volume = 0.38;
      } else if (name === 'success') {
        audio.volume = 0.78;
      } else if (name.toLowerCase().includes('meow')) {
        audio.volume = 1.0;
      } else if (name === 'whoosh') {
        audio.volume = 0.85;
      } else {
        audio.volume = 0.75;
      }

      audio.preload = 'auto';
    });

    return () => {
      stopRainAudio();
      stopLessonIntroAudio();
      stopObserveWindAudio();

      Object.values(soundRefs.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadGameProgress = async () => {
      try {
        const { progress } = await apiFetch('/api/game/progress');

        const savedStage = validStages.includes(progress.current_stage)
          ? progress.current_stage
          : ['lesson1_steps', 'lesson1_understanding_check', 'lesson1_interactive_game'].includes(progress.current_stage)
            ? 'lesson1_safety_lesson'
            : 'intro';

        setCurrentLessonId(progress.current_lesson_id || 1);
        setUnlockedLessons(progress.unlocked_lessons || [1]);
        setCurrentStage(savedStage);

        if (savedStage.startsWith('lesson1_') && savedStage !== 'lesson1_intro') {
          setHasStartedLessonModules(true);
        }

        if (progress.rescued_mello) {
          setGameMessage('Loaded your saved Mello progress 🐾');
          setTimeout(() => setGameMessage(''), 2500);
        }
      } catch (err) {
        console.log('Game progress load skipped:', err.message);

        if (err.message === 'Missing auth token' || err.message === 'Invalid auth token') {
          setGameMessage('Sign in to save your game progress.');
        }
      }
    };

    loadGameProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentStage !== 'lesson1_puzzle') return undefined;

    setShowPuzzleHint(false);

    const hintTimer = setTimeout(() => {
      setShowPuzzleHint(true);
    }, 15000);

    return () => clearTimeout(hintTimer);
  }, [currentStage, puzzleActions.windowClosed, puzzleActions.jacketTaken, puzzleActions.jacketPlaced]);

  const playSound = (name) => {
    const audio = soundRefs.current[name];

    if (!audio) {
      console.log(`Missing sound: ${name}`);
      return null;
    }

    const sound = audio.cloneNode();
    sound.volume = audio.volume;

    sound.play().catch((err) => {
      console.log(`Sound skipped: ${name}`, err.message);
    });

    return sound;
  };

  const playLessonIntroAudio = () => {
    stopLessonIntroAudio();
    lessonIntroAudioRef.current = playSound('lessonStart');
  };

  const playObserveWindAudio = () => {
    stopObserveWindAudio();

    const windAudio = new Audio(`${GAME_ASSET_PATH}/loud_wind.mp3`);
    windAudio.loop = true;
    windAudio.volume = 0.78;
    windAudio.preload = 'auto';

    windAudio.play().catch((err) => {
      console.log('Wind audio skipped:', err.message);
    });

    observeWindAudioRef.current = windAudio;
  };

  const toggleMusic = () => {
    if (!bgmRef.current) return;

    if (isPlayingBGM) {
      stopRainAudio();
    } else {
      bgmRef.current.play().catch((err) => {
        console.log('Rain audio skipped:', err.message);
      });
      setIsPlayingBGM(true);
    }
  };

  const saveGameProgress = async ({ lessonId, unlocked, stage, rescued }) => {
    try {
      setIsSavingProgress(true);

      await apiFetch('/api/game/progress', {
        method: 'POST',
        body: JSON.stringify({
          current_lesson_id: lessonId,
          unlocked_lessons: unlocked,
          current_stage: stage,
          rescued_mello: rescued
        })
      });

      setGameMessage('Progress saved 🐾');
      setTimeout(() => setGameMessage(''), 2000);
    } catch (err) {
      console.error('Failed to save game progress:', err);

      if (err.message === 'Missing auth token' || err.message === 'Invalid auth token') {
        setGameMessage('Sign in to save your game progress.');
      } else {
        setGameMessage('Could not save progress right now.');
      }
    } finally {
      setIsSavingProgress(false);
    }
  };

  const transitionToStage = (nextStage, callback) => {
    setIsFading(true);

    setTimeout(() => {
      setCurrentStage(nextStage);
      if (callback) callback();
      setIsFading(false);
    }, 450);
  };

  const unlockNextLesson = (id, stageOverride = currentStage, rescuedOverride = false) => {
    if (id > 10) return;

    const nextUnlocked = unlockedLessons.includes(id)
      ? unlockedLessons
      : [...unlockedLessons, id].sort((a, b) => a - b);

    setUnlockedLessons(nextUnlocked);
    setCurrentLessonId(id);

    saveGameProgress({
      lessonId: id,
      unlocked: nextUnlocked,
      stage: stageOverride,
      rescued: rescuedOverride || id >= 3
    });
  };

  const saveStoryStage = (stage) => {
    saveGameProgress({
      lessonId: currentLessonId,
      unlocked: unlockedLessons,
      stage,
      rescued: true
    });
  };

  const handleStartGame = () => {
    playSound('click');

    transitionToStage('story_scene', () => {
      setStoryIndex(0);
    });
  };

  const advanceStory = () => {
    playSound('click');

    if (storyIndex < storyLines.length - 1) {
      setStoryIndex((current) => current + 1);
      return;
    }

    transitionToStage('entrance_scene', () => {
      setEntranceIndex(0);

      setTimeout(() => {
        playSound('meowInside');
      }, 500);

      saveStoryStage('entrance_scene');
    });
  };

  const advanceEntranceStory = () => {
    playSound('click');

    if (entranceIndex < entranceLines.length - 1) {
      setEntranceIndex((current) => current + 1);
    }
  };

  const handleOpenDoor = () => {
    playSound('door');

    transitionToStage('kitten_revealed', () => {
      setTimeout(() => {
        playSound('meow');
      }, 900);

      saveStoryStage('kitten_revealed');
    });
  };

  const handleAfterRescue = () => {
    playSound('click');

    transitionToStage('player_see_kitty', () => {
      saveStoryStage('player_see_kitty');
    });
  };

  const handleToConfused = () => {
    playSound('click');

    transitionToStage('player_confused', () => {
      saveStoryStage('player_confused');
    });
  };

  const handleToWisp = () => {
    playSound('click');
    stopRainAudio();

    transitionToStage('wisp_scene', () => {
      setTimeout(() => {
        playSound('whoosh');
      }, 180);

      saveStoryStage('wisp_scene');
    });
  };

  const handleToPortal = () => {
    playSound('click');
    stopRainAudio();

    transitionToStage('portal_scene', () => {
      saveStoryStage('portal_scene');
    });
  };

  const handleEnterLesson = () => {
    playSound('click');
    stopRainAudio();

    transitionToStage('lesson1_intro', () => {
      setCurrentLessonId(1);
      playLessonIntroAudio();

      saveGameProgress({
        lessonId: 1,
        unlocked: unlockedLessons,
        stage: 'lesson1_intro',
        rescued: true
      });
    });
  };

  const resetLessonInteractions = () => {
    setSelectedSafetyAnswer(null);
    setSafetyCheckFeedback('');
    setWrongAnswerPopup(null);
    setPuzzleActions({
      windowClosed: false,
      jacketTaken: false,
      jacketPlaced: false
    });
    setShowPuzzleHint(false);
    setPuzzleMessage('');
  };

  const handleStartLesson = () => {
    stopLessonIntroAudio();
    playSound('sleepyMeow');

    transitionToStage('lesson1_uncomfortable_room', () => {
      setCurrentLessonId(1);
      setHasStartedLessonModules(true);
      resetLessonInteractions();
      playObserveWindAudio();

      saveGameProgress({
        lessonId: 1,
        unlocked: unlockedLessons,
        stage: 'lesson1_uncomfortable_room',
        rescued: true
      });
    });
  };

  const handleObserveUncomfortableRoom = () => {
    playSound('click');
    stopObserveWindAudio();

    transitionToStage('lesson1_safety_lesson', () => {
      setSelectedSafetyAnswer(null);
      setSafetyCheckFeedback('');
      setWrongAnswerPopup(null);

      saveGameProgress({
        lessonId: 1,
        unlocked: unlockedLessons,
        stage: 'lesson1_safety_lesson',
        rescued: true
      });
    });
  };

  const handleSafetyAnswer = (option) => {
    playSound('click');
    setSelectedSafetyAnswer(option.id);

    if (option.isCorrect) {
      setWrongAnswerPopup(null);
      setSafetyCheckFeedback('Correct. First make the surroundings calm and safe, then let Mello choose when to come out.');
      return;
    }

    const wrongMessage = option.id === 'pull-cat'
      ? 'That is wrong. Pulling a scared cat out can make her panic and trust you less. Give her a safe space first.'
      : 'That is wrong. Wind, rain, and loud noise keep the room stressful. Secure the room first.';

    setSafetyCheckFeedback('');
    setWrongAnswerPopup({
      title: 'Oops, that would scare Mello!',
      message: wrongMessage
    });
  };

  const handleLessonUnderstood = () => {
    playSound('click');

    const selectedOption = safetyCheckOptions.find((option) => option.id === selectedSafetyAnswer);

    if (!selectedOption?.isCorrect) {
      setWrongAnswerPopup({
        title: 'Choose the safest first step',
        message: 'Pick the answer that calms the room before we move to the puzzle.'
      });
      return;
    }

    transitionToStage('lesson1_puzzle', () => {
      setPuzzleActions({
        windowClosed: false,
        jacketTaken: false,
        jacketPlaced: false
      });
      setPuzzleMessage('Solve the room quietly. Look around and decide what Mello needs first.');
      setShowPuzzleHint(false);
      playObserveWindAudio();

      saveGameProgress({
        lessonId: 1,
        unlocked: unlockedLessons,
        stage: 'lesson1_puzzle',
        rescued: true
      });
    });
  };

  const handlePuzzleWindowClick = () => {
    playSound('click');

    if (puzzleActions.windowClosed) {
      setPuzzleMessage('The windows are already closed. The room is quieter now.');
      return;
    }

    stopObserveWindAudio();
    setPuzzleActions((current) => ({ ...current, windowClosed: true }));
    setPuzzleMessage('Good. The windows are closed. The loud wind is gone.');
    setShowPuzzleHint(false);
  };

  const handlePuzzleJacketClick = () => {
    playSound('click');

    if (!puzzleActions.windowClosed) {
      setPuzzleMessage('Mello is still scared by the loud window. Calm the room first.');
      return;
    }

    if (puzzleActions.jacketTaken) {
      setPuzzleMessage('The jacket is ready. Now choose where it should go.');
      return;
    }

    setPuzzleActions((current) => ({
      ...current,
      jacketTaken: true,
      jacketPlaced: true
    }));
    setPuzzleMessage('Nice. The jacket is placed in the box. Click “See what happens” to check on Mello.');
    setShowPuzzleHint(false);
  };

  const handlePuzzleBoxClick = () => {
    playSound('click');

    if (!puzzleActions.windowClosed) {
      setPuzzleMessage('The room is still too loud. Calm the window first.');
      return;
    }

    if (!puzzleActions.jacketTaken) {
      setPuzzleMessage('The box is empty. Find something warm that can make it cozy.');
      return;
    }

    if (puzzleActions.jacketPlaced) {
      setPuzzleMessage('The box is already warm and ready for Mello.');
      return;
    }

    setPuzzleActions((current) => ({ ...current, jacketPlaced: true }));
    setPuzzleMessage('Perfect. The box is warm now. Click “See what happens” to check on Mello.');
    setShowPuzzleHint(false);
  };

  const handleSeeWhatHappens = () => {
    playSound('click');
    stopObserveWindAudio();

    transitionToStage('lesson1_kitten_box', () => {
      saveGameProgress({
        lessonId: 1,
        unlocked: unlockedLessons,
        stage: 'lesson1_kitten_box',
        rescued: true
      });
    });
  };

  const handleShowKeyReward = () => {
    playSound('click');

    transitionToStage('lesson1_key_reward', () => {
      saveGameProgress({
        lessonId: 1,
        unlocked: unlockedLessons,
        stage: 'lesson1_key_reward',
        rescued: true
      });
    });
  };

  const handleClickSafetyKey = () => {
    playSound('click');

    transitionToStage('lesson1_door_unlock', () => {
      saveGameProgress({
        lessonId: 1,
        unlocked: unlockedLessons,
        stage: 'lesson1_door_unlock',
        rescued: true
      });
    });
  };

  const handleOpenLessonDoor = () => {
    playSound('click');

    transitionToStage('lesson1_complete', () => {
      playSound('success');
      unlockNextLesson(2, 'lesson1_complete', true);
    });
  };

  const handleGoToLessonTwo = () => {
    playSound('click');
    setCurrentLessonId(2);
    setGameMessage('Lesson 2 unlocked: Safe and Dangerous Objects 🧸');
    setTimeout(() => setGameMessage(''), 3500);
  };

  const getSceneBackground = () => {
    switch (currentStage) {
      case 'intro':
      case 'story_scene':
        return `${GAME_ASSET_PATH}/opening_scene.jpg`;

      case 'entrance_scene':
      case 'kitten_revealed':
        return `${GAME_ASSET_PATH}/entrance.jpg`;

      case 'wisp_scene':
        return `${GAME_ASSET_PATH}/wisp.jpg`;

      case 'portal_scene':
        return `${GAME_ASSET_PATH}/wisp_portal.jpg`;

      default:
        return null;
    }
  };

  const isIllustrationStoryStage =
    currentStage === 'player_see_kitty' || currentStage === 'player_confused';

  const isLessonStage =
    currentStage === 'lesson1_intro' ||
    currentStage === 'lesson1_uncomfortable_room' ||
    currentStage === 'lesson1_safety_lesson' ||
    currentStage === 'lesson1_puzzle' ||
    currentStage === 'lesson1_kitten_box' ||
    currentStage === 'lesson1_key_reward' ||
    currentStage === 'lesson1_door_unlock' ||
    currentStage === 'lesson1_complete';

  const shouldShowSceneOverlay = !isIllustrationStoryStage && !isLessonStage;
  const shouldShowPathwayCards = hasStartedLessonModules;
  const sceneBackground = getSceneBackground();

  const DialogueCard = ({
    text,
    buttonLabel = 'Next',
    onNext,
    className = '',
    tone = 'warm'
  }) => {
    const isMagic = tone === 'magic';

    return (
      <div
        className={`z-20 rounded-[24px] border shadow-xl p-4 backdrop-blur-md ${className}`}
        style={{
          background:
            'linear-gradient(135deg, rgba(26, 38, 67, 0.88) 0%, rgba(19, 31, 55, 0.92) 100%)',
          borderColor: isMagic ? 'rgba(125, 211, 252, 0.22)' : 'rgba(255,255,255,0.10)',
          boxShadow: '0 18px 38px rgba(15, 23, 42, 0.26)'
        }}
      >
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-slate-100">
            {text}
          </p>

          <div className="flex justify-end">
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold shadow-sm transition-all active:scale-95 hover:opacity-95"
              style={{
                backgroundColor: theme.primary,
                color: '#fff'
              }}
            >
              {buttonLabel}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StoryIllustrationScene = ({ imageSrc, alt, text, onNext }) => {
    return (
      <div className="absolute inset-0 z-20 overflow-hidden bg-transparent">
        <img
          src={imageSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <DialogueCard
          text={text}
          buttonLabel="Next"
          onNext={onNext}
          className="absolute top-4 right-4 w-[calc(100%-2rem)] sm:w-[320px]"
          tone="warm"
        />
      </div>
    );
  };

  const LessonIntroScene = () => {
    return (
      <div
        className="absolute inset-0 z-20 overflow-hidden p-3 sm:p-4"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(255, 232, 194, 0.95) 0%, rgba(255, 244, 226, 0.98) 38%, rgba(250, 214, 164, 0.98) 100%)'
        }}
      >
        <div className="h-full flex items-center justify-center">
          <div
            className="w-full max-w-2xl rounded-[24px] border shadow-xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 250, 242, 0.98)',
              borderColor: theme.border,
              boxShadow: '0 18px 45px rgba(91, 57, 31, 0.18)'
            }}
          >
            <div className="p-4 sm:p-5 text-center space-y-3">
              <div className="space-y-1">
                <p
                  className="text-[9px] font-black uppercase tracking-[0.22em]"
                  style={{ color: theme.primary }}
                >
                  Lesson 1
                </p>

                <h1
                  className="text-2xl sm:text-3xl font-black tracking-tight"
                  style={{ color: theme.text }}
                >
                  A Safe & Cozy Space
                </h1>

                <p
                  className="max-w-2xl mx-auto text-[11px] sm:text-xs leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  Learn how a cat&apos;s surroundings affect fear, comfort, and trust.
                </p>
              </div>

              <div
                className="rounded-[22px] border overflow-hidden shadow-sm"
                style={{ borderColor: theme.border }}
              >
                <img
                  src={`${GAME_ASSET_PATH}/kitty_sleeping_cozy_room.png`}
                  alt="A kitten resting in a cozy cat-friendly room"
                  className="w-full h-[205px] sm:h-[245px] object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-left leading-relaxed" style={{ color: theme.textMuted }}>
                  First, see what an unsafe room feels like. Then learn how to make it better.
                </p>

                <button
                  onClick={handleStartLesson}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95 hover:opacity-95"
                  style={{
                    backgroundColor: theme.primary,
                    color: '#ffffff'
                  }}
                >
                  Start Lesson
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LessonUncomfortableRoomScene = () => {
    return (
      <div
        className="absolute inset-0 z-20 overflow-hidden p-3 sm:p-4"
        style={{
          background:
            'linear-gradient(180deg, rgba(29, 36, 54, 1) 0%, rgba(51, 43, 53, 1) 100%)'
        }}
      >
        <div className="h-full flex items-center justify-center">
          <div
            className="w-full max-w-4xl h-full max-h-[470px] rounded-[24px] border shadow-xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 250, 242, 0.98)',
              borderColor: theme.border,
              boxShadow: '0 18px 45px rgba(15, 23, 42, 0.3)'
            }}
          >
            <div className="grid md:grid-cols-[1.35fr_0.65fr] h-full">
              <div className="relative min-h-0 bg-slate-900">
                <img
                  src={`${GAME_ASSET_PATH}/kitten_scared.png`}
                  alt="Mello hiding in an uncomfortable room during a storm"
                  className="w-full h-full object-cover"
                />

                <div className="absolute left-4 top-4 rounded-full bg-slate-950/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-100 border border-white/10 flex items-center gap-1.5">
                  <Wind className="w-3 h-3" />
                  Observe
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.22em]"
                    style={{ color: theme.primary }}
                  >
                    Listen & Observe
                  </p>

                  <h2
                    className="text-xl sm:text-2xl font-black tracking-tight"
                    style={{ color: theme.text }}
                  >
                    This room feels unsafe.
                  </h2>

                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                    Mello is not being naughty. She is scared. A cat hides when the room feels loud,
                    cold, exposed, or unpredictable.
                  </p>

                  <div
                    className="rounded-2xl border p-3 text-[11px] leading-relaxed"
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                      color: theme.textMuted
                    }}
                  >
                    <span className="font-bold" style={{ color: theme.text }}>
                      Wisp:
                    </span>{' '}
                    Do not pull her out. First, make the space feel safe.
                  </div>
                </div>

                <button
                  onClick={handleObserveUncomfortableRoom}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95 hover:opacity-95"
                  style={{ backgroundColor: theme.primary, color: '#ffffff' }}
                >
                  Next: Learn Safety
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LessonSafetyTeachingScene = () => {
    const selectedOption = safetyCheckOptions.find((option) => option.id === selectedSafetyAnswer);
    const isCorrectAnswer = Boolean(selectedOption?.isCorrect);

    return (
      <div
        className="absolute inset-0 z-20 overflow-hidden p-3 sm:p-4"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 246, 232, 1) 0%, rgba(244, 233, 218, 1) 100%)'
        }}
      >
        <div className="h-full flex items-center justify-center">
          <div
            className="relative w-full max-w-4xl rounded-[26px] border shadow-xl p-4 sm:p-5 space-y-4"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
              color: theme.text,
              boxShadow: '0 18px 45px rgba(91, 57, 31, 0.16)'
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-[9px] font-black uppercase tracking-[0.22em]"
                  style={{ color: theme.primary }}
                >
                  Learn
                </p>

                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                  Cat surrounding safety
                </h2>

                <p className="text-[11px] sm:text-xs leading-relaxed mt-2 max-w-2xl" style={{ color: theme.textMuted }}>
                  A cat&apos;s room should reduce fear. The goal is to make Mello feel protected,
                  comfortable, and in control before we expect her to relax.
                </p>
              </div>

              <div
                className="hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black"
                style={{ borderColor: theme.border, color: theme.primary, backgroundColor: `${theme.primary}10` }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Kitty Safety
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {safetyLessonCards.map((card, index) => {
                const CardIcon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="relative overflow-hidden rounded-[24px] border p-4 transition-transform hover:-translate-y-0.5"
                    style={{
                      borderColor: theme.border,
                      background:
                        index === 0
                          ? 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)'
                          : index === 1
                            ? 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)'
                            : 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
                      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.07)'
                    }}
                  >
                    <div className="absolute -right-4 -top-4 text-6xl opacity-10 select-none">🐾</div>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-sm mb-3"
                      style={{ backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.primary }}
                    >
                      <CardIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black">{card.title}</h3>
                    <p className="text-[11px] leading-relaxed mt-1" style={{ color: theme.textMuted }}>
                      {card.short}
                    </p>
                    <p className="text-[10px] leading-relaxed mt-3 font-semibold" style={{ color: theme.primary }}>
                      {card.tip}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              className="rounded-[24px] border p-3 sm:p-4"
              style={{ borderColor: theme.border, backgroundColor: `${theme.primary}08` }}
            >
              <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
                <div className="space-y-1 lg:max-w-xs">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: theme.primary }}>
                    Quick check
                  </p>
                  <h3 className="text-sm font-black">What should we do first?</h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
                    Tap one card. If it is unsafe, it turns red and a popup explains why.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-2 flex-1">
                  {safetyCheckOptions.map((option) => {
                    const isSelected = selectedSafetyAnswer === option.id;
                    const isWrongSelected = isSelected && !option.isCorrect;
                    const isRightSelected = isSelected && option.isCorrect;

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSafetyAnswer(option)}
                        className="rounded-2xl border p-3 text-left transition-all active:scale-[0.98]"
                        style={{
                          borderColor: isRightSelected
                            ? '#16a34a'
                            : isWrongSelected
                              ? '#ef4444'
                              : theme.border,
                          backgroundColor: isRightSelected
                            ? '#dcfce7'
                            : isWrongSelected
                              ? '#fee2e2'
                              : theme.cardBg,
                          color: theme.text,
                          boxShadow: isSelected ? '0 10px 20px rgba(15, 23, 42, 0.08)' : 'none'
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5">
                            {isRightSelected ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : isWrongSelected ? (
                              <XCircle className="w-4 h-4 text-red-500" />
                            ) : (
                              <span className="block w-4 h-4 rounded-full border" style={{ borderColor: theme.border }} />
                            )}
                          </span>
                          <div>
                            <p className="text-[11px] font-black leading-snug">{option.label}</p>
                            {isSelected && (
                              <p className="text-[10px] leading-relaxed mt-1" style={{ color: isWrongSelected ? '#991b1b' : '#166534' }}>
                                {option.detail}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {safetyCheckFeedback && (
                <div
                  className="mt-3 rounded-2xl border px-3 py-2 text-[11px] font-semibold leading-relaxed"
                  style={{
                    borderColor: isCorrectAnswer ? '#16a34a' : '#ef4444',
                    backgroundColor: isCorrectAnswer ? '#f0fdf4' : '#fef2f2',
                    color: isCorrectAnswer ? '#166534' : '#991b1b'
                  }}
                >
                  {safetyCheckFeedback}
                </div>
              )}
            </div>

            {wrongAnswerPopup && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/45 px-4">
                <div
                  className="w-full max-w-sm rounded-[26px] border p-5 shadow-2xl text-center"
                  style={{
                    backgroundColor: '#fff7ed',
                    borderColor: '#ef4444',
                    color: theme.text
                  }}
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <XCircle className="h-7 w-7" />
                  </div>

                  <h3 className="text-base font-black tracking-tight text-red-700">
                    {wrongAnswerPopup.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-red-900">
                    {wrongAnswerPopup.message}
                  </p>

                  <button
                    onClick={() => {
                      playSound('click');
                      setWrongAnswerPopup(null);
                      setSelectedSafetyAnswer(null);
                      setSafetyCheckFeedback('');
                    }}
                    className="mt-4 inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-xs font-black text-white shadow-md transition-all active:scale-95"
                    style={{ backgroundColor: '#ef4444' }}
                  >
                    Okay, I&apos;ll correct it
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
                Next step: solve the room puzzle and help Mello feel safe.
              </p>

              <button
                onClick={handleLessonUnderstood}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95 hover:opacity-95"
                style={{ backgroundColor: theme.primary, color: '#ffffff' }}
              >
                I Understand
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const LessonPuzzleScene = () => {
    const puzzleImage = puzzleActions.jacketTaken
      ? `${GAME_ASSET_PATH}/jacket_off_hook.png`
      : puzzleActions.windowClosed
        ? `${GAME_ASSET_PATH}/close_window.jpg`
        : `${GAME_ASSET_PATH}/puzzleroom.png`;

    const canSeeResult = puzzleActions.windowClosed && puzzleActions.jacketTaken && puzzleActions.jacketPlaced;

    const currentHint = !puzzleActions.windowClosed
      ? 'Hint: The loudest problem is coming from the window.'
      : !puzzleActions.jacketTaken
        ? 'Hint: Look for something warm that can make the box cozy.'
        : !puzzleActions.jacketPlaced
          ? 'Hint: The empty box can become Mello’s safe hiding spot.'
          : 'Great. Now see what happens.';

    return (
      <div
        className="absolute inset-0 z-20 overflow-hidden bg-slate-950"
      >
        <img
          src={puzzleImage}
          alt="Solve puzzle room"
          className="absolute inset-0 h-full w-full object-cover select-none"
          draggable="false"
        />

        {puzzleActions.jacketPlaced && (
          <img
            src={`${GAME_ASSET_PATH}/jacket.png`}
            alt="Jacket placed in the box"
            className="absolute left-[24%] top-[48%] w-[27%] select-none pointer-events-none"
            draggable="false"
          />
        )}

        {!puzzleActions.windowClosed && (
          <button
            aria-label="Window"
            onClick={handlePuzzleWindowClick}
            className="absolute left-[37%] top-[12%] h-[44%] w-[48%] rounded-3xl cursor-pointer bg-transparent hover:bg-sky-300/10 focus:outline-none focus:ring-2 focus:ring-sky-200/70"
          />
        )}

        {puzzleActions.windowClosed && !puzzleActions.jacketTaken && (
          <button
            aria-label="Jacket"
            onClick={handlePuzzleJacketClick}
            className="absolute left-[18%] top-[25%] h-[33%] w-[18%] rounded-3xl cursor-pointer bg-transparent hover:bg-amber-300/10 focus:outline-none focus:ring-2 focus:ring-amber-200/70"
          />
        )}

        <div className="absolute left-4 top-4 max-w-sm rounded-[22px] border border-white/10 bg-slate-950/72 p-3 text-white shadow-xl backdrop-blur-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-200">
            Solve
          </p>
          <p className="mt-1 text-xs leading-relaxed">
            {puzzleMessage || 'Fix the room without forcing Mello out.'}
          </p>

          {showPuzzleHint && (
            <p className="mt-2 rounded-2xl bg-white/10 px-3 py-2 text-[11px] font-semibold text-orange-100">
              {currentHint}
            </p>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <div className="rounded-full bg-slate-950/70 px-3 py-1.5 text-[10px] font-bold text-white border border-white/10">
            {puzzleActions.windowClosed ? '✅ Window calmed' : '🌬️ Loud wind'} ·{' '}
            {puzzleActions.jacketTaken ? '✅ Jacket picked' : '🧥 Jacket'} ·{' '}
            {puzzleActions.jacketPlaced ? '✅ Cozy box' : '🧥 Place jacket'}
          </div>

          {canSeeResult && (
  <button
    onClick={handleSeeWhatHappens}
    className="rounded-2xl px-6 py-3 text-sm font-black text-white shadow-lg transition-all active:scale-95 hover:scale-105 animate-bounce"
    style={{ backgroundColor: theme.primary }}
  >
    See what happens
  </button>
)}
        </div>
      </div>
    );
  };

  const KittenInBoxScene = () => {
    return (
      <div className="absolute inset-0 z-20 overflow-hidden bg-slate-950">
        <img
  src={`${GAME_ASSET_PATH}/kitten_box_bg.png`}
  alt="Cozy room background"
  className="absolute inset-0 h-full w-full object-cover select-none"
  draggable="false"
/>



        <div className="absolute bottom-4 left-4 right-4 rounded-[24px] border border-white/10 bg-slate-950/72 p-4 text-white shadow-xl backdrop-blur-sm sm:right-auto sm:max-w-md">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200">
            Result
          </p>
          <h3 className="mt-1 text-lg font-black">Mello finally feels safe.</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-200">
            You reduced the scary noise and made the box warm. Mello chose the safe spot by herself.
          </p>

          <button
            onClick={handleShowKeyReward}
            className="mt-3 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black text-white shadow-lg transition-all active:scale-95 hover:opacity-95"
            style={{ backgroundColor: theme.primary }}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const KeyRewardScene = () => {
    return (
      <div className="absolute inset-0 z-20 overflow-hidden bg-slate-950">
        <img
  src={`${GAME_ASSET_PATH}/kitten_box_bg.png`}
  alt="Cozy room background"
  className="absolute inset-0 h-full w-full object-cover select-none"
  draggable="false"
/>



        <button
          onClick={handleClickSafetyKey}
          className="absolute left-[29%] top-[48%] z-30 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/95 px-4 py-3 text-4xl shadow-[0_0_28px_rgba(250,204,21,0.9)] animate-bounce transition-transform active:scale-90"
          aria-label="Safety key"
        >
          🔑
        </button>

        <div className="absolute bottom-4 left-4 max-w-sm rounded-[22px] border border-white/10 bg-slate-950/72 p-3 text-white shadow-xl backdrop-blur-sm">
          <p className="text-xs leading-relaxed">
            A Safety Key appeared. Click the bouncing key to unlock the next door.
          </p>
        </div>
      </div>
    );
  };

  const DoorUnlockScene = () => {
    return (
      <div
        className="absolute inset-0 z-20 overflow-hidden p-3 sm:p-4"
        style={{ background: 'linear-gradient(180deg, #211827 0%, #3b2a32 100%)' }}
      >
        <div className="h-full flex items-center justify-center">
          <div
            className="relative w-full max-w-4xl h-full max-h-[470px] rounded-[24px] border shadow-xl overflow-hidden bg-slate-900"
            style={{ borderColor: theme.border }}
          >
            <img
              src={`${GAME_ASSET_PATH}/key_door.jpg`}
              alt="Unlocked glowing lesson door"
              className="absolute inset-0 w-full h-full object-cover select-none"
              draggable="false"
            />

            <div className="absolute bottom-4 left-4 rounded-[22px] bg-slate-950/70 border border-white/10 p-3 text-white shadow-xl max-w-sm backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-yellow-200">
                Door unlocked
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-100">
                The Safety Key fits. Open the door to complete Lesson 1.
              </p>

              <button
                onClick={handleOpenLessonDoor}
                className="mt-3 rounded-2xl px-5 py-2.5 text-xs font-black text-white shadow-lg transition-all active:scale-95 hover:opacity-95"
                style={{ backgroundColor: theme.primary }}
              >
                Open the door
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LessonCompleteScene = () => {
    return (
      <div
        className="absolute inset-0 z-20 overflow-hidden p-4"
        style={{
          background:
            'radial-gradient(circle at top, rgba(255, 237, 213, 1) 0%, rgba(254, 243, 199, 1) 42%, rgba(250, 204, 21, 0.35) 100%)'
        }}
      >
        <div className="h-full flex items-center justify-center">
          <div
            className="w-full max-w-xl rounded-[30px] border p-6 text-center shadow-2xl"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.text }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[24px] bg-amber-100 text-4xl shadow-sm">
              🏆
            </div>

            <p
              className="text-[10px] font-black uppercase tracking-[0.22em]"
              style={{ color: theme.primary }}
            >
              Lesson Complete
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              Congratulations!
            </h2>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
              You completed Lesson 1: Safety for Cats. You learned to calm the room, create comfort,
              and let Mello choose a safe hiding spot.
            </p>

            <button
              onClick={handleGoToLessonTwo}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-xs font-black text-white shadow-lg transition-all active:scale-95 hover:opacity-95"
              style={{ backgroundColor: theme.primary }}
            >
              Lesson 2: Safe and Dangerous Objects
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const lessonStatusText = () => {
    if (currentStage === 'lesson1_intro') {
      return 'Lesson 1 intro: start with the cozy-room title screen.';
    }

    if (currentStage === 'lesson1_uncomfortable_room') {
      return 'Observe: wind audio plays while Mello hides in the uncomfortable room.';
    }

    if (currentStage === 'lesson1_safety_lesson') {
      return 'Learn: cat surrounding safety, quick check, then solve the room puzzle.';
    }

    if (currentStage === 'lesson1_puzzle') {
      return 'Solve: close the window, use the jacket, and make the box cozy.';
    }

    if (currentStage === 'lesson1_kitten_box' || currentStage === 'lesson1_key_reward') {
      return 'Reward: Mello feels safe and the Safety Key appears.';
    }

    if (currentStage === 'lesson1_door_unlock') {
      return 'Unlock: open the lesson door with the Safety Key.';
    }

    if (currentStage === 'lesson1_complete') {
      return 'Lesson 1 complete: Lesson 2 is now unlocked.';
    }

    return 'The next step after this portal is Lesson 1: kitty environment safety.';
  };

  return (
    <div className="max-w-[920px] mx-auto space-y-3 font-sans antialiased">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <span>🐾</span> Purrst Step Learn Room
          </h2>

          <p className="text-[11px] text-slate-500">
            Play through stories to unlock sweet guides on taking care of cats!
          </p>

          {gameMessage && (
            <p className="text-[11px] font-semibold mt-1" style={{ color: theme.primary }}>
              {gameMessage}
            </p>
          )}

          {isSavingProgress && (
            <p className="text-[10px] text-slate-400 mt-0.5">
              Saving progress...
            </p>
          )}
        </div>

        <button
          onClick={toggleMusic}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border bg-white transition-all active:scale-95 shadow-sm shrink-0"
          style={{ borderColor: theme.border, color: theme.primary }}
        >
          {isPlayingBGM ? (
            <Volume2 className="w-3.5 h-3.5" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
          {isPlayingBGM ? 'Music On' : 'Music Off'}
        </button>
      </div>

      <div
        className="relative w-full h-[522px] overflow-hidden shadow-md border rounded-[26px] flex flex-col"
        style={{
          borderColor: theme.border,
          backgroundImage: sceneBackground ? `url(${sceneBackground})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: isLessonStage ? '#fff4e6' : undefined
        }}
      >
        {shouldShowSceneOverlay && (
          <div className="absolute inset-0 bg-slate-900/20 z-[1]" />
        )}

        {currentStage === 'kitten_revealed' && (
          <div
            className="absolute inset-0 z-10 animate-fadeIn"
            style={{
              backgroundImage: `url('${GAME_ASSET_PATH}/kitten_at_door.png')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}

        {currentStage === 'intro' && (
          <div className="absolute inset-0 bg-slate-900/60 flex flex-col justify-between p-7 sm:p-8 z-20">
            <div className="space-y-2">
              <span className="inline-flex w-fit text-[10px] font-semibold uppercase tracking-wider bg-orange-500/15 text-orange-300 border border-orange-400/20 px-3 py-1 rounded-full">
                Current Lesson: {lessonCards[currentLessonId - 1]?.title || lessonCards[0].title}
              </span>

              <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight pt-1">
                Mello&apos;s Big Journey
              </h1>

              <p className="max-w-md text-sm text-slate-200/90 leading-relaxed">
                Rescue Mello, meet the Wisp, and unlock each lesson room one step at a time.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleStartGame}
                className="py-2.5 px-5 font-semibold text-xs tracking-wide flex items-center gap-2 shadow-md text-white hover:bg-opacity-90 active:scale-95 transition-all rounded-2xl"
                style={{ backgroundColor: theme.primary }}
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Start Game
              </button>

              <button
                onClick={() => setActiveModal('instructions')}
                className="py-2.5 px-4 font-medium text-xs bg-white/85 text-slate-700 border border-white/40 hover:bg-white rounded-2xl"
              >
                Instructions
              </button>

              <button
                onClick={() => setActiveModal('about')}
                className="py-2.5 px-4 font-medium text-xs bg-white/85 text-slate-700 border border-white/40 hover:bg-white rounded-2xl"
              >
                About Us
              </button>
            </div>
          </div>
        )}

        {currentStage === 'story_scene' && (
          <DialogueCard
            text={storyLines[storyIndex]}
            buttonLabel={storyIndex === storyLines.length - 1 ? 'Continue' : 'Next'}
            onNext={advanceStory}
            className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-lg"
            tone="warm"
          />
        )}

        {currentStage === 'entrance_scene' && (
          <>
            <DialogueCard
              text={entranceLines[entranceIndex]}
              buttonLabel={entranceIndex === entranceLines.length - 1 ? 'Look Closer' : 'Next'}
              onNext={entranceIndex === entranceLines.length - 1 ? handleOpenDoor : advanceEntranceStory}
              className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-lg"
              tone="warm"
            />

            {entranceIndex === entranceLines.length - 1 && (
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/90 text-slate-700 px-4 py-2 rounded-full text-[10px] font-semibold tracking-wide shadow-md z-20 animate-bounce">
                Tap the highlighted door area
              </div>
            )}

            {entranceIndex === entranceLines.length - 1 && (
              <button
                onClick={handleOpenDoor}
                className="absolute top-[78px] left-[360px] w-[220px] h-[360px] rounded-3xl bg-sky-400/5 border-2 border-dashed border-sky-300 cursor-pointer transition-all flex items-center justify-center hover:bg-sky-400/10 hover:scale-[1.01] z-20"
              >
                <span className="bg-white/90 text-sky-700 px-4 py-2 shadow-sm border border-sky-100 rounded-2xl text-[11px] font-semibold">
                  Open the door
                </span>
              </button>
            )}
          </>
        )}

        {currentStage === 'kitten_revealed' && (
          <DialogueCard
            text="You saved Mello. She is warm and safe indoors now, and the little kitten already looks calmer. ❤️"
            buttonLabel="Next"
            onNext={handleAfterRescue}
            className="absolute top-5 left-5 right-5 sm:right-auto sm:max-w-md"
            tone="warm"
          />
        )}

        {currentStage === 'player_see_kitty' && (
          <StoryIllustrationScene
            imageSrc={`${GAME_ASSET_PATH}/player_see_kitty.jpg`}
            alt="Player seeing Mello for the first time"
            text="This cat is so cute... is it a stray? I should take care of it."
            onNext={handleToConfused}
          />
        )}

        {currentStage === 'player_confused' && (
          <StoryIllustrationScene
            imageSrc={`${GAME_ASSET_PATH}/player_confused.jpg`}
            alt="Player feeling unsure how to care for a cat"
            text="But I don’t know how to take care of a cat... what do I do?"
            onNext={handleToWisp}
          />
        )}

        {currentStage === 'wisp_scene' && (
          <DialogueCard
            text="Prrr... do not worry, hooman. I am here to guide you. Follow me, and I will teach you how to care for this kitty step by step."
            buttonLabel="Follow the Wisp"
            onNext={handleToPortal}
            className="absolute top-5 left-5 w-[calc(100%-2.5rem)] sm:w-[420px]"
            tone="magic"
          />
        )}

        {currentStage === 'portal_scene' && (
          <DialogueCard
            text="Beyond this portal lies your first lesson. A quiet room is waiting for Mello. Observe it carefully, then learn what makes cats feel safe."
            buttonLabel="Enter Lesson 1"
            onNext={handleEnterLesson}
            className="absolute top-5 left-5 w-[calc(100%-2.5rem)] sm:w-[430px]"
            tone="magic"
          />
        )}

        {currentStage === 'lesson1_intro' && <LessonIntroScene />}

        {currentStage === 'lesson1_uncomfortable_room' && <LessonUncomfortableRoomScene />}

        {currentStage === 'lesson1_safety_lesson' && <LessonSafetyTeachingScene />}

        {currentStage === 'lesson1_puzzle' && <LessonPuzzleScene />}

        {currentStage === 'lesson1_kitten_box' && <KittenInBoxScene />}

        {currentStage === 'lesson1_key_reward' && <KeyRewardScene />}

        {currentStage === 'lesson1_door_unlock' && <DoorUnlockScene />}

        {currentStage === 'lesson1_complete' && <LessonCompleteScene />}

        {activeModal && (
          <div className="absolute inset-0 bg-slate-950/90 z-40 p-7 flex flex-col justify-between animate-fadeIn">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-300 border-b border-slate-800 pb-2">
                {activeModal === 'instructions' ? '📖 How to Play' : '✨ About Purrst Step'}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                {activeModal === 'instructions'
                  ? "Read the story, click through the dialogue, and interact with highlighted parts of the scene. As Mello's journey unfolds, new lesson rooms unlock."
                  : "Purrst Step helps people learn cat care through an emotional story, interactive guidance, and bite-sized lesson rooms designed around rescue, safety, and trust."}
              </p>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-fit py-2 px-4 bg-slate-800 text-white text-[10px] font-semibold uppercase tracking-wide rounded-xl"
            >
              Close
            </button>
          </div>
        )}

        <div
          className="absolute inset-0 bg-slate-950 pointer-events-none transition-opacity duration-500 z-50"
          style={{ opacity: isFading ? 1 : 0 }}
        />
      </div>

      {shouldShowPathwayCards && (
        <div className="space-y-2 pt-0.5">
          <div className="flex justify-between items-end">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Feline Learning Pathways
            </h3>

            <span className="text-[10px] font-semibold bg-purple-50 text-purple-600 border border-purple-100 px-2 py-0.5 rounded-full">
              Unlocked: {unlockedLessons.length} / 10
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {lessonCards.map((lesson) => {
              const isUnlocked = unlockedLessons.includes(lesson.id);
              const isActive = currentLessonId === lesson.id;

              return (
                <div
                  key={lesson.id}
                  onClick={() => isUnlocked && setCurrentLessonId(lesson.id)}
                  className={`p-2.5 border rounded-xl transition-all flex flex-col justify-between space-y-1.5 relative group ${
                    isUnlocked
                      ? 'cursor-pointer hover:shadow-xs bg-white border-slate-200'
                      : 'bg-slate-50/70 border-slate-200/60 opacity-60 select-none'
                  }`}
                  style={{
                    borderColor: isActive ? theme.primary : undefined,
                    boxShadow: isActive ? `${theme.primary}15 0px 4px 12px` : undefined
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-sm border ${
                          isUnlocked ? lesson.color : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {lesson.tag}
                      </span>

                      {!isUnlocked && <Lock className="w-2.5 h-2.5 text-slate-400" />}
                    </div>

                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-base shrink-0">{isUnlocked ? lesson.emoji : '🔒'}</span>
                      <h4
                        className={`text-[11px] font-semibold tracking-tight line-clamp-1 ${
                          isUnlocked ? 'text-slate-800' : 'text-slate-400'
                        }`}
                      >
                        {lesson.title}
                      </h4>
                    </div>

                    <p className="text-[9px] text-slate-500 leading-normal line-clamp-2 mt-0.5">
                      {isUnlocked ? lesson.description : "Keep exploring Mello's journey to unlock this card!"}
                    </p>
                  </div>

                  {isUnlocked && isActive && (
                    <div className="text-[8px] font-semibold text-center pt-0.5 text-orange-500 bg-orange-50/50 rounded-sm">
                      Viewing Lesson
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        className="rounded-2xl border px-4 py-2.5 text-xs flex items-center gap-2"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.cardBg,
          color: theme.textMuted
        }}
      >
        <BookOpen className="w-4 h-4" style={{ color: theme.primary }} />
        {lessonStatusText()}
      </div>
    </div>
  );
}