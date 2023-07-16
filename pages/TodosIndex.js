import { todoService } from "../services/todos.service.js";
import { userService } from "../services/user.service.js";

import TodosList from "../cmps/TodosList.js";
import TodoAdd from "../cmps/TodoAdd.js";
import TodoFilter from "../cmps/TodoFilter.js";

import Spinner from "../cmps/Spinner.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export default {
  template: `
      <section v-if="todos" class="todos-index">
            <h1>Todos</h1>
            
            <TodoAdd />
            <TodosList :todos="todos" 
            @remove="removeTodo"
            @todoCompleted="todoCompleted"
            />
            <TodoFilter @filter="setFilterBy"/>
            
      </section>
      <section v-else><Spinner/></section>`,
  created() {
    this.$store.dispatch({type:'loadTodos'})
      
  },
  computed: {
    todos() {
      return this.$store.getters.todos;
    },
  },
  methods: {
    removeTodo(todoId) {
      this.$store
        .dispatch({ type: "removeTodo", todoId })
        .then(() => showSuccessMsg("Todo removed"))
        .catch(() => showErrorMsg("Cannot remove todo"));
    },
    todoCompleted(todo) {
      const todoToEdit = JSON.parse(JSON.stringify(todo));
      todoToEdit.isActive = !todoToEdit.isActive;
      this.$store
        .dispatch({ type: "todoCompleted", todo: todoToEdit })
        .then(() =>{if(!todoToEdit.isActive) showSuccessMsg('Well done!')
        
      })
        .catch(() => showErrorMsg("Cannot complete todo"));
    },
    setFilterBy(filterBy) {
      todoService.query(filterBy).then((todos) => {
        this.$store.commit({ type: "setTodos", todos });
      });
    },
  },

  components: {
    TodosList,
    TodoAdd,
    Spinner,
    TodoFilter,
    userService,
  },
};
