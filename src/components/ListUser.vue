
<template>
  <div>
    <HeaderTest />
    <div class="user-list-container my-100-50 contain-list-user">
      <h1 class="fw-bold mb-5">Kullanıcı Listesi</h1>
      <table class="school-table">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Email</th>
            <th>Telefon Numarası</th>
            <th>Rol</th>
            <th>Şifre</th>
            <th class="action-column">Güncelle</th>
            <th class="action-column">Sil</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.userId">
            <td>{{ user.userName }}</td>
            <td>{{ user.userEmail }}</td>
            <td>{{ user.userPhoneNumber }}</td>
            <td>{{ user.role.roleName }}</td>
            <td>{{ user.userPassword }}</td>
            <td class="action-column">
              <a @click="editUser(user.userId)" class="edit-button">Güncelle</a>
            </td>
            <td class="action-column">
              <button @click="confirmDeleteUser(user.userId)" class="delete-button">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <FooterTest />
</template>

<script>
import axios from 'axios';
import HeaderTest from './HeaderTest.vue';
  import FooterTest from './FooterTest.vue';

export default {
  name: 'UserList',
  components: {
    HeaderTest,FooterTest
  },
  data() {
    return {
      userList: [],
      userToDelete: null,
    };
  },
  methods: {
    async fetchUserList() {
      try {
        let result = await axios.get('http://localhost:5215/api/User');
        this.userList = result.data;
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    },
  
    editUser(userId) {
 
  this.$router.push({ name: 'EditUser', params: { userId} });
},
    confirmDeleteUser(userId) {

      if (confirm('Kullanıcıyı silmek istediğinize emin misiniz?')) {
        this.deleteUser(userId);
      }
    },
    async deleteUser(userId) {
      try {
        let result = await axios.delete(`http://localhost:5215/api/User/${userId}`);
        console.log(result);
        // Kullanıcı başarıyla silindi mesajını ekleme veya güncelleme işlemi yapabilirsiniz.
        this.fetchUserList(); // Kullanıcıları tekrar yükleyerek tabloyu güncelle
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
  async mounted() {
    await this.fetchUserList();
  },
};
</script>

<style scoped>
.user-list-container {
  text-align: center;
  margin-top: 20px;
}

.school-table {
  width: 100%;
  border-collapse: collapse;
}

.school-table th, .school-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.school-table th {
  background-color: #f2f2f2;
}

.action-column {
  width: 100px;
  text-align: center;
}

.action-column a, .action-column button {
  padding: 8px;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.edit-button {
  background-color: #3498db;
}

.delete-button {
  background-color: #e74c3c;
}

.edit-button:hover, .delete-button:hover {
  opacity: 0.8;
}

.my-100-50{
  margin: 100px 50px;
}

.contain-list-user {
  height: 48.8vh;
}
</style>
