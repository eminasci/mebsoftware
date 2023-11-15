<template>
 
 <router-view />

</template>

<script>



export default {
  name: 'App',
  
    
  
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo{
    width:300px;
}
.register input, .login input{ 
    width: 300px;
    height: 30px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid red;
    font-size: medium;
    
   


    
}
.register ::placeholder{
    font-size: medium;
    
    
}
.header h1{
    color: rgb(253, 26, 26);
}
.register button, .login button{
    width: 320px;
    height: 40px;
    border: 1px solid red;
    background-color: rgb(255, 1, 1);
    color: white;
    cursor: pointer;
    
}
</style>
