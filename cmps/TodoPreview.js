export default {
  props: ["todo"],
  template: `
  <section class="todo-preview">
    <h1>{{todo.title}}</h1>
    
      <ul>
        <li v-for="(item, idx) in todo.items" :key="item" >
          <p>{{item.txt}}</p>
        </li>
      </ul>
    

  </section>
  `,


  components: {},
};
