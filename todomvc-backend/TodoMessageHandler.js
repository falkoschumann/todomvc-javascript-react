"use strict";

import TodoRepository from "./adapters/TodoRepository";

const MessageHandler = {
  handle(message) {
    const newTodo = { id: 1, title: message.title, completed: false };
    let todos = TodoRepository.load();
    todos = [...todos, newTodo];
    TodoRepository.store(todos);
    return true;
  },
};

export default MessageHandler;
