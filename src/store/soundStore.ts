import { create } from 'zustand';

interface SoundState {
  volume: number;
  playingAudios: HTMLAudioElement[]
  playAudio(audio: HTMLAudioElement): Promise<void>
  toggleSound: () => void;
  setVolume(volume: number): void;
}

export const useSoundStore = create<SoundState>((set) => ({
  volume: 0,
  playingAudios: [],
  playAudio: (audio: HTMLAudioElement) => {
    set(state => {
      audio.volume = state.volume
      return {
        playingAudios: [...state.playingAudios, audio]
      }
    })
    // TODO: add event listener on audio, so that when an audio ends playing, we remove it from the list of playingAudios
    return audio.play()
  },
  toggleSound: () => {
    set((state) => {
      const newVolume = 1 - state.volume
      state.playingAudios.forEach(audio => {
        audio.volume = newVolume
      })
      return { volume: newVolume }
    })
  },
  setVolume: (volume: number) => set({ volume }),
}));

// Promise <=> async/await
// function doStuffPromise () {
//   return fetch('http://google.com')
//     .then((response) => {
//       // ...
//     })
//     .catch(error => {
//       console.error("pouet")
//       throw error
//     })
// }

// async function doStuffAwait () {
//   try {
//     const response = await fetch('http://google.com')
//     return response
//   } catch (error) {
//     console.error("pouet")
//     throw error
//   }
// }