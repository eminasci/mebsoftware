<template>
  <div>
    <HeaderTest />
    <div class="signup-container my-100-50 mb-5">
      <div class="header">
        <h1 class="text-dark fw-bold my-3">Kullanıcı Ekle</h1>
      </div>
      <div class="register">
        <label for="name">Ad:</label>
        <input type="text" v-model="name" placeholder="Adınızı giriniz" />

        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="Emailinizi giriniz" />

        <label for="password">Şifre:</label>
        <input type="password" v-model="password" placeholder="Şifrenizi giriniz" />

        <label for="phoneNumber">Telefon Numarası:</label>
        <input type="text" v-model="userPhoneNumber" placeholder="Telefon numaranızı giriniz" />

        <label for="role">Rol:</label>
        <select v-model="selectedRole" @change="onRoleChange">
          <option v-for="role in roles" :key="role.roleId" :value="role.roleId">{{ role.roleName }}</option>
        </select>

        <button @click="signUp">Üye Ol</button>
       
      </div>
    </div>
  </div>
  <FooterTest />
</template>

<script>
import axios from 'axios';

import HeaderTest from './HeaderTest.vue';
import FooterTest from './FooterTest.vue';

export default {
  name: 'SignUp',
  components: {
    HeaderTest,FooterTest
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      userPhoneNumber: '',
      roles: [],  // Roller burada saklanacak
      selectedRole: null,  // Seçilen rolün roleId'sini burada saklayacağız
    };
  },
  methods: {
    async signUp() {
      if (!this.name || !this.email || !this.password || !this.userPhoneNumber || !this.selectedRole) {
        alert('Lütfen tüm alanları doldurun ve bir rol seçin!');
        return;
      }

      try {
        // Kullanıcı e-posta kontrolü için Axios isteği
        let checkEmailResult = await axios.get(`http://localhost:5215/api/User/mail/${this.email}`);


        // Eğer e-posta adresi kullanımda ise hata mesajını göster
        if (checkEmailResult.data!=404) {
          alert('Bu e-posta adresi zaten kullanımda!');
          return;
        }
        console.warn(this.name,this.email,this.password,this.userPhoneNumber,this.selectedRole)
        // Eğer e-posta adresi kullanımda değilse kullanıcıyı oluşturmak için Axios isteği
        let result = await axios.post(`http://localhost:5215/api/User?roleId=${this.selectedRole}`, {
          userName: this.name,
          userEmail: this.email,
          userPassword: this.password,
          userPhoneNumber: this.userPhoneNumber,
          roleId: this.selectedRole,
        });
        alert("Kullanıcı başarıyla eklendi.")

        console.warn(result);
      } catch (error) {
        console.error('Error during sign-up:', error);
        // Hata durumlarını yönetmek isterseniz burada uygun bir işlem gerçekleştirebilirsiniz
      }
    },
    async onRoleChange() {
      // Seçilen role göre ek bir şey yapmak istiyorsanız burada işlemleri gerçekleştirebilirsiniz.
      console.log('Seçilen Rol:', this.selectedRole);
    },
    async loadRoles() {
      try {
        let result = await axios.get('http://localhost:5215/api/Roles');
        this.roles = result.data;
      } catch (error) {
        console.error('Error loading roles:', error);
      }
    },
  },
  async mounted() {
    await this.loadRoles();
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

input,
select {
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
  border-radius: 8px;
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
