export default {
    template: `
      <div class="progress-bar">
        <div class="progress" :style="{ 'width': progressPercentage }">{{progressPercentage}}</div>
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
        if (this.todosCount === 0) {
          return '0%'; 
        }
        return parseInt((this.completedTodosCount / this.todosCount) * 100) + '%';
      },
    },
  };
  