import React, { useState, useEffect, useRef } from 'react';

export default function GameScreen() {
  // Game stages: 'intro', 'story_scene', 'entrance_scene', 'kitten_revealed'
  const [currentStage, setCurrentStage] = useState('intro');
  const [storyIndex, setStoryIndex] = useState(0);
  const [entranceIndex, setEntranceIndex] = useState(0);
  const [isPlayingBGM, setIsPlayingBGM] = useState(false);
  const [isFading, setIsFading] = useState(false);

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
        // Triggers your custom indoor meow file when entering the frame
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
    // Triggers your custom creaking door asset file
    playSoundEffect('creaky_door.mp3', 0.6);
    setIsFading(true);
    
    setTimeout(() => {
      setCurrentStage('kitten_revealed');
      setIsFading(false);
      // Softens the background storm slightly once the hallway door context shifts
      if (bgmRef.current) {
        bgmRef.current.volume = 0.2; 
      }
      // Triggers your outside meow asset clip
      playSoundEffect('cat_meow.mp3', 0.55);
    }, 400);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1024px', margin: '0 auto' }}>
      
      {/* GLOBAL AUDIO PROTOCOL CONTROLLER */}
      <button 
        onClick={toggleMusic}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 50,
          padding: '6px 14px',
          borderRadius: '0px',
          border: '1px solid #334155',
          backgroundColor: isPlayingBGM ? '#1e293b' : '#020617',
          color: '#38bdf8',
          cursor: 'pointer',
          fontFamily: '"Courier New", Courier, monospace',
          fontWeight: '900',
          fontSize: '11px',
          letterSpacing: '1px'
        }}
      >
        {isPlayingBGM ? 'AUDIO ON' : 'AUDIO OFF'}
      </button>

      {/* CORE VIEWPORT GRAPHICS FRAME */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '560px',
        // Keeps the baseline room layout (entrance.jpg) active for all interactive phases
        backgroundImage: `url(${
          currentStage === 'intro' || currentStage === 'story_scene' 
            ? '/assets/opening_scene.jpg' 
            : '/assets/entrance.jpg'
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        fontFamily: '"Courier New", Courier, monospace',
        border: '3px solid #1e293b'
      }}>

        {/* OVERLAY PANEL: Drops the kitten_at_door asset squarely over the top layout */}
        {currentStage === 'kitten_revealed' && (
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundImage: "url('/assets/kitten_at_door.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'dark', // Drops out deep blacks to compose perfectly onto entrance background
            zIndex: 2
          }} />
        )}
        
        {/* ================= STAGE 1: SYSTEM INTRO PROTOCOL ================= */}
        {currentStage === 'intro' && (
          <>
            <div style={{
              position: 'absolute',
              top: '32px',
              left: '40px',
              color: '#ffffff',
              fontSize: '38px',
              fontWeight: '900',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textShadow: '3px 3px 0px #0f172a'
            }}>
              Purrst Step 
            </div>

            <div style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'flex-end'
            }}>
              <button onClick={handleStartGame} style={darkDomeButtonStyle(true)}>
                PLAY GAME
              </button>
              <button onClick={() => alert("Instructions data stream processing...")} style={darkDomeButtonStyle(false)}>
                INSTRUCTIONS
              </button>
              <button onClick={() => alert("Dev signature node processing...")} style={darkDomeButtonStyle(false)}>
                ABOUT US
              </button>
            </div>
          </>
        )}

        {/* ================= STAGE 2: NARRATIVE MODULE (TOP LEFT) ================= */}
        {currentStage === 'story_scene' && (
          <div style={compactBoxStyle(true)}>
            <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', lineHeight: '1.5' }}>
              &gt; {storyLines[storyIndex]}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={advanceStory} style={triangleButtonStyle}>►</button>
            </div>
          </div>
        )}

        {/* ================= STAGE 3: INTERACTIVE HALLWAY MATRIX (BOTTOM RIGHT) ================= */}
        {currentStage === 'entrance_scene' && (
          <>
            <div style={compactBoxStyle(false)}>
              <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', lineHeight: '1.5' }}>
                &gt; {entranceLines[entranceIndex]}
              </div>
              {entranceIndex < entranceLines.length - 1 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={advanceEntranceStory} style={triangleButtonStyle}>►</button>
                </div>
              )}
            </div>

            {/* Reveals objective and button mapping when speech strings finish */}
            {entranceIndex === entranceLines.length - 1 && (
              <>
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#7f1d1d',
                  border: '1px solid #ef4444',
                  color: '#ffffff',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: '900',
                  letterSpacing: '1px',
                  zIndex: 10
                }}>
                  [ OBJECTIVE: INTERACT WITH THE MAIN DOOR TO SEARCH OUTSIDE ]
                </div>

                <button
                  onClick={handleOpenDoor}
                  style={{
                    position: 'absolute',
                    top: '90px',
                    left: '375px',
                    width: '240px',
                    height: '410px',
                    background: 'rgba(56, 189, 248, 0.05)',
                    border: '2px dashed rgba(56, 189, 248, 0.4)',
                    cursor: 'pointer',
                    color: '#38bdf8',
                    fontWeight: '900',
                    fontSize: '12px',
                    transition: 'all 0.2s',
                    zIndex: 5
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(56, 189, 248, 0.15)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(56, 189, 248, 0.05)'}
                >
                  [ OPEN DOOR ]
                </button>
              </>
            )}
          </>
        )}

        {/* ================= STAGE 4: KITTEN REVEAL INTERACTION OVERLAY ================= */}
        {currentStage === 'kitten_revealed' && (
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            backgroundColor: 'rgba(2, 6, 23, 0.95)',
            border: '2px solid #334155',
            padding: '16px 24px',
            color: '#38bdf8',
            fontWeight: '900',
            fontSize: '14px',
            zIndex: 10
          }}>
            &gt; Mello: "*Meowww... Prrr*" (The storm audio dampens slightly inside the hallway context)
          </div>
        )}

        {/* CINEMATIC TRANSITION FADE SCREEN */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          pointerEvents: 'none',
          opacity: isFading ? 1 : 0,
          transition: 'opacity 0.35s ease-in-out',
          zIndex: 100
        }} />

      </div>
    </div>
  );
}

function compactBoxStyle(isTopLeft) {
  return {
    position: 'absolute',
    top: isTopLeft ? '40px' : 'auto',
    bottom: isTopLeft ? 'auto' : '40px',
    left: isTopLeft ? '40px' : 'auto',
    right: isTopLeft ? 'auto' : '40px',
    width: '320px',
    backgroundColor: 'rgba(2, 6, 23, 0.92)',
    border: '2px solid #334155',
    padding: '16px 20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    zIndex: 10
  };
}

const triangleButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#38bdf8',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '900',
  outline: 'none'
};

function darkDomeButtonStyle(isHighlight) {
  return {
    width: '220px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '900',
    borderRadius: '0px',
    fontFamily: '"Courier New", Courier, monospace',
    border: isHighlight ? '2px solid #38bdf8' : '1px solid #334155',
    background: isHighlight ? '#0f172a' : 'rgba(2, 6, 23, 0.85)',
    color: isHighlight ? '#38bdf8' : '#94a3b8',
    cursor: 'pointer',
    textAlign: 'left',
    letterSpacing: '1px',
    boxShadow: isHighlight ? '0 0 12px rgba(56, 189, 248, 0.25)' : 'none',
    transition: 'all 0.15s ease',
    outline: 'none'
  };
}