const { createStore } = Vuex;

const storeOptions = {
  strict: true,
  state() {
    return {
      todos: null,
      isLoading: false,
      currFilterBy: null,
      userObject: null,
    };
  },
  mutations: {
    setTodos(state, { todos }) {
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
  getters: {
    todosLength: state => {
      if (state.todos) {
        return state.todos.length;
      }
      
    },
    completedTodosCount: state=>{
      if(state.todos){
        console.log(state.currFilterBy);
        const completedTodos = state.todos.filter(todo=>!todo.isActive)
        return completedTodos.length
      }
    }
  },
};
export const store = createStore(storeOptions);
