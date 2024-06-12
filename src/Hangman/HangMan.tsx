
const Head = (
  <div className='size-14 rounded-full border-8 border-black absolute top-14 -right-6'>
  </div>
)
const Body = (
  <div className=' w-2 h-24 bg-black absolute top-[110px] right-0'>
  </div>
)
const RightHand = (
  <div className=' w-2 h-20 bg-black absolute top-[95px] rotate-[60deg] -right-8'>
  </div>
)
const Lefthand = (
  <div className=' w-2 h-20 bg-black absolute top-[95px] -rotate-[60deg] right-8'>
  </div>
)
const RightLeg = (
  <div className=' w-2 h-20 bg-black absolute top-[195px] -rotate-[40deg] -right-7'>
  </div>
)
const LeftLeg = (
  <div className=' w-2 h-20 bg-black absolute top-[195px] rotate-[40deg] right-7'>
  </div>
)
const BODY_PARTS = [Head, Body, LeftLeg, Lefthand, RightLeg, RightHand]
type HangManWord = {numberOfGuess: number}
function HangMan({numberOfGuess}: HangManWord) {
  return (
    <div  className='relative w-fit  mt-10'>
      {BODY_PARTS.slice(0, numberOfGuess)}
      <div className='h-16 w-2 absolute top-0 right-0 ml-32 bg-black'></div>
      <div className='h-2 w-44 ml-24 md:w-52 md:ml-32 bg-black'></div>
      <div className='h-[320px]  w-2 ml-24 md:ml-32 bg-black'></div>
      <div className='h-2 w-52 md:w-64 bg-black'></div>
    </div>
  )
}

export default HangMan
