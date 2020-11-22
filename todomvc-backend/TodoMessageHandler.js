"use strict";

import TodoMessageTypes from "todomvc-contract/TodoMessageTypes";
import TodoQueries from "todomvc-contract/TodoQueries";
import TodoRepository from "./adapters/TodoRepository";
import UUID from "./UUID";

const MessageHandler = {
  handle: (message) => {
    switch (message.type) {
      case TodoMessageTypes.NEW_TODO_COMMAND: {
        const newTodo = {
          id: UUID.randomUUID(),
          title: message.title,
          completed: false,
        };
        let todos = TodoRepository.load();
        todos = [...todos, newTodo];
        TodoRepository.store(todos);
        return true;
      }
      case TodoMessageTypes.EDIT_COMMAND: {
        let todos = TodoRepository.load();
        todos = todos.map((it) =>
          it.id === message.id ? { ...it, title: message.title } : it
        );
        TodoRepository.store(todos);
        return true;
      }
      case TodoMessageTypes.TOGGLE_COMMAND: {
        let todos = TodoRepository.load();
        todos = todos.map((it) =>
          it.id === message.id ? { ...it, completed: !it.completed } : it
        );
        TodoRepository.store(todos);
        return true;
      }
      case TodoMessageTypes.TOGGLE_ALL_COMMAND: {
        let todos = TodoRepository.load();
        const completedCount = todos.filter((it) => it.completed).length;
        const allCompleted = todos.length === completedCount;
        todos = todos.map((it) => ({ ...it, completed: !allCompleted }));
        TodoRepository.store(todos);
        return true;
      }
      case TodoMessageTypes.DESTROY_COMMAND: {
        let todos = TodoRepository.load();
        todos = todos.filter((it) => it.id !== message.id);
        TodoRepository.store(todos);
        return true;
      }
      case TodoMessageTypes.CLEAR_COMPLETED_COMMAND: {
        let todos = TodoRepository.load();
        todos = todos.filter((it) => !it.completed);
        TodoRepository.store(todos);
        return true;
      }
      case TodoMessageTypes.ALL_TODOS_QUERY: {
        const todos = TodoRepository.load();
        return TodoQueries.allTodosQueryResult(todos);
      }
      case TodoMessageTypes.ACTIVE_TODOS_QUERY: {
        let todos = TodoRepository.load();
        todos = todos.filter((it) => !it.completed);
        return TodoQueries.activeTodosQueryResult(todos);
      }
      case TodoMessageTypes.COMPLETED_TODOS_QUERY: {
        let todos = TodoRepository.load();
        todos = todos.filter((it) => it.completed);
        return TodoQueries.completedTodosQueryResult(todos);
      }
    }
  },
};

export default MessageHandler;
