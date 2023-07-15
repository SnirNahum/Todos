export default {
  props: ["todo"],
  template: `
  <section class="todo-preview">
    <h2>{{todo.title}}</h2>
    
      <ul>
        <li v-for="(item, idx) in todo.items" :key="item" >
          <p>{{item.txt}}</p>
        </li>
      </ul>
    

  </section>
  `,


  components: {},
};
