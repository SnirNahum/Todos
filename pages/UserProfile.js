import { userService } from "../services/user.service.js";
import { showErrorMsg,showSuccessMsg } from "../services/event-bus.service.js";

export default {
  template: `
  <section v-if="user" class="user-profile-container">

  <h2>Hi {{this.user.fullname}}!</h2>  
  <div class="user-info">
  <h1>Username: {{this.user.username}}</h1>
  <h1>Balance: {{this.user.balance}}</h1> 
  <h1>todos: {{this.user.orders}}</h1>
  <button @click="logout">Log out</button>
  </div>
  </section>`,
  data() {
    return {
      user: userService.getLoggedinUser(),
    };
  },
  methods: {
    logout() {
      userService
        .logout()
        .then(() => {
          this.user = null;
          showSuccessMsg('Logged out')
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Cannot logout", err);
          showErrorMsg(`Cannot logout`);
        });
    },
  },
};
