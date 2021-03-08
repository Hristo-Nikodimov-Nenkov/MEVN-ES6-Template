<template>
  <form @submit.prevent="">
    <div class="form-group input-group">
      <label for="username">Username</label>
      <input id="username"
             type="text"
             placeholder="Username..."
             v-model="this.username">
    </div>
    <div class="form-group input-group">
      <label for="email">E-Mail</label>
      <input id="email"
             type="text"
             placeholder="E-Mail..."
             v-model="this.email">
    </div>
    <div class="form-group input-group">
      <label for="phoneNumber">Phone Number</label>
      <input id="phoneNumber"
             type="text"
             placeholder="Phone Number..."
             v-model="this.phoneNumber">
    </div>
    <div class="form-group input-group">
      <label for="password">Password</label>
      <input id="password"
             type="text"
             placeholder="Password..."
             v-model="this.password">
    </div>
    <div class="form-group input-group">
      <label for="confirmPassword">Confirm Password...</label>
      <input id="confirmPassword"
             type="text"
             placeholder="Confirm Password..."
             v-model="this.confirmPassword">
    </div>
    <div class="form-group buttons">
      <button type="button" @click="onBack">Back</button>
      <button type="reset" @reset="onReset">Clear</button>
      <button type="submit" @submit="onSubmit">Register</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  },
  methods: {
    onBack: function () {
      this.$router.back();
    },
    onReset: function () {
      this.username = this.email = this.phoneNumber = this.password = this.confirmPassword = "";
    },
    onSubmit: function () {

    }
  }
}
</script>

<style scoped>
.form-group {
  display: flex;
  margin: auto;
  border: 1px solid #555;
  border-radius: 8px;
  padding: 5px 10px;
}

.form-group.buttons {
  justify-content: space-around;
}

label {
  width: 20%;
}

input {
  width: 80%;
}

button {
  width: 15%;
  padding: 5px;
  font-weight: bolder;
}
</style>
