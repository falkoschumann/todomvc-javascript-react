"use strict";

import TodoMessageTypes from "./TodoMessageTypes";

const TodoCommmands = {
  newTodo: (title) => {
    return { type: TodoMessageTypes.NEW_TODO_COMMAND, title };
  },

  edit: (id, title) => {
    return { type: TodoMessageTypes.EDIT_COMMAND, id, title };
  },

  toggle: (id) => {
    return { type: TodoMessageTypes.TOGGLE_COMMAND, id };
  },

  toggleAll: () => {
    return { type: TodoMessageTypes.TOGGLE_ALL_COMMAND };
  },

  destroy: (id) => {
    return { type: TodoMessageTypes.DESTROY_COMMAND, id };
  },

  clearCompleted: () => {
    return { type: TodoMessageTypes.CLEAR_COMPLETED_COMMAND };
  },
};

export default TodoCommmands;
