import React, { useEffect, useState, useRef } from 'react';

function SpeedType() {
  const [data, setData] = useState<any>(); // Adjust the type according to your data structure
  const [times, setTime] = useState<number>();
  const input = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState(0);

  let timer = 30;

  async function fetchData() {
    const response = await fetch('http://api.quotable.io/random');
    const quoteData = await response.json();
    setData(quoteData);
    document.getElementById('textarea')?.focus()
  }
  useEffect(() => {
    fetchData();
  }, []);


  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const correctLetter = data?.content;
    const spans = document.querySelectorAll('#main span')
    
    spans.forEach((letterSpan, index) => {
      const Letters = e.target.value[index]
      if (Letters == null) {
        letterSpan.classList.remove('right')
        letterSpan.classList.remove('wrong')
      }
      else if (Letters === letterSpan.innerHTML) {
        letterSpan.classList.add('right')
        letterSpan.classList.remove('wrong')
      }
      else {
        letterSpan.classList.add('wrong')
        letterSpan.classList.remove('right')
        setError(prev => prev + 1)
      }
    })


    if (e.target.value === correctLetter) {
      fetchData()
      e.target.value = ''
      setError(0)
      timer = 30
      
      spans.forEach((element) => {
        (element as HTMLElement).style.color = '#777';
      });
    }
  }
  if(data !== null){useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(timer--);
      if (timer <= -1) {
        fetchData()
        timer = 30
        input.current!.value = ''
        setError(0)
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);}

  
  return (
    <div className="min-h-screen bg-blue-900 pt-8">
      <div className='flex justify-between w-[500px] mx-auto'>
        <p className='font-bold text-2xl text-slate-200 w-fit mx-auto my-5 '>Timer: <span className='text-red-500 ml-1'>{times}</span></p>
        <p className='font-bold text-2xl text-slate-200 w-fit mx-auto my-5 '>Typos: <span className='text-red-500 ml-1'>{error}</span></p>
      </div>
      <div className="bg-gray-400 drop-shadow-xl p-2 rounded-lg w-[500px] mx-auto">
        <div className='flex justify-between items-center mb-2'>
          <p className='font-bold text-sm'>Author: <span className='text-blue-700 ml-1'>{data?.author}</span></p>
          <p className='font-bold text-sm'>Published in: <span className='text-blue-700 ml-1'>{data?.dateAdded}</span></p>
        </div>
        <p id='main' className="text-black font-bold text-lg border-b-2 p-2 mb-5">
          {data?.content.split('').map((item: string, ind: number) => (
            <span
              key={ind}
              id={`s${ind.toString()}`}
              className='pb-1 mx-[1px]'
            >
              {item}
            </span>
          ))}
        </p>
        <textarea
          ref={input}
          onChange={(e) => onChange(e)}
          id='textarea'
          className="h-[200px] outline-none p-2 font-bold w-full rounded-lg bg-slate-200 text-slate-600 text-lg"
        ></textarea>
      </div>


    </div>
  );
}

export default SpeedType;

