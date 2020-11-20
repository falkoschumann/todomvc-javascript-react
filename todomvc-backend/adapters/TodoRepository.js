"use strict";

const STORAGE_KEY = "react-todos";

const TodoRepository = {
  load: () => {
    const json = window.localStorage.getItem(STORAGE_KEY);
    if (json == null) {
      return [];
    }
    return JSON.parse(json);
  },

  store: (todos) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

export default TodoRepository;
