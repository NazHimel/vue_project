<template>
  <div class="hello">
    <h1>Welcome to administrator page</h1>
    <h2>{{msg}}</h2>
  
    <ul v-for="user in users" :key="user._id">
    <li>{{ user.firstname }}
      <button @click="Delete($event, user._id)">Delete</button>
    </li>
</ul>
  
  </div>
  
</template>

<script>
import axios from 'axios'
import _ from 'underscore'
import io from 'socket.io-client'

  export default {
    data () {
      return {
        users: {},
        msg: 'The Admin',
        socket: io('localhost:3000')
      }
    },
  
  

  created () {
    this.fetchData()
    this.socket.emit('message', 'hello');
    this.socket.on('mess',function(msg){
      console.log(msg);
    });
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
    },
    
    Delete(e,id) {
        // axios.delete('api/'+user_id+'/delete').then(resp) => { me.users = resp.data.users;})
        // .catch((err) => {
        //   console.log(err)
        // })
        //e.target.parentElement.remove();
        let me= this;
        axios.delete('api/users/'+id+'/delete').then((resp) => {
          // me.users = resp.data.users;
          me.users= _.reject(me.users,function(user){
            return user._id===id;

          })
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
