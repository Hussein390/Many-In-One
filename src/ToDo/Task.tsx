import { Button } from './Todo'
import { ActionType, Action } from './reducer'

type TaskProps = {
  dispatch: React.Dispatch<Action>;
  todo: {
    id: number,
    task: string,
    edit: boolean,
    complete: boolean
  },
  task: string,
  setEditTask: (vlaue: string) => void,
}
export default function Task({ dispatch, todo, task, setEditTask }: TaskProps) {
  function handleDelete(id: number) {
    dispatch({ type: ActionType.Delete_Todo, payload: { id: id } })
  }
  function handleEdit(id: number) {
    dispatch({ type: ActionType.Edit_Todo, payload: { id: id } });
  }
  function handleComplete(id: number) {
    dispatch({ type: ActionType.Completed_Todo, payload: { id: id } });
  }
  function handlUpdate(id: number) {
    dispatch({ type: ActionType.Update_Todo, payload: { id: id, task: task } });
  }
  return (
    <div className="">
      {todo.complete === false &&
        <div onDoubleClick={() => handleComplete(todo.id)} className='relative flex cursor-pointer mx-auto w-fit p-3 bg-slate-200 rounded my-6'>
          {todo.edit ?
            <>
              <input className='bg-transparent border-b-2 mr-1 border-slate-400 p-1 outline-none' type='text' value={task} onChange={e => setEditTask(e.target.value)} />
              {Button('Save', () => handlUpdate(todo.id), 'blue-500')}
              {Button('Cancel', () => handleEdit(todo.id), 'slate-400')}
            </>
            :
            <>
              {todo.complete && <p className='absolute -top-3 -right-3 flex items-center justify-center font-bold size-7 rounded-full bg-green-500 text-slate-50'>✔</p>}
              <h1 className='w-[150px] select-none p-1 px-2 mr-2 b'>{todo.task}</h1>
              {Button('Delete', () => handleDelete(todo.id), 'slate-400')}
              {Button('Edit', () => {
                setEditTask(todo.task)
                handleEdit(todo.id)
              })}
            </>
          }
        </div>
      }
    </div>
    
  )
}
