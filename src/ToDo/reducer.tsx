export enum ActionType {
  Add_Todo = 'Add_Todo',
  Delete_Todo = 'Delete_Todo',
  Edit_Todo = 'Edit_Todo',
  Update_Todo = 'Update_Todo',
  Completed_Todo = 'Completed_Todo',
}

interface AddTodoAction {
  type: ActionType.Add_Todo;
  payload: { task: string };
}

interface DeleteTodoAction {
  type: ActionType.Delete_Todo;
  payload: { id: number };
}
interface UpdateTodoAction {
  type: ActionType.Update_Todo;
  payload: { id: number, task: string };
}
interface EditTodoAction {
  type: ActionType.Edit_Todo;
  payload: { id: number };
}
interface CompletedTodoAction {
  type: ActionType.Completed_Todo;
  payload: { id: number };
}

export type Action = AddTodoAction | DeleteTodoAction | EditTodoAction | UpdateTodoAction | CompletedTodoAction
