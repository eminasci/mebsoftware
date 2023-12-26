<!-- <template>
    <img class="logo" src="../assets/mebLogo.png" />
    <div class="header">
        <h1>Giriş yap</h1>
    </div>
    <div class="login">
        <input type="email" v-model="email" placeholder="Emailinizi giriniz." />
        <input type="password" v-model="password" placeholder="Şifrenizi giriniz." />
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
        name: 'LoginPage',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                auth: '',

            }

        },
        methods: {
            async login() {

                if (!this.email || !this.password) {
                    alert('Lütfen e-posta ve şifre alanlarını doldurun!');
                    return;
                }

                let result = await axios.get(
                    `http://localhost:3000/user?email=${this.email}&password=${this.password}`
                )

                if (result.status == 200 && result.data.length > 0) {

                    localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                    console.warn(result.data[0].auth)
                    if (result.data[0].auth == "superAdmin") {

                        this.$router.push({ name: 'HomePage' })

                    }
                    if (result.data[0].auth == "admin") {
                        this.$router.push({ name: 'AdminPage' })

                    }
                    else {
                        alert('Yetkilendirme için üst biriminizle görüşünüz.')
                    }



                }
                else {
                    alert('Yanlış kullanıcı bilgileri girdiniz.')
                }
            }
        },
        mounted() {
            console.warn()
        }
    }


</script>    -->
<template>
    <div class="login-container">
      <img class="logo" src="../assets/mebLogo.png" />
      <div class="header">
        <h1>Giriş Yap</h1>
      </div>
      <div class="login-form">
        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="Emailinizi giriniz" />
  
        <label for="password">Şifre:</label>
        <input type="password" v-model="password" placeholder="Şifrenizi giriniz" />
  
        <button v-on:click="login">Giriş yap</button>
  
        <p>
          Henüz bir hesabınız yok mu yetkilinizle konuşup hesap tanımlamasını isteyin? 
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        auth: '',
      };
    },
    methods: {
      async login() {
        if (!this.email || !this.password) {
          alert('Lütfen e-posta ve şifre alanlarını doldurun!');
          return;
        }
        const postData = {
          userEmail:this.email,
          userPassword:this.password,
        };

        // POST isteği yapma
      
  
        let result = await axios.post(
          "http://localhost:5215/api/User/Login",postData
        );
        
        console.log(result);
  
        if (result.status==200) {
          localStorage.setItem('user-info', JSON.stringify(result.data));
          const roleControl= result.data.roleId
          console.warn(roleControl)
          
          if (result.data.roleId == 1) {
            this.$router.push({ name: 'HomePage' });
          } else if (result.data.roleId == 2) {
            this.$router.push({ name: 'AdminListStudent' });
          } else {
            alert('Yetkilendirme için üst biriminizle görüşünüz.');
          }
        } else {
          alert('Yanlış kullanıcı bilgileri girdiniz.');
        }
      },
    },
    mounted() {
      console.warn();
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  .logo {
    width: 100%;
    max-width: 200px;
    margin-bottom: 20px;
  }
  
  .header {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .login-form {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  p {
    margin-top: 20px;
    text-align: center;
  }
  </style>
  