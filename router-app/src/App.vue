<template>
  <div>

    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">

        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>
            A sample project
          </a>

          <ul class="nav navbar-nav">
            <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
            <li><router-link to="/add-user">Register</router-link></li>
          
            <li><router-link to="/login">Login</router-link></li>
          </ul>
        </div>

      </div>
    </nav>
    
      <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>