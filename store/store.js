const { createStore } = Vuex;

const storeOptions = {
  strict: true,
  state() {
    return {
      todos: null,
      isLoading: false,
      currFilterBy:null,
      userObject: null,
    };
  },
  mutations: {
    setTodos(state, { todos }) {
      console.log('asd');
      state.todos = todos;
    },

    addTodo({ todos }, { savedTodo }) {
      todos.unshift(savedTodo);
    },
    removeTodo({ todos }, { todoId }) {
      const idx = todos.findIndex((todo) => todoId === todo._id);
      todos.splice(idx, 1);
    },
    toggleIsActive({ todos }, { todoId }) {
      const idx = todos.findIndex((todo) => todo._id === todoId);
      todos[idx].isActive = !todos[idx].isActive;
    },
  },
};
export const store = createStore(storeOptions);
