<template>
  <div class="login" style="height: 100vh;">
    <div class="row align-items-start" style="height: 25vh;">
      <h1 class="col-12 mt-5">WIC Tracker</h1>
    </div>
    <div class="row align-items-center">
      <div class="col">
        <form v-if="loginForm" @submit.prevent="loginUser">
          <input type="email" v-model="creds.email" placeholder="email" />
          <input type="password" v-model="creds.password" placeholder="password" />
          <button type="submit">Login</button>
        </form>
        <form v-else @submit.prevent="register">
          <input type="text" v-model="newUser.name" placeholder="name" />
          <input type="email" v-model="newUser.email" placeholder="email" />
          <input type="password" v-model="newUser.password" placeholder="password" />
          <button type="submit">Create Account</button>
        </form>
        <div @click="loginForm = !loginForm">
          <p v-if="loginForm">No account Click to Register</p>
          <p v-else>Already have an account click to Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user.id) {
      this.$router.push({ name: "/listView/" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>