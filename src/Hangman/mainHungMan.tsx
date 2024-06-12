import { useCallback, useEffect, useState } from 'react';
import Word from '../Word.json'
import HangMan from './HangMan';
import HangManWord from './HangManWord';
import Keybord from './keyBoard';

function MainHangMan() {
  const [word, setword] = useState(() => {
    return Word[Math.floor(Math.random() * Word.length)]
  });
  const [gussesword, setGussesword] = useState<string[]>([]);

  const incorrectLetter = gussesword.filter(letter => !word.includes(letter))

  const addGuessLetter = useCallback((letter: string) => {
    if (gussesword.includes(letter)) return
    setGussesword(currentLetter => [...currentLetter, letter])
  }, [gussesword])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!e.key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessLetter(key)
    }
    document.addEventListener('keypress', handler)
    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [gussesword])
  const lettersinWrod = gussesword.filter(letter => word.includes(letter))
  const loser = incorrectLetter.length >= 6;
  const winer = word.split('').every(letter => gussesword.includes(letter));
  return (
    <div className={`min-h-screen bg-slate-300 `}>
      <div className={` md:w-[600px]  text-center container p-4 mx-auto min-h-screen bg-slate-400 ${loser && 'bg-slate-800 '}`}>

        {winer &&
          <>
            <h1 className='text-2xl capitalize  font-bold text-white'>
              Good Job Winer
            </h1>
            <button className='py-1 px-2 rounded text-white bg-slate-500 mt-3' onClick={() => window.location.reload()}>Refresh</button>
          </>
        }
        {loser &&
          <>
            <h1 className='text-2xl capitalize  font-bold text-white'>
              Good Job Loser
            </h1>
            <button className='py-1 px-2 rounded text-white bg-slate-500 mt-3' onClick={() => window.location.reload()}>Refresh</button>
          </>}
        <HangMan numberOfGuess={incorrectLetter.length} />
        <HangManWord guessletter={gussesword} wordtoguess={word} />
        <Keybord activeLetters={lettersinWrod}
          addguessLetters={addGuessLetter} />
      </div>
    </div>
  );
}

export default MainHangMan;
