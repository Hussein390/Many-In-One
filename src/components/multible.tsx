import { useState } from 'react'

type Div = {
  one: string,
  two: string,
  three: string,
  isopenNum: number,
}

function Multible() {
  const [isOpen, setIsOpen] = useState<number>(1)
  function Div({ one, two, three, isopenNum }: Div) {
    return (
      <div className='p-3 text-center'>
        <div className='my-2'>
          <label className='font-bold text-lg block'>{one}</label>
          <input className='p-2  bg-slate-200 rounded' type='text' />
        </div>
        <div className='my-2'>
          <label className='font-bold text-lg block'>{two}</label>
          <input className='p-2 bg-slate-200 rounded' type='text' />
        </div>
        <div className='my-2'>
          <label className='font-bold text-lg block'>{three}</label>
          <input className='p-2 bg-slate-200 rounded' type='text' />
        </div>
        <button onClick={() => setIsOpen(isopenNum)} className='p-2 w-fit ml-auto mt-4 bg-slate-200 rounded text-blue-600'>Next</button>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-slate-400 pt-4'>
      <div id='div' className='relative w-[400px] mx-auto  rounded-md bg-slate-300'>
        <p className='absolute left-2 top-2 font-bold text-lg'>3/{isOpen}</p>
        {isOpen === 1 ?
          <Div
            one='First Name'
            two='Last Name'
            three='Phone Number'
            isopenNum={2}
          />
          : isOpen === 2 ?
            <Div
              one='Degree'
              two='Contry'
              three='Skills'
              isopenNum={3}
            />
            :
            <Div
              one='Freinds'
              two='Goals'
              three='Yourself'
              isopenNum={1}
            />
        }
      </div>
    </div>
  )
}

export default Multible
