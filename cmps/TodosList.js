import { todoService } from "../services/todos.service.js";
import TodoPreview from "./TodoPreview.js";

export default {
  props: ["todos"],
  template: `
    <section class="todos-list">
      <TransitionGroup name="list" tag="ul">
        <li v-for="todo in todos" :key="todo._id" @click="toggleTodoStatus(todo)" :class="{ todoCompleted: !todo.isActive }">
          <button @click.stop="onRemoveTodo(todo._id)">Delete</button>
          <TodoPreview :todo="todo"/>
        </li>
      </TransitionGroup>
    </section>
  `,
  data() {
    return {};
  },
  methods: {
    onRemoveTodo(todoId) {
      this.$emit("remove", todoId);
    },
    toggleTodoStatus(todo) {
      this.$emit("todoCompleted", todo);

    },
  },
  components: {
    TodoPreview,
  },
};
