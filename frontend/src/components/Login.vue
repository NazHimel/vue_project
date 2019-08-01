<template>
  <div>
    <h4>Login</h4>
    <form>
      <div class="form-group">
        <label for="email" >E-Mail Address</label>
        <input class="form-control"  id="email" type="email" v-model="email" required autofocus>
      </div>
      <div class="form-group">
        <label for="password" >Password</label>
        <input class="form-control"  id="password" type="password" v-model="password" required>
      </div>
      <div>
        <button type="submit" class="btn btn-info" @click="onSubmit">
          Login
        </button>
      </div>

    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Login',
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods : {
      onSubmit(e){
        let me = this;
        e.preventDefault();
        if (this.password.length > 0) {
          axios.post('/api/users/login', {
            username: this.email,
            password: this.password
          })
          .then(response => {
            let is_admin = response.data.user.is_admin;
            localStorage.setItem('user',JSON.stringify(response.data.user));
            localStorage.setItem('jwt',response.data.token);

            if (localStorage.getItem('jwt') != null){
              this.$emit('loggedIn');
              if(this.$route.params.nextUrl != null){
                this.$router.push(this.$route.params.nextUrl)
              }
              else {
                if(is_admin) {
                  me.$router.push('admin');
                } else {
                  me.$router.push('user-page');
                }
              }
            }
          })
          .catch(function (error) {
            console.error(error.response);
          });
        }
      }
    }
  }
</script>
