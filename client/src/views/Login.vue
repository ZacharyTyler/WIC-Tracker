<template>
  <div class="login" style="height: 100vh;">
    <div class="row align-items-start" style="height: 25vh;">
      <h1 class="col-12 mt-5">WIC Tracker</h1>
    </div>
    <div class="row align-items-center">
      <div class="col">
        <div class="row">
          <form v-if="loginForm" @submit.prevent="loginUser">
            <div class="col-12">
              <input
                class="text-center mb-1"
                type="email"
                v-model="creds.email"
                placeholder="Email"
              />
              <input
                class="text-center mb-1"
                type="password"
                v-model="creds.password"
                placeholder="Password"
              />
            </div>
            <div class="col-12">
              <button class="btn btn-success" type="submit">Login</button>
            </div>
          </form>

          <form v-else @submit.prevent="register">
            <div class="col-12">
              <input class="text-center mb-1" type="text" v-model="newUser.name" placeholder="Name" />
            </div>
            <div class="col-12">
              <input
                class="text-center mb-1"
                type="email"
                v-model="newUser.email"
                placeholder="Email"
              />

              <input
                class="text-center mb-1"
                type="password"
                v-model="newUser.password"
                placeholder="Password"
              />
            </div>
            <div class="col-12">
              <button class="btn btn-success" type="submit">Create Account</button>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col">
            <div @click="loginForm = !loginForm">
              <p v-if="loginForm">No account Click to Register</p>
              <p v-else>Already have an account Click to Login</p>
            </div>
          </div>
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