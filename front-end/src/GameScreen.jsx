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
  BookOpen
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

  const theme = catThemes[currentTheme] || catThemes.orange;
  const bgmRef = useRef(null);
  const soundRefs = useRef({});

  const lessonCards = [
    {
      id: 1,
      title: 'Surrounding Care',
      emoji: '🏠',
      description: 'Set up a warm, safe spot for your new kitty.',
      tag: 'Basics',
      color: 'bg-pink-50 text-pink-600 border-pink-100'
    },
    {
      id: 2,
      title: 'Safe Foods',
      emoji: '🐟',
      description: 'Discover yummy treats and what to avoid completely.',
      tag: 'Diet',
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

  const validStages = [
    'intro',
    'story_scene',
    'entrance_scene',
    'kitten_revealed',
    'player_see_kitty',
    'player_confused',
    'wisp_scene',
    'portal_scene'
  ];

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
      whoosh: new Audio(`${GAME_ASSET_PATH}/whoosh.mp3`)
    };

    Object.entries(soundRefs.current).forEach(([name, audio]) => {
      if (name.toLowerCase().includes('meow')) {
        audio.volume = 1.0;
      } else if (name === 'whoosh') {
        audio.volume = 0.85;
      } else {
        audio.volume = 0.75;
      }
    
      audio.preload = 'auto';
    });

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }

      Object.values(soundRefs.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    const loadGameProgress = async () => {
      try {
        const { progress } = await apiFetch('/api/game/progress');

        const savedStage = validStages.includes(progress.current_stage)
          ? progress.current_stage
          : 'intro';

        setCurrentLessonId(progress.current_lesson_id || 1);
        setUnlockedLessons(progress.unlocked_lessons || [1]);
        setCurrentStage(savedStage);

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
  }, []);

  const playSound = (name) => {
    const audio = soundRefs.current[name];

    if (!audio) {
      console.log(`Missing sound: ${name}`);
      return;
    }

    const sound = audio.cloneNode();
    sound.volume = name.toLowerCase().includes('meow') ? 1.0 : 0.75;

    sound.play().catch((err) => {
      console.log(`Sound skipped: ${name}`, err.message);
    });
  };

  const toggleMusic = () => {
    if (!bgmRef.current) return;

    if (isPlayingBGM) {
      bgmRef.current.pause();
      setIsPlayingBGM(false);
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

      unlockNextLesson(2, 'entrance_scene', false);
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

      unlockNextLesson(3, 'kitten_revealed', true);
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
  
    transitionToStage('wisp_scene', () => {
      setTimeout(() => {
        playSound('whoosh');
      }, 180);
  
      saveStoryStage('wisp_scene');
    });
  };

  const handleToPortal = () => {
    playSound('click');

    transitionToStage('portal_scene', () => {
      unlockNextLesson(4, 'portal_scene', true);
    });
  };

  const handleEnterLesson = () => {
    playSound('click');

    setGameMessage('Lesson 1 room unlocked ✨ Next we can build the safety puzzle here.');
    setTimeout(() => setGameMessage(''), 3000);
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

  const isFramedIllustrationStage =
    currentStage === 'player_see_kitty' || currentStage === 'player_confused';

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
        className={`z-20 rounded-[28px] border shadow-xl p-4 sm:p-5 backdrop-blur-md ${className}`}
        style={{
          background:
            'linear-gradient(135deg, rgba(26, 38, 67, 0.88) 0%, rgba(19, 31, 55, 0.92) 100%)',
          borderColor: isMagic ? 'rgba(125, 211, 252, 0.22)' : 'rgba(255,255,255,0.10)',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.26)'
        }}
      >
        <div className="space-y-4">
          <p className="text-sm sm:text-[15px] leading-relaxed text-slate-100">
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

  const FramedIllustrationScene = ({ imageSrc, alt, text, onNext }) => {
    return (
      <div className="absolute inset-0 z-20 p-4 sm:p-6 lg:p-7 flex flex-col gap-4 sm:gap-5">
        <div
          className="flex-1 min-h-0 rounded-[30px] border overflow-hidden shadow-sm flex items-center justify-center p-4 sm:p-5"
          style={{
            background: 'linear-gradient(180deg, #f5efe6 0%, #efe7db 100%)',
            borderColor: theme.border
          }}
        >
          <img
            src={imageSrc}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-2xl"
          />
        </div>

        <div className="flex justify-center sm:justify-start">
          <DialogueCard
            text={text}
            buttonLabel="Next"
            onNext={onNext}
            className="w-full sm:max-w-xl"
            tone="warm"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans antialiased">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>🐾</span> Purrst Step Learn Room
          </h2>

          <p className="text-xs text-slate-500">
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
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border bg-white transition-all active:scale-95 shadow-2xs"
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
        className="relative w-full h-[580px] overflow-hidden shadow-md border rounded-[28px] flex flex-col"
        style={{
          borderColor: theme.border,
          backgroundImage: sceneBackground ? `url(${sceneBackground})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: isFramedIllustrationStage ? '#f4ede3' : undefined
        }}
      >
        {!isFramedIllustrationStage && (
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
          <div className="absolute inset-0 bg-slate-900/60 flex flex-col justify-between p-8 sm:p-10 z-20">
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
            className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-lg"
            tone="warm"
          />
        )}

        {currentStage === 'entrance_scene' && (
          <>
            <DialogueCard
              text={entranceLines[entranceIndex]}
              buttonLabel={entranceIndex === entranceLines.length - 1 ? 'Look Closer' : 'Next'}
              onNext={entranceIndex === entranceLines.length - 1 ? handleOpenDoor : advanceEntranceStory}
              className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-lg"
              tone="warm"
            />

            {entranceIndex === entranceLines.length - 1 && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 text-slate-700 px-4 py-2 rounded-full text-[10px] font-semibold tracking-wide shadow-md z-20 animate-bounce">
                Tap the highlighted door area
              </div>
            )}

            {entranceIndex === entranceLines.length - 1 && (
              <button
                onClick={handleOpenDoor}
                className="absolute top-[90px] left-[375px] w-[240px] h-[410px] rounded-3xl bg-sky-400/5 border-2 border-dashed border-sky-300 cursor-pointer transition-all flex items-center justify-center hover:bg-sky-400/10 hover:scale-[1.01] z-20"
              >
                <span className="bg-white/92 text-sky-700 px-4 py-2 shadow-sm border border-sky-100 rounded-2xl text-[11px] font-semibold">
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
            className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-md"
            tone="warm"
          />
        )}

        {currentStage === 'player_see_kitty' && (
          <FramedIllustrationScene
            imageSrc={`${GAME_ASSET_PATH}/player_see_kitty.jpg`}
            alt="Player seeing Mello for the first time"
            text="This cat is so cute... is it a stray? I should take care of it."
            onNext={handleToConfused}
          />
        )}

        {currentStage === 'player_confused' && (
          <FramedIllustrationScene
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
            className="absolute top-6 left-6 w-[calc(100%-3rem)] sm:w-[420px]"
            tone="magic"
          />
        )}

        {currentStage === 'portal_scene' && (
          <DialogueCard
            text="Beyond this portal lies your first lesson. Observe, learn, interpret, and solve. When your heart is ready, the journey begins."
            buttonLabel="Enter Lesson 1"
            onNext={handleEnterLesson}
            className="absolute top-6 left-6 w-[calc(100%-3rem)] sm:w-[430px]"
            tone="magic"
          />
        )}

        {activeModal && (
          <div className="absolute inset-0 bg-slate-950/90 z-40 p-8 flex flex-col justify-between animate-fadeIn">
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

      <div className="space-y-3 pt-1">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Feline Learning Pathways
            </h3>
          </div>

          <span className="text-[10px] font-semibold bg-purple-50 text-purple-600 border border-purple-100 px-2 py-0.5 rounded-full">
            Unlocked: {unlockedLessons.length} / 10
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {lessonCards.map((lesson) => {
            const isUnlocked = unlockedLessons.includes(lesson.id);
            const isActive = currentLessonId === lesson.id;

            return (
              <div
                key={lesson.id}
                onClick={() => isUnlocked && setCurrentLessonId(lesson.id)}
                className={`p-3 border rounded-xl transition-all flex flex-col justify-between space-y-2 relative group ${
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
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-sm border ${
                        isUnlocked ? lesson.color : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {lesson.tag}
                    </span>

                    {!isUnlocked && <Lock className="w-2.5 h-2.5 text-slate-400" />}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-lg shrink-0">{isUnlocked ? lesson.emoji : '🔒'}</span>
                    <h4
                      className={`text-xs font-semibold tracking-tight line-clamp-1 ${
                        isUnlocked ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {lesson.title}
                    </h4>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 mt-1">
                    {isUnlocked ? lesson.description : "Keep exploring Mello's journey to unlock this card!"}
                  </p>
                </div>

                {isUnlocked && isActive && (
                  <div className="text-[9px] font-semibold text-center pt-1 text-orange-500 bg-orange-50/50 rounded-sm">
                    Viewing Lesson
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-2xl border px-4 py-3 text-xs flex items-center gap-2"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.cardBg,
          color: theme.textMuted
        }}
      >
        <BookOpen className="w-4 h-4" style={{ color: theme.primary }} />
        The next step after this portal is Lesson 1: kitty environment safety.
      </div>
    </div>
  );
}
