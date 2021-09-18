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
        
      self.todos.put(todo);
      //self.selectedTodoId = todo1.id.toString();
      //alert('done')
    },
   
    
  }))
  .views((self) => ({
    get todosArr(){
      return [...self.todos.values()];
    },
    
  }));

