import React from 'react';

import { Button, Todo } from './Todo'
import { Action, ActionType } from './reducer';
type CompletedProps = {
  todos: Todo[],
  dispatch: React.Dispatch<Action>;
}

export default function Completed({ todos, dispatch }: CompletedProps) {
  function handleComplete(id: number) {
    dispatch({ type: ActionType.Completed_Todo, payload: { id: id } });
  }
  return (
    <div>
      {todos.map(todo => {
        return (
          todo.complete && (
            <div className='relative flex cursor-pointer mx-auto w-fit p-3 bg-slate-200 rounded my-6'>
              {<p className='absolute -top-3 -right-3 flex items-center justify-center font-bold size-7 rounded-full bg-green-500 text-slate-50'>✔</p>}
              <h1 className='w-[150px] select-none p-1 px-2 mr-2 b'>{todo.task}</h1>
              {Button(('UnCompleted'), () => handleComplete(todo.id))}
            </div>
          )
        )
      })}
    </div>
  );
}
