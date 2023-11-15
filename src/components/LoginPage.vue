<template>
<img class="logo" src="../assets/mebLogo.png"/>
    <div class="header">
        <h1>Giriş yap</h1>
    </div>
    <div class="login">
        <input type="email" v-model="email" placeholder="Emailinizi giriniz."/>
        <input type="password" v-model="password" placeholder="Şifrenizi giriniz."/>
        <button v-on:click="login">Giriş yap</button>
        <p>
            <router-link to="/sign-up">Üye ol</router-link>
        </p>
   
    </div>
    
</template>




 <script>
 import axios from 'axios'
    export default 
    {
     name:'LoginPage',
     data()
     {
        return{
        email:'',
        password:'',
     }

     },
     methods:{
      async  login()
        {
            let result =  await axios.get(
                `http://localhost:3000/user?email=${this.email}&password=${this.password}`
            )
          
            if (result.status==200 && result.data.length>0) {
           
           localStorage.setItem("user-info",JSON.stringify(result.data[0])) 
           this.$router.push({name:'HomePage'})
           }
           console.warn(result)
        }
     },
     mounted()
    {
        let user= localStorage.getItem('user-info');
        if (user) {
            this.$router.push({name:'HomePage'})
        }
    }
    
    }
 </script>   