"use strict";

import TodoMessageTypes from "./TodoMessageTypes";

const TodoQueries = {
  allTodosQuery: () => {
    return { type: TodoMessageTypes.ALL_TODOS_QUERY };
  },

  allTodosQueryResult: (todos) => {
    return { todos };
  },

  activeTodosQuery: () => {
    return { type: TodoMessageTypes.ACTIVE_TODOS_QUERY };
  },

  activeTodosQueryResult: (todos) => {
    return { todos };
  },

  completedTodosQuery: () => {
    return { type: TodoMessageTypes.COMPLETED_TODOS_QUERY };
  },

  completedTodosQueryResult: (todos) => {
    return { todos };
  },
};

export default TodoQueries;
