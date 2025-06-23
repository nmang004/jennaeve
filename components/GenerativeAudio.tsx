'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tone from 'tone'
import { Volume2, VolumeX } from 'lucide-react'
import { easings, durations } from '@/lib/motion'

interface GenerativeAudioProps {
  enabled?: boolean
  onToggle?: (enabled: boolean) => void
}

export default function GenerativeAudio({ enabled = false, onToggle }: GenerativeAudioProps) {
  const [isEnabled, setIsEnabled] = useState(enabled)
  const [isInitialized, setIsInitialized] = useState(false)
  const [volume, setVolume] = useState(0.3)
  
  // Audio synthesis components
  const synthRef = useRef<Tone.PolySynth | null>(null)
  const filterRef = useRef<Tone.Filter | null>(null)
  const reverbRef = useRef<Tone.Reverb | null>(null)
  const delayRef = useRef<Tone.PingPongDelay | null>(null)
  const noiseRef = useRef<Tone.Noise | null>(null)
  const sequenceRef = useRef<Tone.Sequence | null>(null)

  // Initialize audio context and synthesizers
  const initializeAudio = useCallback(async () => {
    try {
      await Tone.start()
      
      // Create reverb
      reverbRef.current = new Tone.Reverb({
        decay: 8,
        wet: 0.3
      }).toDestination()

      // Create delay
      delayRef.current = new Tone.PingPongDelay({
        delayTime: '8n',
        feedback: 0.2,
        wet: 0.1
      }).connect(reverbRef.current)

      // Create filter
      filterRef.current = new Tone.Filter({
        frequency: 2000,
        type: 'lowpass',
        rolloff: -24
      }).connect(delayRef.current)

      // Create main synthesizer
      synthRef.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: 'triangle'
        },
        envelope: {
          attack: 0.8,
          decay: 0.3,
          sustain: 0.1,
          release: 2.0
        }
      }).connect(filterRef.current)

      // Create ambient noise
      noiseRef.current = new Tone.Noise({
        type: 'pink',
        volume: -25
      }).connect(filterRef.current)

      // Set initial volume
      Tone.Destination.volume.value = Tone.gainToDb(volume)
      
      setIsInitialized(true)
    } catch (error) {
      console.warn('Audio initialization failed:', error)
    }
  }, [volume])

  // Ambient sequence for continuous sound
  const startAmbientSequence = useCallback(() => {
    if (!synthRef.current || !noiseRef.current) return

    // Start ambient noise
    noiseRef.current.start()

    // Create a generative sequence
    const notes = ['C4', 'E4', 'G4', 'B4', 'D5', 'F#5']
    
    sequenceRef.current = new Tone.Sequence((time, note) => {
      if (synthRef.current && Math.random() > 0.7) {
        // Only play notes occasionally for subtlety
        synthRef.current.triggerAttackRelease(note, '2n', time, 0.1)
      }
      
      // Modulate filter frequency for movement
      if (filterRef.current) {
        const targetFreq = 1000 + Math.sin(time * 0.1) * 500
        filterRef.current.frequency.exponentialRampTo(targetFreq, '4n')
      }
    }, notes, '4n')

    sequenceRef.current.start(0)
    Tone.Transport.start()
  }, [])

  const stopAmbientSequence = useCallback(() => {
    if (sequenceRef.current) {
      sequenceRef.current.stop()
      sequenceRef.current.dispose()
      sequenceRef.current = null
    }
    
    if (noiseRef.current) {
      noiseRef.current.stop()
    }
    
    Tone.Transport.stop()
  }, [])

  // Interaction sounds
  const playHoverSound = useCallback(() => {
    if (!synthRef.current || !isEnabled) return
    
    const notes = ['C5', 'E5', 'G5']
    const note = notes[Math.floor(Math.random() * notes.length)]
    synthRef.current.triggerAttackRelease(note, '16n', undefined, 0.05)
  }, [isEnabled])

  const playClickSound = useCallback(() => {
    if (!synthRef.current || !isEnabled) return
    
    synthRef.current.triggerAttackRelease('C6', '32n', undefined, 0.08)
  }, [isEnabled])

  // Toggle audio
  const toggleAudio = useCallback(async () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    
    if (newState && !isInitialized) {
      await initializeAudio()
    }
    
    if (newState && isInitialized) {
      startAmbientSequence()
    } else {
      stopAmbientSequence()
    }
    
    onToggle?.(newState)
  }, [isEnabled, isInitialized, initializeAudio, startAmbientSequence, stopAmbientSequence, onToggle])

  // Attach global event listeners for interactions
  useEffect(() => {
    if (!isEnabled) return

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        playHoverSound()
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        playClickSound()
      }
    }

    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('click', handleClick, true)
    }
  }, [isEnabled, playHoverSound, playClickSound])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbientSequence()
      
      // Dispose of all audio components
      if (synthRef.current) {
        synthRef.current.dispose()
      }
      if (filterRef.current) {
        filterRef.current.dispose()
      }
      if (reverbRef.current) {
        reverbRef.current.dispose()
      }
      if (delayRef.current) {
        delayRef.current.dispose()
      }
      if (noiseRef.current) {
        noiseRef.current.dispose()
      }
    }
  }, [stopAmbientSequence])

  // Update volume when changed
  useEffect(() => {
    if (isInitialized) {
      Tone.Destination.volume.value = Tone.gainToDb(volume)
    }
  }, [volume, isInitialized])

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: durations.standard, 
        ease: easings.bounce,
        delay: 2 
      }}
    >
      <motion.button
        onClick={toggleAudio}
        className="group relative p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-charcoal/10 hover:bg-white/90 transition-all duration-300"
        whileHover={{
          scale: 1.05,
          y: -2,
          transition: { duration: durations.micro, ease: easings.snap }
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: durations.micro }
        }}
      >
        <AnimatePresence mode="wait">
          {isEnabled ? (
            <motion.div
              key="enabled"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: durations.fast, ease: easings.power }}
            >
              <Volume2 className="w-5 h-5 text-charcoal" />
            </motion.div>
          ) : (
            <motion.div
              key="disabled"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: durations.fast, ease: easings.power }}
            >
              <VolumeX className="w-5 h-5 text-charcoal/60" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse indicator when enabled */}
        <AnimatePresence>
          {isEnabled && (
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 0.8], 
                opacity: [0, 0.6, 0] 
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: easings.fluid
              }}
            />
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-charcoal text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
          initial={{ y: 5 }}
          animate={{ y: 0 }}
        >
          {isEnabled ? 'Disable ambient audio' : 'Enable ambient audio'}
          <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-charcoal" />
        </motion.div>
      </motion.button>

      {/* Volume control when enabled */}
      <AnimatePresence>
        {isEnabled && (
          <motion.div
            className="absolute bottom-full right-0 mb-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-charcoal/10"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: durations.fast, ease: easings.power }}
          >
            <div className="flex items-center space-x-2 text-xs text-charcoal/70">
              <span>Vol</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-charcoal/20 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #333 0%, #333 ${volume * 100}%, #33333330 ${volume * 100}%, #33333330 100%)`
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}