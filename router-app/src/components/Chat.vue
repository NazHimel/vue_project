<template>
  <div class="hello">
    <h1>Channel List</h1>
    <select v-model="room">
        <option value="common">Common</option>
        <option value="public">Public</option>
    </select>
    <button class="btn btn-primary" v-on:click="join">Join
    </button>
  </div>
  
</template>

<script>
import axios from 'axios'
//import _ from 'underscore'
import io from 'socket.io-client'

  export default {
      name:'Chat',
    data () {
    
      return {
        room:'',
        socket: io('localhost:3000')
      }
    },
    created(){
        this.socket.on('connect', function(){
            console.log('connected');
        });

    },
  methods: {
      join: function (e){
          this.socket.emit('joinChannel', {roomName: this.room});
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
