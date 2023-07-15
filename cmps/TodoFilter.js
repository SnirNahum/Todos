export default {
    emits: ['filter'],
    template: `
      <div class="todo-filter">
  
      <input type="radio" id="all" value="all" v-model="filterBy"  :class="{ 'isActive': filterBy === 'all' }"/>
      <label for="all">All</label>
  
      <input type="radio" id="active" value="active" v-model="filterBy" :class="{ 'isActive': filterBy === 'active' }" />
      <label for="active">Active</label>
  
      <input type="radio" id="completed" value="completed" v-model="filterBy" :class="{ 'isActive': filterBy === 'completed' }"/>
      <label for="completed">Completed</label>
      </div>
    `,
  
    data() {
      return {
        filterBy: "all", 
      };
    },
  
    watch: {
      filterBy(currFilterBy) {
        this.onSetFilterBy(currFilterBy);
      },
    },
  
    methods: {
      onSetFilterBy(filterBy) {
        this.filterBy = filterBy;
        this.$emit("filter", filterBy);
      },
    },
  };
  