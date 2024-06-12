
type wordtoguess = {
  guessletter: string[],
  wordtoguess: string
}
function HangManWord({guessletter, wordtoguess}:wordtoguess) {

  return (
    <div className="w-fit mx-auto py-2">
    <div className='flex mt-3 gap-1 text-3xl font-bold uppercase'>
      {wordtoguess.split('').map((item, ind) => {
        return (
          <span key={ind} className='pb-1 border-b-4 mx-1 border-cyan-900'>
            <span style={{visibility: guessletter.includes(item)? 'visible' :'hidden'}}>{item}</span> 
          </span>
        )
      })}
    </div>
    </div>
  )
}

export default HangManWord
