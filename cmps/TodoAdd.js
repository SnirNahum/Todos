import { todoService } from "../services/todos.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";

export default {
  template: `
  <section class='todo-add'>
<input type="text" v-model="todoToAdd.title" @keyup.enter="addTodo" required>

<button class="btn-add-todo" @click="addTodo">Add</button>

</section>
    `,
  data() {
    return {
      todoToAdd: todoService.getEmptyTodo(),
    };
  },
  methods: {
    addTodo() {
      if (this.todoToAdd.title.trim() === "") {
        showErrorMsg("Please enter a title");
        return;
      }
      this.$store
        .dispatch({ type: "addTodo", todo: this.todoToAdd })
        .then(() => showSuccessMsg('Todo added!'))
        .catch(()=> showErrorMsg('Cannot add todo'))
    },
  },
};
