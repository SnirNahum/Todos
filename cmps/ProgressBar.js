export default {
  template: `
      <div class="progress-bar">
        <div class="progress" :style="{ 'width': progressPercentage }"><span>{{progressPercentage}}</span></div>
      </div>
    `,
  computed: {
    todosCount() {
      return this.$store.getters.todosLength;
    },
    completedTodosCount() {
      return this.$store.getters.completedTodosCount;
    },
    progressPercentage() {
      this.currFilterby = this.$store.getters.getCurrFilter;
      if (this.todosCount === 0 || !this.todosCount) {
        return "0%";
      }
      return parseInt((this.completedTodosCount / this.todosCount) * 100) + "%";
    },
  },
};
