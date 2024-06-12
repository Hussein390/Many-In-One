const Keys = 'qwertyuiopasdfghjklzxcvbnm';

type KeyBoard = {
  activeLetters: string[],
  addguessLetters: (letter: string)=> void
}
function Keybord({activeLetters, addguessLetters}: KeyBoard) {
  return (
    <div className='grid gap-2 mt-5'
    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(55px, 1fr)) ", }}>
      {Keys.split('').map((item, ind) => {
        const active = activeLetters.includes(item)
        return (
          <button key={ind} onClick={(ids) => {
            ids.target.style.opacity = .3;
            ids.target.style.background= 'red';
            
            addguessLetters(item)
          
          }
      } style={active ? { background: 'blue', color: 'white'}: {background: ''}}
            
            className='text-xl uppercase hover:bg-gray-400
            border-2 border-black font-bold cursor-pointer bg-slate-200 size-10 rounded-full'>{item}</button>
        )
      })}
    </div>
  )
}

export default Keybord
