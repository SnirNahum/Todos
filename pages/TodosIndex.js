import { todoService } from "../services/todos.service.js";

import TodosList from "../cmps/TodosList.js";
import TodoAdd from "../cmps/TodoAdd.js";
import TodoFilter from "../cmps/TodoFilter.js";

import Spinner from "../cmps/Spinner.js";

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
    todoService
      .query()
      .then((todos) => this.$store.commit({ type: "setTodos", todos }));
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },
  methods: {
    removeTodo(todoId) {
      this.$store.commit({ type: "removeTodo", todoId });
      todoService.remove(todoId);
    },
    todoCompleted(todo) {
      this.$store.commit({ type: "toggleIsActive", todoId: todo._id });
      todoService.save(todo);
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
  },
};
