<template>
  <div class="hello">
    <h1>Welcome to administrator page</h1>
    <h2>{{msg}}</h2>
  
    <ul v-for="user in users" :key="user._id">
    <li>{{ user.firstname }}
    </li>
</ul>
  
  </div>
  
</template>

<script>
import axios from 'axios'

  export default {
    data () {
      return {
        users: {},
        msg: 'The Admin',
        
      }
    },
  
  

  created () {
    this.fetchData()
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData () {
      let me = this;
      axios.get('/api/users/detailall').then((resp) => {
          me.users = resp.data.users;
          console.log(resp)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
