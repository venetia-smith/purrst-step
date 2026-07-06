// src/GameScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { catThemes } from './themeStyles';
import { apiFetch } from './lib/api';
import { 
  Volume2, VolumeX, Play, HelpCircle, ChevronRight, Target, Lock, Sparkles, Heart, Info 
} from 'lucide-react';

export default function GameScreen({ currentTheme = 'orange' }) {
  // Game stages: 'intro', 'story_scene', 'entrance_scene', 'kitten_revealed'
  const [currentStage, setCurrentStage] = useState('intro');
  const [storyIndex, setStoryIndex] = useState(0);
  const [entranceIndex, setEntranceIndex] = useState(0);
  const [isPlayingBGM, setIsPlayingBGM] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [activeModal, setActiveModal] = useState(null); 

  // Progression Engine States
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [unlockedLessons, setUnlockedLessons] = useState([1]);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
const [gameMessage, setGameMessage] = useState(''); 

  const theme = catThemes[currentTheme] || catThemes.orange;
  const bgmRef = useRef(null);

  const lessonCards = [
    { id: 1, title: "Surrounding Care", emoji: "🏠", description: "Set up a warm, safe spot for your new kitty.", tag: "Basics", color: "bg-pink-50 text-pink-600 border-pink-100" },
    { id: 2, title: "Safe Foods", emoji: "🐟", description: "Discover yummy treats and what to avoid completely.", tag: "Diet", color: "bg-amber-50 text-amber-600 border-amber-100" },
    { id: 3, title: "Meaning of Meow", emoji: "💬", description: "Learn what your cat is trying to say to you!", tag: "Language", color: "bg-purple-50 text-purple-600 border-purple-100" },
    { id: 4, title: "Vaccine Fun", emoji: "🩺", description: "Keep your little fluffball healthy and fully protected.", tag: "Health", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { id: 5, title: "Litter Box 101", emoji: "⏳", description: "Easy ways to help your cat get comfortable with litter.", tag: "Training", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { id: 6, title: "Making Friends", emoji: "🤝", description: "How to earn the trust of a super shy or scared cat.", tag: "Bonding", color: "bg-rose-50 text-rose-600 border-rose-100" },
    { id: 7, title: "Spa & Grooming", emoji: "✂️", description: "Brushing hair, safely clipping nails, and sweet baths.", tag: "Grooming", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
    { id: 8, title: "Kitty ID Badges", emoji: "🏷️", description: "All about microchips and collars to keep cats safe.", tag: "Safety", color: "bg-teal-50 text-teal-600 border-teal-100" },
    { id: 9, title: "New Roommates", emoji: "🐶", description: "Introducing your cat to other family pets smoothly.", tag: "Social", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
    { id: 10, title: "Golden Years", emoji: "🧓", description: "Special love and extra comfort tips for older cats.", tag: "Senior", color: "bg-violet-50 text-violet-600 border-violet-100" }
  ];

  const storyLines = [
    "It was a dark, stormy night...",
    "Mello the kitten was wandering outside looking for shelter...",
    "Suddenly, she saw a warm glow coming from your window!"
  ];

  const entranceLines = [
    "Meowww... meowwww....",
    "Wait, is that a tiny cry coming from the front porch?"
  ];

  useEffect(() => {
    bgmRef.current = new Audio('/audio/rain_audio.mp3');
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.5;
    return () => { if (bgmRef.current) bgmRef.current.pause(); };
  }, []);

  useEffect(() => {
    const loadGameProgress = async () => {
      try {
        const { progress } = await apiFetch('/api/game/progress');
  
        setCurrentLessonId(progress.current_lesson_id || 1);
        setUnlockedLessons(progress.unlocked_lessons || [1]);
        setCurrentStage(progress.current_stage || 'intro');
  
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

  const toggleMusic = () => {
    if (isPlayingBGM) {
      bgmRef.current.pause();
      setIsPlayingBGM(false);
    } else {
      bgmRef.current.play().catch(() => {});
      setIsPlayingBGM(true);
    }
  };

  const saveGameProgress = async ({
    lessonId,
    unlocked,
    stage,
    rescued
  }) => {
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

  const handleStartGame = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentStage('story_scene');
      setStoryIndex(0);
      setIsFading(false);
    }, 400);
  };

  const advanceStory = () => {
    if (storyIndex < storyLines.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      setIsFading(true);
      setTimeout(() => {
        setCurrentStage('entrance_scene');
        setEntranceIndex(0);
        setIsFading(false);
        unlockNextLesson(2, 'entrance_scene', false);
      }, 400);
    }
  };

  const advanceEntranceStory = () => {
    if (entranceIndex < entranceLines.length - 1) {
      setEntranceIndex(entranceIndex + 1);
    }
  };

  const handleOpenDoor = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentStage('kitten_revealed');
      setIsFading(false);
      unlockNextLesson(3, 'kitten_revealed', true);
    }, 400);
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

  const handleBackToDashboard = () => {
    setCurrentStage('intro');
  
    saveGameProgress({
      lessonId: currentLessonId,
      unlocked: unlockedLessons,
      stage: 'intro',
      rescued: unlockedLessons.includes(3)
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans antialiased">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>🐾</span> Purrst Step Learn Room
          </h2>
          <p className="text-xs text-slate-500">Play through stories to unlock sweet guides on taking care of cats!</p>
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
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border bg-white transition-all active:scale-95 shadow-2xs"
          style={{ borderColor: theme.border, color: theme.primary }}
        >
          {isPlayingBGM ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          {isPlayingBGM ? 'Music On' : 'Music Off'}
        </button>
      </div>

      {/* STAGE CONTAINER - SHARP EDGES */}
      <div 
        className="relative w-full h-[580px] rounded-none overflow-hidden shadow-md border-4 flex flex-col"
        style={{
          borderColor: '#2d3748',
          backgroundImage: `url(${
            currentStage === 'intro' || currentStage === 'story_scene' 
              ? '/assets/opening_scene.jpg' 
              : '/assets/entrance.jpg'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* KITTEN OVERLAY - RETAINS BALANCED SCREEN FRAME RENDERING */}
        {currentStage === 'kitten_revealed' && (
          <div 
            className="absolute inset-0 z-10 animate-fadeIn"
            style={{
              backgroundImage: "url('/assets/kitten_at_door.png')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} 
          />
        )}

        {/* STAGE 1: MAIN MENU */}
        {currentStage === 'intro' && (
          <div className="absolute inset-0 bg-slate-900/75 flex flex-col justify-between p-10 z-20">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-0.5">
                Current Lesson: {lessonCards[currentLessonId - 1].title}
              </span>
              <h1 className="text-3xl font-black text-white tracking-tight pt-1">
                Mello's Big Journey 
              </h1>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button 
                onClick={handleStartGame} 
                className="py-2.5 px-5 font-bold text-xs tracking-wide flex items-center gap-2 shadow-md text-white hover:bg-opacity-90 active:scale-95 transition-all"
                style={{ backgroundColor: theme.primary }}
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Start Game
              </button>
              
              <button 
                onClick={() => setActiveModal('instructions')} 
                className="py-2.5 px-4 font-semibold text-xs bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
              >
                Instructions
              </button>

              <button 
                onClick={() => setActiveModal('about')} 
                className="py-2.5 px-4 font-semibold text-xs bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
              >
                About Us
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: PETITE NARRATIVE OVERLAY */}
        {currentStage === 'story_scene' && (
          <div className="absolute bottom-6 left-6 max-w-xs bg-slate-950/90 border border-slate-700 p-3.5 shadow-xl flex flex-col gap-2 animate-fadeIn z-20">
            <p className="text-xs font-medium text-slate-100 leading-relaxed">
              {storyLines[storyIndex]}
            </p>
            <div className="flex justify-end">
              <button 
                onClick={advanceStory} 
                className="p-1 text-white hover:scale-105 active:scale-95"
                style={{ backgroundColor: theme.primary }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: INTERACTIVE ENTRANCE PORTAL - ORIGINAL COORDS APPLIED */}
        {currentStage === 'entrance_scene' && (
          <>
            <div className="absolute bottom-6 left-6 max-w-xs bg-slate-950/90 border border-slate-700 p-3.5 shadow-xl flex flex-col gap-2 animate-fadeIn z-20">
              <p className="text-xs font-medium text-slate-100 leading-relaxed">
                {entranceLines[entranceIndex]}
              </p>
              {entranceIndex < entranceLines.length - 1 && (
                <div className="flex justify-end">
                  <button 
                    onClick={advanceEntranceStory} 
                    className="p-1 text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {entranceIndex === entranceLines.length - 1 && (
              <>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md animate-bounce z-20">
                  Tap the door to check outside!
                </div>

                {/* Rolled back coordinates from Version 1 for perfect placement layout */}
                <button
                  onClick={handleOpenDoor}
                  className="absolute top-[90px] left-[375px] w-[240px] h-[410px] rounded-2xl bg-sky-500/5 border-2 border-dashed border-sky-400 cursor-pointer text-sky-500 font-extrabold text-xs transition-all flex items-center justify-center hover:bg-sky-500/10 hover:scale-[1.01] z-20"
                >
                  <span className="bg-white/90 text-sky-600 px-3 py-1.5 shadow-sm border border-sky-200 rounded-lg backdrop-blur-xs font-mono text-[10px] uppercase font-bold">[ Open Door ]</span>
                </button>
              </>
            )}
          </>
        )}

        {/* STAGE 4: REVEAL ENDING - PETITE & FLOATING */}
        {currentStage === 'kitten_revealed' && (
          <div className="absolute bottom-6 left-6 max-w-xs bg-slate-950/90 border border-slate-700 p-3.5 shadow-xl flex items-start gap-3 z-20 animate-fadeIn">
            <span className="text-xl mt-0.5 shrink-0">🐱</span>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-slate-100 leading-relaxed">
                You saved Mello! She is warm and safe indoors now. ❤️
              </p>
              <button 
  onClick={handleBackToDashboard}
  className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block hover:underline"
>
  Back to Dashboard →
</button>
            </div>
          </div>
        )}

        {/* MODALS */}
        {activeModal && (
          <div className="absolute inset-0 bg-slate-950/95 z-40 p-8 flex flex-col justify-between animate-fadeIn">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 border-b border-slate-800 pb-2">
                {activeModal === 'instructions' ? '📖 How to Play' : '✨ About Purrst Step'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                {activeModal === 'instructions' ? (
                  "Read through the narrative dialog updates. When you hear or see clues, interact directly with highlighted spaces inside the room to advance your lesson progression charts."
                ) : (
                  "We love cats! Purrst Step helps people understand feline behaviors, nutritional balances, and adoption workflows through simple, playful software mockups."
                )}
              </p>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-fit py-1.5 px-3 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wide"
            >
              Close Box
            </button>
          </div>
        )}

        {/* CINEMATIC TRANSITION */}
        <div className="absolute inset-0 bg-slate-950 pointer-events-none transition-opacity duration-500 z-50" style={{ opacity: isFading ? 1 : 0 }} />
      </div>

      {/* CUTE LESSON TIMELINE MAP */}
      <div className="space-y-3 pt-1">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Feline Learning Pathways
            </h3>
          </div>
          <span className="text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100 px-2 py-0.5 rounded-full">
            Unlocked: {unlockedLessons.length} / 10
          </span>
        </div>

        {/* GRID STRUCTURE */}
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
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm border ${isUnlocked ? lesson.color : 'bg-slate-100 text-slate-400'}`}>
                      {lesson.tag}
                    </span>
                    {!isUnlocked && <Lock className="w-2.5 h-2.5 text-slate-400" />}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-lg shrink-0">{isUnlocked ? lesson.emoji : "🔒"}</span>
                    <h4 className={`text-xs font-bold tracking-tight line-clamp-1 ${isUnlocked ? 'text-slate-800' : 'text-slate-400'}`}>
                      {lesson.title}
                    </h4>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 mt-1">
                    {isUnlocked ? lesson.description : "Keep exploring Mello's journey to unlock this card!"}
                  </p>
                </div>

                {isUnlocked && isActive && (
                  <div className="text-[9px] font-bold text-center pt-1 text-orange-500 bg-orange-50/50 rounded-sm">
                    Viewing Lesson
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}