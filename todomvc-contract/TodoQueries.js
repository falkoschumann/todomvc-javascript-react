"use strict";

import TodoMessageTypes from "./TodoMessageTypes";

export function todoListQuery() {
  return { type: TodoMessageTypes.TODO_LIST_QUERY };
}

export function todoListQueryResult(todos) {
  return { todos };
}
