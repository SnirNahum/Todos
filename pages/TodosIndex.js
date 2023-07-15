import { todoService } from "../services/todos.service.js";
import TodosList from "../cmps/TodosList.js";
import TodoEdit from "../cmps/TodoEdit.js";
import Spinner from "../cmps/Spinner.js";

export default {
  template: `
      <section v-if="todos" class="todos-index">
            <h1>Todos</h1>
            <TodoEdit />
            <TodosList :todos="todos" 
            @remove="removeTodo"
            @todoCompleted="todoCompleted"
            />
            
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
  },

  components: {
    TodosList,
    TodoEdit,
    Spinner,
  },
};
