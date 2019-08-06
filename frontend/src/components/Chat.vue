<template>
  <div class="hello">
   
    <button class="bnt btn-primary" v-on:click="toggleStatus">{{buttonText}}</button>

    <div v-html="messageFromOtherUser"></div>

    <input type="text" v-model="text"/>
    <button class="btn btn-primary" v-on:click="sendMessage">Send</button>
    <div>
      Chatting with : {{currentUser|| 'None'}}
    </div>

    <div>
      <ul v-for="user in onlineList" :key="user._id">
        <li><a @click="startChat(user.username)">{{user.username}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client';
  import axios from 'axios';
  export default {
    data () {
      return {
        buttonText: 'Make yourself online',
        online: false,
        socket : io('localhost:3000'),
        text: '',
        messageFromOtherUser: '',
        user: JSON.parse(localStorage.getItem('user')),
        onlineList:[],
        currentUser:''
      }
    },
    created () {
      let me = this;
      this.socket.on('connect', function () {
        console.log('connected');
      });
      this.getOnlineUsers();

      this.socket.on('message', (data) => {
        if(data.from !== this.user._id){
          this.messageFromOtherUser = this.messageFromOtherUser + '<br/>'+data.from+":" + data.text;
        }
      });

      this.socket.on('newUserJoined',(data) => {
        this.getOnlineUsers();
      });
      this.socket.on('newUserLeaved',(data) => {
        this.getOnlineUsers();
      });

    },

    methods: {
      toggleStatus: function (e) {
        let me = this;
        this.online = !this.online;
        if(this.online) {
          this.buttonText = 'Make yourself offline';
          this.socket.emit('join', {
            username: me.user.username
          });
        } else {
          this.buttonText = 'Make yourself online';
          this.socket.emit('leave', {
            username: me.user.username
          });
        }

      },
      sendMessage: function (e) {
        this.socket.emit('message', {
          text: this.text,
          from: this.user.username,
          to:this.currentUser
        });
      },

      getOnlineUsers(){
        axios.get('api/users/online')
        .then( response =>{
          this.onlineList = response.data;
        })
        

      },
      startChat:function(username){
        this.currentUser=username;

      }
    }
  }
</script>
