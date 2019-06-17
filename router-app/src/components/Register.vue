<template>
  <div>
    <div>
      <form>
        <div class="form-group">
          <label for="email">Email</label>
          <input  class="form-control" v-model="user.username">
        </div>
        <div class="form-group">
          <label for="firstname">Firstname</label>
          <input  class="form-control" v-model="user.firstname">
        </div>
        <div class="form-group">
          <label for="lastname">Lastname</label>
          <input  class="form-control" v-model="user.lastname">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input  class="form-control" v-model="user.password">
        </div>
        <div>
          <label>Is this an administrator account?</label>
          <select v-model="user.is_admin">
            <option value=1>Yes</option>
            <option value=0>No</option>
          </select>
        </div>
        <br/>
        <div>
          <button v-on:click="submitForm" class="btn btn-info">Submit</button>
          <button v-on:click="clear" class="btn btn-warning">Reset</button>
        </div>
      </form>
    </div>
    <div class="alert alert-info">
      {{response}}
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: "Register",
    data () {
      return {
        user: {
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          is_admin: null
        },
        response: 'Server response will be shown here'
      }
    },
    methods: {
      submitForm: function (e) {
        let me = this;
        e.preventDefault();
        axios.post('/api/users/add', this.user)
        .then(function (response) {
          localStorage.setItem('user',JSON.stringify(response.data.user));
          localStorage.setItem('jwt',response.data.token);

          if (localStorage.getItem('jwt') != null){
            me.$emit('loggedIn');
            if(me.$route.params.nextUrl != null){
              me.$router.push(me.$route.params.nextUrl);
            }
            else{
              if(me.user.is_admin) {
                me.$router.push('admin');
              } else {
                me.$router.push('user-page');
              }

            }
          }
        })
        .catch(function (error, n, r) {
          console.log(error, n, r);
          me.response = error.errorMessage;
        })
      },
      clear: function () {
        this.user.firstname = '';
        this.user.lastname = '';
        this.user.email = '';
        this.user.password = '';
      }
    }
  }
</script>

<style scoped>

</style>
