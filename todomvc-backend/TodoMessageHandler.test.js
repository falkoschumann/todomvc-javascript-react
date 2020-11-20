"use strict";

import TodoCommmands from "todomvc-contract/TodoCommands";

import MessageHandler from "./TodoMessageHandler";
import TodoRepository from "./adapters/TodoRepository";

jest.mock("./adapters/TodoRepository");
TodoRepository.load = jest.fn(() => []);

afterEach(() => {
  jest.resetAllMocks();
});

test("New todo command", () => {
  const command = TodoCommmands.newTodo("Taste JavaScript");

  const result = MessageHandler.handle(command);

  expect(result).toBe(true);
  expect(TodoRepository.load).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledWith([
    { id: 1, title: "Taste JavaScript", completed: false },
  ]);
});
