<template>
  <div>
    <div>
      <form>
        <div class="form-group">
          <label for="username">Username</label>
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
    name: "User",
    data () {
      return {
        user: {
          username: '',
          firstname: '',
          lastname: '',
          password: ''
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
          me.response = response.data;
        })
        .catch(function (error) {
          me.response = error.data;
        })
      },
      clear: function () {
        this.user.username = '';
        this.user.firstname = '';
        this.user.lastname = '';
        
        this.user.password = '';
      }
    }
  }
</script>

<style scoped>

</style>
