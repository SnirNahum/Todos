import { todoService } from "../../services/todos.service.js";

export const todosStore = {
  strict: true,
  state() {
    return {
      todos: null,
    };
  },
  mutations: {
    setTodos(state, { todos }) {
      state.todos = todos;
    },

    addTodo({ todos }, { savedTodo }) {
      todos.push(savedTodo);
    },
    removeTodo({ todos }, { todoId }) {
      const idx = todos.findIndex((todo) => todoId === todo._id);
      todos.splice(idx, 1);
    },

    todoCompleted({ todos }, { todo }) {
      const idx = todos.findIndex((currTodo) => currTodo._id === todo._id);
      todos.splice(idx, 1, todo);
    },
  },
  getters: {
    todosLength: (state) => {
      if (state.todos) {
        return state.todos.length;
      }
    },
    completedTodosCount: (state) => {
      if (state.todos) {
        const completedTodos = state.todos.filter((todo) => !todo.isActive);
        return completedTodos.length;
      }
    },
    todos({ todos }) {
      return todos;
    },
  },
  actions: {
    loadTodos({ commit }) {
      todoService.query().then((todos) => commit({ type: "setTodos", todos }));
    },
    removeTodo({ commit }, { todoId }) {
      return todoService
        .remove(todoId)
        .then(() => {
          commit({ type: "removeTodo", todoId });
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject();
        });
    },
    addTodo({ commit }, { todo }) {
      return todoService
        .save(todo)
        .then((savedTodo) => {
          commit({ type: "addTodo", savedTodo });
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject();
        });
    },
    todoCompleted({ commit }, { todo }) {
      return todoService
        .save(todo)
        .then(() => {
          commit({ type: "todoCompleted", todo });
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject();
        });
    },
  },
};
