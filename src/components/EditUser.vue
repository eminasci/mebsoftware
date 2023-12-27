<template>
    <div>
      <HeaderPage />
      <div class="update-user-container">
        <div class="header">
          <h1>Kullanıcı Güncelle</h1>
        </div>
        <div class="update-user">
          <label for="name">Ad:</label>
          <input type="text" v-model="userName" placeholder="Adınızı giriniz" />
  
          <label for="email">Email:</label>
          <input type="email" v-model="userEmail" placeholder="Emailinizi giriniz" />
  
          <label for="password">Şifre:</label>
          <input type="password" v-model="userPassword" placeholder="Yeni şifrenizi giriniz" />
  
          <label for="phoneNumber">Telefon Numarası:</label>
          <input type="text" v-model="userPhoneNumber" placeholder="Telefon numaranızı giriniz" />
  
          <label for="role">Rol:</label>
          <select v-model="selectedRole" @change="onRoleChange">
            <option v-for="role in roles" :key="role.roleId" :value="role.roleId">{{ role.roleName }}</option>
          </select>
  
          <button @click="updateUser">Güncelle</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import HeaderPage from './HeaderPage.vue';
  
  export default {
    name: 'UpdateUser',
    components: {
      HeaderPage,
    },
    data() {
      return {
        userId: null,
        userName: '',
        userEmail: '',
        userPassword: '',
        userPhoneNumber: '',
        roles: [],
        selectedRole: null,
      };
    },
    methods: {
      async fetchUserData(userId) {
        try {
          // Kullanıcının bilgilerini getirmek için API isteği
          let response = await axios.get(`http://localhost:5215/api/User/${userId}?roleId=1`);
          let userData = response.data;
          
          // API'den gelen veriyi state'e set et
          this.userId = userData.userId;
          this.userName = userData.userName;
          this.userEmail = userData.userEmail;
          this.userPhoneNumber = userData.userPhoneNumber;
          this.selectedRole = userData.roleId;
          this.userPassword=userData.userPassword;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      async updateUser() {
        try {
          if (!this.userName || !this.userEmail || !this.userPhoneNumber || !this.selectedRole) {
            alert('Lütfen tüm alanları doldurun ve bir rol seçin!');
            return;
          }
  
          // Kullanıcı güncelleme için Axios isteği
          let result = await axios.put(`http://localhost:5215/api/User/${this.userId}?roleId=${this.selectedRole}`, {
            userName: this.userName,
            userEmail: this.userEmail,
            userPassword: this.userPassword,
            userPhoneNumber: this.userPhoneNumber,
            roleId: this.selectedRole,
          });
  
          alert('Kullanıcı başarıyla güncellendi.');
          this.$router.push({ name: 'ListUser' });

          console.warn(result);
        } catch (error) {
          console.error('Error during user update:', error);
  
          if (error.response) {
            alert(`Hata: ${error.response.data}`);
          } else {
            alert('Bir hata oluştu. Daha sonra tekrar deneyin.');
          }
        }
      },
      async onRoleChange() {
        console.log('Seçilen Rol:', this.selectedRole);
      },
      async loadRoles() {
        try {
          let result = await axios.get('http://localhost:5215/api/Roles');
          this.roles = result.data;
        } catch (error) {
          console.error('Error loading roles:', error);
          alert('Roller yüklenirken bir hata oluştu.');
        }
      },
    },
    async mounted() {
      // Sayfa yüklendiğinde, örneğin route parametrelerinden kullanıcı ID'sini alarak kullanıcı bilgilerini getir
      const userId = this.$route.params.userId;
      if (userId) {
        await this.fetchUserData(userId);
      }
      await this.loadRoles();
    },
  };
  </script>
  
  <style scoped>
  .update-user-container {
    max-width: 400px;
    margin: auto;
    margin-top: 20px;
  }
  
  .header {
    text-align: center;
    background-color: #3498db;
    padding: 10px;
    color: white;
    border-radius: 8px 8px 0 0;
  }
  
  .update-user {
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
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  