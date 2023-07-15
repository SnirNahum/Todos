import ProgressBar from "./ProgressBar.js";

export default {
  template: `
        <header class="app-header">
            <h1>Todos App</h1>
            <nav class="nav-list">
                <router-link to="/">Home</router-link> | 
                <router-link to="/todos">Todos</router-link> | 
                <router-link to="/about">About</router-link>
            </nav>
            <ProgressBar/>
        </header>
    `,
  components: {
    ProgressBar,
  },
};
