import { userService } from "../services/user.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

import LoginSignup from "../cmps/LoginSignup.js";

export default {
  template: `
        <section class="home-page">
          <loginSignup @setUser="onSetUser"/>
        </section>
        
    `,
  data() {
    return {
      user: userService.getLoggedinUser(),
    };
  },
  methods: {
    onSetUser(user) {
        this.user = user
        this.$router.push('/todos')
    },

},
  components: {
    LoginSignup,
  },
};
