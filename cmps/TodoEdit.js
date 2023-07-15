import { todoService } from "../services/todos.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export default {
  template: `
  <section class='todo-edit'>
<input type="text" v-model="todoToAdd.title" @keyup.enter="addTodo" required>
<button @click="addTodo">Add todo</button>

</section>
    `,
  data() {
    return {
      todoToAdd: null,
    };
  },
  created() {
    this.todoToAdd = todoService.getEmptyTodo();
  },
  methods: {
    addTodo() {
      if (this.todoToAdd.title.trim() === "") {
        showErrorMsg("Please enter a title");
        return;
      }
      todoService.save({ ...this.todoToAdd }).then((savedTodo) => {
        this.$store.commit({ type: "addTodo", savedTodo });
        showSuccessMsg('Todo Added')
        this.todoToAdd.title=''
      });
    },
  },
};
