<template>
  <div class="hello">
    <h1>Channel List</h1>
    <select v-model="room">
        <option value="common">Common</option>
        <option value="public">Public</option>
    </select>
    <button class="btn btn-primary" v-on:click="join">Join</button>
    <div> {{msgFromOther}} </div>
    <input type="text" v-model="text"/>
    <button class="btn btn-primary" v-on:click="send">Send</button>
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
        socket: io('localhost:3000'),
        text:'',
        msgFromOther:'',
        user: JSON.parse(localStorage.getItem('user'))
      }
    },
    created(){
        
        this.socket.on('connect', function(){
            console.log('connected');
        });
        this.socket.on('message', data=>{
            if(data.from!= this.user._id){

            this.msgFromOther = this.msgFromOther+ '<br/>'+ data.text;
            
            }
            console.log(data);
        });

    },
  methods: {
      join: function (e){
          this.socket.emit('joinChannel', {roomName: this.room});
      },
      send: function(e){
          
          this.socket.emit('message', {text: this.text, from: this.user._id, room: this.room});
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
