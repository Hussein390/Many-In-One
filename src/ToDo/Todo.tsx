import { useEffect, useReducer, useState } from 'react'
import TodoForm from './TodoForm'
import Task from './Task'
import { Action, ActionType } from './reducer'
import { Link, Route, Routes } from 'react-router-dom'
import Completed from './Completed'

export function Button(text: string, onclick: () => void, bg: string = 'blue-500') {
  return <button onClick={() => onclick()} className={`h-fit select-none whitespace-nowrap rounded mx-1 py-1 px-2 text-white bg-${bg}`}>{text}</button>
}
export type Todo = {
  id: number
  task: string
  complete: boolean
  edit: boolean
}


function reducer(todos: Todo[], action: Action) {
  switch (action.type) {
    case ActionType.Add_Todo:
      const id: number = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      const newTodo = { id: id, task: action.payload.task, complete: false, edit: false };
      return [...todos, newTodo]
    case ActionType.Delete_Todo:
      return todos.filter(todo => todo.id !== action.payload.id)
    case ActionType.Edit_Todo:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, edit: !todo.edit }
        } else {
          return todo
        }
      })
    case ActionType.Completed_Todo:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        } else {
          return todo
        }
      })
    case ActionType.Update_Todo:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, task: action.payload.task, edit: false }
        } else {
          return todo
        }
      })
    default:
      return todos
  }
}
export default function Todo() {
  const [todos, dispatch] = useReducer(reducer, [], (initialTodos: Todo[]) => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : initialTodos;
  });
  const [task, setTask] = useState('')
  const [editTask, setEditTask] = useState('')
  function handleAdd() {
    if (task !== '' && task !== null) {
      dispatch({ type: ActionType.Add_Todo, payload: { task: task } });
      setTask('');
    }
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <div className='p-2 flex items-center justify-end  text-slate-200 pr-5 gap-x-4 bg-slate-600'>
      <Link className='font-bold text-lg hover:text-blue-500' to='/todo' >Home</Link>
      <Link className='font-bold text-lg hover:text-blue-500' to='completed' >Completed</Link>
      </div>
        <div className='h-screen bg-slate-300 p-4'>
        <div className='container lg:w-[700px] mx-auto'>
          
      <Routes>
            <Route path='/' element={
              <>
                <TodoForm task={task} setTask={setTask} handleAdd={handleAdd} />
                <div className="flex gap-x-3 items-center">
                <span className="size-3 bg-black rounded-full"></span>
                <p   className='font-semibold text-slate-600'>Tow clicks the task will be in the completed section</p>
                </div>
        {todos.map((todo, ind) => {
                return <Task task={editTask} setEditTask={setEditTask} key={ind} dispatch={dispatch} todo={todo} /> 
        })}
                
              </>
            }/>
            <Route path='completed' element={<Completed todos={todos} dispatch={dispatch}/>} />
          </Routes>
          
          </div>
        </div>
    </>
  )
}
