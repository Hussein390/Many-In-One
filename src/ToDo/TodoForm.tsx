import { Button } from './Todo';

type TodoFormProps = {
  task: string;
  setTask: (value: string) => void;
  handleAdd: () => void;
};

export default function TodoForm({ task, setTask, handleAdd }: TodoFormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className='mb-10'>
      <div className='flex'>
        <input
          className='w-full font-semibold p-1 outline-none border-b-[3px] border-slate-500'
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {Button('Add Todo', handleAdd)}
      </div>
    </form>
  );
}
