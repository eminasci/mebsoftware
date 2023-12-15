<!-- <template>
  <div>
    <HeaderPage />
    <div class="signup-container">
      <div class="header">
        <h1>Kullanıcı ekle</h1>
      </div>
      <div class="register">
        <label for="name">Ad:</label>
        <input type="text" v-model="name" placeholder="Adını giriniz" />

        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="Emailinizi giriniz" />

        <label for="password">Şifre:</label>
        <input type="password" v-model="password" placeholder="Şifrenizi giriniz" />

        <button v-on:click="signUp">Üye Ol</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderPage from './HeaderPage.vue';

export default {
  name: 'SignUp',
  components: {
    HeaderPage,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async signUp() {
      if (!this.name || !this.email || !this.password) {
        alert('Lütfen tüm alanları doldurun!');
        return;
      }

      let checkEmailResult = await axios.get('http://localhost:3000/user', {
        params: {
          email: this.email,
        },
      });

      if (checkEmailResult.data.length > 0) {
        alert('Bu e-posta adresi zaten kullanımda!');
        return;
      }

      let result = await axios.post('http://localhost:3000/user', {
        email: this.email,
        password: this.password,
        name: this.name,
      });

      console.warn(result);
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: auto;
}

.header {
  text-align: center;
}

.register {
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
</style> -->
<template>
  <div>
    <HeaderPage />
    <div class="signup-container">
      <div class="header">
        <h1>Kullanıcı Ekle</h1>
      </div>
      <div class="register">
        <label for="name">Ad:</label>
        <input type="text" v-model="name" placeholder="Adınızı giriniz" />

        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="Emailinizi giriniz" />

        <label for="password">Şifre:</label>
        <input type="password" v-model="password" placeholder="Şifrenizi giriniz" />

        <button v-on:click="signUp">Üye Ol</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderPage from './HeaderPage.vue';

export default {
  name: 'SignUp',
  components: {
    HeaderPage,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async signUp() {
      if (!this.name || !this.email || !this.password) {
        alert('Lütfen tüm alanları doldurun!');
        return;
      }

      let checkEmailResult = await axios.get('http://localhost:3000/user', {
        params: {
          email: this.email,
        },
      });

      if (checkEmailResult.data.length > 0) {
        alert('Bu e-posta adresi zaten kullanımda!');
        return;
      }

      let result = await axios.post('http://localhost:3000/user', {
        email: this.email,
        password: this.password,
        name: this.name,
      });

      console.warn(result);
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: auto;
  margin-top: 20px;
}

.header {
  text-align: center;
  background-color: #3498db;;
  padding: 10px;
  color: white;
  border-radius: 8px 8px 0 0;
}

.register {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
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
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 20px;
  text-align: center;
}
</style>
