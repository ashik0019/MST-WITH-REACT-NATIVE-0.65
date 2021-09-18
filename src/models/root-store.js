import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { TodoModel } from './todo';
import {User} from './user'

export const RootStore = types
  .model('RootStore', {
    user: User,
    todos: types.map(TodoModel),
    selectedTodoId: types.maybe(types.string),
   
  })
  .actions((self) => ({
     addTodo(todo) {
         let todo1 = {
             id: 12,
             name: 'sadaf'
         }
      self.todos.put(todo1);
      self.selectedTodoId = todo.id.toString();
    },
   
    removeTodo(id) {
      self.todos.delete(id);
    },
    
  }))
  .views((self) => ({
    get todosArr(){
      return [...self.todos.values()];
    },
    
  }));

