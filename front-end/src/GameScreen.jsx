// src/GameScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { catThemes } from './themeStyles';
import { Volume2, VolumeX, Play, HelpCircle, FileText, ChevronRight, Target } from 'lucide-react';

export default function GameScreen({ currentTheme = 'orange' }) {
  // Game stages: 'intro', 'story_scene', 'entrance_scene', 'kitten_revealed'
  const [currentStage, setCurrentStage] = useState('intro');
  const [storyIndex, setStoryIndex] = useState(0);
  const [entranceIndex, setEntranceIndex] = useState(0);
  const [isPlayingBGM, setIsPlayingBGM] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const theme = catThemes[currentTheme] || catThemes.orange;
  const bgmRef = useRef(null);

  // Scene 1 Narrative (Top Left Overlay)
  const storyLines = [
    "It was a stormy evening...",
    "Mello the kitten was looking for shelter...",
    "And that's when she saw a house glowing bright."
  ];

  // Scene 2 Narrative (Bottom Right Overlay inside Hallway)
  const entranceLines = [
    "Meowww... meowwww....",
    "What's that sound...? A kitten?"
  ];

  useEffect(() => {
    // Configured with your exact rain asset file
    bgmRef.current = new Audio('/audio/rain_audio.mp3');
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.5;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isPlayingBGM) {
      bgmRef.current.pause();
      setIsPlayingBGM(false);
    } else {
      bgmRef.current.play().catch(err => console.log("Audio pipeline blocked:", err));
      setIsPlayingBGM(true);
    }
  };

  const playSoundEffect = (filename, volume = 0.5) => {
    const sfx = new Audio(`/audio/${filename}`);
    sfx.volume = volume;
    sfx.play().catch(err => console.log("SFX pipeline blocked:", err));
  };

  const handleStartGame = () => {
    playSoundEffect('click.mp3');
    setIsFading(true);
    setTimeout(() => {
      setCurrentStage('story_scene');
      setStoryIndex(0);
      setIsFading(false);
    }, 400);
  };

  const advanceStory = () => {
    playSoundEffect('click.mp3');
    if (storyIndex < storyLines.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      setIsFading(true);
      setTimeout(() => {
        setCurrentStage('entrance_scene');
        setEntranceIndex(0);
        setIsFading(false);
        playSoundEffect('cat_meow_inside.mp3', 0.6); 
      }, 400);
    }
  };

  const advanceEntranceStory = () => {
    playSoundEffect('click.mp3');
    if (entranceIndex < entranceLines.length - 1) {
      setEntranceIndex(entranceIndex + 1);
    }
  };

  const handleOpenDoor = () => {
    playSoundEffect('creaky_door.mp3', 0.6);
    setIsFading(true);
    
    setTimeout(() => {
      setCurrentStage('kitten_revealed');
      setIsFading(false);
      if (bgmRef.current) {
        bgmRef.current.volume = 0.2; 
      }
      playSoundEffect('cat_meow.mp3', 0.55);
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* HEADER SPECS */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span>🎮</span> Interactive Learn Room
          </h2>
          <p className="text-sm opacity-70">Make decisions, decipher sounds, and solve story branches safely.</p>
        </div>

        {/* CONTROLLER AUDIO TOGGLE */}
        <button 
          onClick={toggleMusic}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full border bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
          style={{ borderColor: theme.border, color: theme.primary }}
        >
          {isPlayingBGM ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          {isPlayingBGM ? 'AUDIO ON' : 'AUDIO OFF'}
        </button>
      </div>

      {/* CORE VIEWPORT GRAPHICS MAIN STAGE */}
      <div 
        className="relative w-full h-[580px] rounded-3xl overflow-hidden shadow-xl border-4 transition-all duration-300 flex flex-col"
        style={{
          borderColor: theme.cardBg,
          backgroundImage: `url(${
            currentStage === 'intro' || currentStage === 'story_scene' 
              ? '/assets/opening_scene.jpg' 
              : '/assets/entrance.jpg'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* OVERLAY PANEL: Drops asset onto background view frame */}
        {currentStage === 'kitten_revealed' && (
          <div 
            className="absolute inset-0 z-10 animate-fadeIn"
            style={{
              backgroundImage: "url('/assets/kitten_at_door.png')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              mixBlendMode: 'dark'
            }} 
          />
        )}

        {/* ================= STAGE 1: INTRO MENU SCREEN ================= */}
        {currentStage === 'intro' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 flex flex-col justify-between p-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-md">
                Episode 1: The Encounter
              </span>
              <h1 className="text-5xl font-black text-white tracking-tight mt-3 drop-shadow-md">
                Purrst Step
              </h1>
            </div>

            <div className="flex flex-col gap-3 max-w-xs">
              <button 
                onClick={handleStartGame} 
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-between shadow-lg text-white transition-all transform hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: theme.primary }}
              >
                <span className="flex items-center gap-2"><Play className="w-4 h-4 fill-white" /> PLAY GAME</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => alert("Follow the audio cues and click visual highlights to solve puzzles.")} 
                className="w-full py-3 px-6 rounded-xl font-bold text-sm flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-all"
              >
                <HelpCircle className="w-4 h-4" /> INSTRUCTIONS
              </button>
            </div>
          </div>
        )}

        {/* ================= STAGE 2: NARRATIVE MODULE ================= */}
        {currentStage === 'story_scene' && (
          <div className="absolute top-8 left-8 w-80 bg-white/90 backdrop-blur-md border p-6 rounded-2xl shadow-lg flex flex-col gap-4 animate-fadeIn"
               style={{ borderColor: theme.border }}>
            <p className="text-sm font-semibold leading-relaxed text-slate-800">
              {storyLines[storyIndex]}
            </p>
            <div className="flex justify-end">
              <button 
                onClick={advanceStory} 
                className="p-2 rounded-xl text-white transition-transform hover:scale-110 active:scale-95 shadow-sm"
                style={{ backgroundColor: theme.primary }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STAGE 3: INTERACTIVE HALLWAY MATRIX ================= */}
        {currentStage === 'entrance_scene' && (
          <>
            <div className="absolute bottom-8 right-8 w-80 bg-white/90 backdrop-blur-md border p-6 rounded-2xl shadow-lg flex flex-col gap-4 animate-fadeIn"
                 style={{ borderColor: theme.border }}>
              <p className="text-sm font-semibold leading-relaxed text-slate-800">
                {entranceLines[entranceIndex]}
              </p>
              {entranceIndex < entranceLines.length - 1 && (
                <div className="flex justify-end">
                  <button 
                    onClick={advanceEntranceStory} 
                    className="p-2 rounded-xl text-white transition-transform hover:scale-110 active:scale-95 shadow-sm"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Target objective and door active hitbox trigger point */}
            {entranceIndex === entranceLines.length - 1 && (
              <>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm animate-bounce">
                  <Target className="w-4 h-4" />
                  <span>OBJECTIVE: INTERACT WITH THE MAIN DOOR</span>
                </div>

                <button
                  onClick={handleOpenDoor}
                  className="absolute top-[90px] left-[375px] w-[240px] h-[410px] rounded-2xl bg-sky-500/5 border-2 border-dashed border-sky-400 cursor-pointer text-sky-500 font-extrabold text-xs transition-all flex items-center justify-center hover:bg-sky-500/10 hover:scale-[1.01]"
                >
                  <div className="bg-white/90 shadow-sm border border-sky-200 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    [ OPEN DOOR ]
                  </div>
                </button>
              </>
            )}
          </>
        )}

        {/* ================= STAGE 4: KITTEN REVEAL WRAPPER ================= */}
        {currentStage === 'kitten_revealed' && (
          <div className="absolute bottom-8 left-8 max-w-md bg-white/95 backdrop-blur-md border p-5 rounded-2xl shadow-xl flex items-center gap-4 z-20 animate-fadeIn"
               style={{ borderColor: theme.border }}>
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-sm">
              🐱
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primary }}>Mello Found!</span>
              <p className="text-sm font-medium text-slate-700 mt-0.5">
                "*Meowww... Prrr*" <span className="text-xs opacity-60 block">(The storm outside dampens as you shelter the kitten)</span>
              </p>
            </div>
          </div>
        )}

        {/* CINEMATIC TRANSITION FADE SCREEN */}
        <div 
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 z-50"
          style={{ opacity: isFading ? 1 : 0 }} 
        />
      </div>

      {/* FOOTER TASKBAR NOTICE BANNER */}
      <div className="p-4 rounded-xl text-center text-xs font-medium border flex items-center justify-center gap-2 bg-slate-50 border-slate-200 text-slate-500">
        💡 Tip: Listen closely to environment switches! Spatial sound cues help solve puzzle objectives.
      </div>
    </div>
  );
}