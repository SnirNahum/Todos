const { createStore } = Vuex;

const storeOptions = {
  strict: true,
  state() {
    return {
      todos: null,
      isLoading: false,
      currentFilterBy: null,
      userObject: null,
    };
  },
  mutations: {
    setTodos(state, { todos }) {
      state.todos = todos;
    },

    addTodo({ todos }, { savedTodo }) {
      todos.unshift(savedTodo);
    },
    removeTodo({ todos }, { todoId }) {
      const idx = todos.findIndex((todo) => todoId === todo._id);
      todos.splice(idx, 1);
    },
    toggleIsActive({ todos }, { todoId }) {
      // const todo = todos.find((todo) => todo._id === todoId);
      // todo.isActive = !todo.isActive
      const idx = todos.findIndex((todo) => todo._id === todoId);
      todos[idx].isActive = !todos[idx].isActive;
    },

    // increment(state, payload) {
    //   console.log(payload);
    //   state.count += payload.val;
    // },
    // setProducts(state, { products }) {
    //   console.log(products);
    //   state.products = products;
    // },
    // addToCart(state, { product }) {
    //   state.cart.push(product);
    //   console.log(state.cart);
    // },
    // removeFromCart({ cart }, { productId }) {
    //   const idx = cart.findIndex((product) => product._id === productId);
    //   cart.splice(idx, 1);
    // },
    // addProduct({ products }, { product }) {
    //   products.push(product);
    // },
    // checkout(state, { updatedUser }) {
    //   // const total = state.cart.reduce((acc, product) => acc + product.price, 0)
    //   // const total = this.getters.cartTotal

    //   state.user = updatedUser;
    //   state.cart = [];
    // },
    // toggleOrderStatus({ user }, { orderId }) {
    //   const order = user.orders.find((order) => order._id === orderId);
    //   order.status = order.status === "Pending" ? "Approved" : "Pending";
    // },
    // addFunds({ user }, { amount }) {
    //   user.balance = amount;
    // },
  },
  getters: {
    // cartTotal({ cart }) {
    //   return cart.reduce((acc, product) => acc + product.price, 0);
    // },
    // count(state) {
    //   return state.count;
    // },
    // countTodos({ todos }) {
    //   console.log(todos);
    //   console.log(todos.items.length);
    //   return todos.items
    // },
  },
};
export const store = createStore(storeOptions);
