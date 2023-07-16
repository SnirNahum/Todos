const { createStore } = Vuex;

import { todosStore } from "./modules/todos.js";

const storeOptions = {
  strict: true,
  state() {
    return {
      isLoading: false,
    };
  },
  mutations: {
    setTodos(state, { todos }) {
      state.todos = todos;
    },
  },
  getters: {},
  modules: {
    todosStore,
  },
};
export const store = createStore(storeOptions);
