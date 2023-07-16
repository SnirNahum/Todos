import { userService } from "../services/user.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export default {
  template: `
        <section class="home-page">
            <h1>Welcome{{}}!</h1>
            <div className="signup-container">
              
              <form v-if="isSignup" @click.prevent class="signup-cred" action="">
              <h2>Sign up</h2>
                <input type="text" v-model="credentials.username" placeholder="Username"/>
                <input type="text" v-model="credentials.password" placeholder="password"/>
                <button @click="signup">Signup</button>
              </form>
              <form v-else @click.prevent class="signup-cred" action="">
              <h2 >Log in</h2>
                <input type="text" v-model="signupInfo.username" placeholder="Username"/>
                <input type="text" v-model="signupInfo.password" placeholder="password"/>
                <button @click="login(signupInfo)">Login</button>
              </form>
            </div>
        </section>
        
    `,
  data() {
    return {
      isSignup: false,
      credentials: {
        username: "user1",
        password: "123456",
      },
      signupInfo: {
        fullname: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    
    login() {
      userService
        .login(this.signupInfo)
        .then((user) => {
            console.log(user);
          this.$emit("setUser", credentials);

        })
        .catch((err) => {
          showErrorMsg(`Cannot login`);
        });
    },
    signup() {
      userService
        .signup(this.signupInfo)
        .then((user) => {
            console.log(user);
          this.$emit("setUser", signupInfo);
        })
        .catch((err) => {
          console.log("Cannot signup", err);
          showErrorMsg(`Cannot signup`);
        });
    },
  },
  components: {
    userService,
  },
};
