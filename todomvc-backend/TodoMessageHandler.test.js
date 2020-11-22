"use strict";

import TodoCommmands from "todomvc-contract/TodoCommands";
import TodoQueries from "todomvc-contract/TodoQueries";

import MessageHandler from "./TodoMessageHandler";
import TodoRepository from "./adapters/TodoRepository";

jest.mock("./adapters/TodoRepository");

afterEach(() => {
  jest.resetAllMocks();
});

test("New todo command", () => {
  TodoRepository.load = jest.fn(() => []);

  const command = TodoCommmands.newTodo("Taste JavaScript");
  const result = MessageHandler.handle(command);

  expect(result).toBe(true);
  expect(TodoRepository.load).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledWith([
    {
      id: expect.any(String),
      title: "Taste JavaScript",
      completed: false,
    },
  ]);
});

test("Edit command", () => {
  TodoRepository.load = jest.fn(() => [
    {
      id: "6678a992-8a12-494f-90d7-228bc4abd36f",
      title: "Taste JavaScript",
      completed: true,
    },
    {
      id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
      title: "Buy a unicorn",
      completed: false,
    },
  ]);

  const command = TodoCommmands.edit(
    "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
    "Buy a horse"
  );
  const result = MessageHandler.handle(command);

  expect(result).toBe(true);
  expect(TodoRepository.load).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledWith([
    {
      id: "6678a992-8a12-494f-90d7-228bc4abd36f",
      title: "Taste JavaScript",
      completed: true,
    },
    {
      id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
      title: "Buy a horse",
      completed: false,
    },
  ]);
});

describe("Toggle command", () => {
  test("Set completed", () => {
    TodoRepository.load = jest.fn(() => [
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: true,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: false,
      },
    ]);

    const command = TodoCommmands.toggle(
      "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79"
    );
    const result = MessageHandler.handle(command);

    expect(result).toBe(true);
    expect(TodoRepository.load).toBeCalledTimes(1);
    expect(TodoRepository.store).toBeCalledTimes(1);
    expect(TodoRepository.store).toBeCalledWith([
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: true,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: true,
      },
    ]);
  });

  test("Set active", () => {
    TodoRepository.load = jest.fn(() => [
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: true,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: false,
      },
    ]);

    const command = TodoCommmands.toggle(
      "6678a992-8a12-494f-90d7-228bc4abd36f"
    );
    const result = MessageHandler.handle(command);

    expect(result).toBe(true);
    expect(TodoRepository.load).toBeCalledTimes(1);
    expect(TodoRepository.store).toBeCalledTimes(1);
    expect(TodoRepository.store).toBeCalledWith([
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: false,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: false,
      },
    ]);
  });
});

describe("Toggle all command", () => {
  test("Set all completed", () => {
    TodoRepository.load = jest.fn(() => [
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: true,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: false,
      },
    ]);

    const command = TodoCommmands.toggleAll();
    const result = MessageHandler.handle(command);

    expect(result).toBe(true);
    expect(TodoRepository.load).toBeCalledTimes(1);
    expect(TodoRepository.store).toBeCalledTimes(1);
    expect(TodoRepository.store).toBeCalledWith([
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: true,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: true,
      },
    ]);
  });

  test("Set all active", () => {
    TodoRepository.load = jest.fn(() => [
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: true,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: true,
      },
    ]);

    const command = TodoCommmands.toggleAll();
    const result = MessageHandler.handle(command);

    expect(result).toBe(true);
    expect(TodoRepository.load).toBeCalledTimes(1);
    expect(TodoRepository.store).toBeCalledTimes(1);
    expect(TodoRepository.store).toBeCalledWith([
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: false,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: false,
      },
    ]);
  });
});

test("Destroy command", () => {
  TodoRepository.load = jest.fn(() => [
    {
      id: "6678a992-8a12-494f-90d7-228bc4abd36f",
      title: "Taste JavaScript",
      completed: true,
    },
    {
      id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
      title: "Buy a unicorn",
      completed: false,
    },
  ]);

  const command = TodoCommmands.destroy("d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79");
  const result = MessageHandler.handle(command);

  expect(result).toBe(true);
  expect(TodoRepository.load).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledWith([
    {
      id: "6678a992-8a12-494f-90d7-228bc4abd36f",
      title: "Taste JavaScript",
      completed: true,
    },
  ]);
});

test("Clear completed command", () => {
  TodoRepository.load = jest.fn(() => [
    {
      id: "6678a992-8a12-494f-90d7-228bc4abd36f",
      title: "Taste JavaScript",
      completed: true,
    },
    {
      id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
      title: "Buy a unicorn",
      completed: false,
    },
  ]);

  const command = TodoCommmands.clearCompleted();
  const result = MessageHandler.handle(command);

  expect(result).toBe(true);
  expect(TodoRepository.load).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledTimes(1);
  expect(TodoRepository.store).toBeCalledWith([
    {
      id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
      title: "Buy a unicorn",
      completed: false,
    },
  ]);
});

test("All todos query", () => {
  TodoRepository.load = jest.fn(() => [
    {
      id: "6678a992-8a12-494f-90d7-228bc4abd36f",
      title: "Taste JavaScript",
      completed: true,
    },
    {
      id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
      title: "Buy a unicorn",
      completed: false,
    },
  ]);

  const query = TodoQueries.allTodosQuery();
  const result = MessageHandler.handle(query);

  expect(result).toEqual({
    todos: [
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: true,
      },
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: false,
      },
    ],
  });
  expect(TodoRepository.load).toBeCalledTimes(1);
});

test("Active todos query", () => {
  TodoRepository.load = jest.fn(() => [
    {
      id: "6678a992-8a12-494f-90d7-228bc4abd36f",
      title: "Taste JavaScript",
      completed: true,
    },
    {
      id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
      title: "Buy a unicorn",
      completed: false,
    },
  ]);

  const query = TodoQueries.activeTodosQuery();
  const result = MessageHandler.handle(query);

  expect(result).toEqual({
    todos: [
      {
        id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
        title: "Buy a unicorn",
        completed: false,
      },
    ],
  });
  expect(TodoRepository.load).toBeCalledTimes(1);
});

test("Completed todos query", () => {
  TodoRepository.load = jest.fn(() => [
    {
      id: "6678a992-8a12-494f-90d7-228bc4abd36f",
      title: "Taste JavaScript",
      completed: true,
    },
    {
      id: "d0e4900d-5f1f-4d8a-bd6f-5a80fc957e79",
      title: "Buy a unicorn",
      completed: false,
    },
  ]);

  const query = TodoQueries.completedTodosQuery();
  const result = MessageHandler.handle(query);

  expect(result).toEqual({
    todos: [
      {
        id: "6678a992-8a12-494f-90d7-228bc4abd36f",
        title: "Taste JavaScript",
        completed: true,
      },
    ],
  });
  expect(TodoRepository.load).toBeCalledTimes(1);
});
