<template>
    <img class="logo" src="../assets/mebLogo.png"/>
    <div class="header">
        <h1>Kayıt Ol</h1>
    </div>
    <div class="register">
        <input type="text" v-model="name" placeholder="Adınızı giriniz."/>
        <input type="email" v-model="email" placeholder="Emailinizi giriniz."/>
        <input type="password" v-model="password" placeholder="Şifrenizi giriniz."/>
        <button v-on:click="signUp">Üye Ol</button>
        <p>
            <router-link to="/login">Giriş yap</router-link>
        </p>
   
    </div>
   
</template>


<script>
import axios from 'axios'
export default{
    name : 'SignUp',
    data()
    {
        return{
           name:'',
           email:'',
           password:'' 
        }
    },
    methods:{
       async signUp()
        {
           let result=  await axios.post("http://localhost:3000/user",{
            email:this.email,
            password:this.password,
            name:this.name
           });
           console.warn(result);
           if (result.status==201) {
           
           localStorage.setItem("user-info",JSON.stringify(result.data)) 
           this.$router.push({name:'HomePage'})
           }
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

<style>



</style>