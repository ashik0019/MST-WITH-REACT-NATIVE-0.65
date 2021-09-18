import { SnapshotOrInstance, types } from 'mobx-state-tree';

export const TodoModel = types.model('Todo', {
  id: types.identifierNumber,
  name: types.string,
});


