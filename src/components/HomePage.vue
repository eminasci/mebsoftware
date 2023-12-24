
<template>
    <HeaderPage />
    <div class="super-admin-welcome">
      <h1>Merhaba {{ name }}  , Super Admin sayfasına hoşgeldiniz.</h1>
      <table class="school-table" :border="1">
        <tr>
          <th>ID</th>
          <th>OKUL ADI</th>
        <th>MÜDÜR ID</th>
        <th>MÜDÜR ADI</th>
          <th>İLETİŞİM BİLGİLERİ</th>
          <th>OKUL ADRESİ</th>
          <th>OKUL TÜRÜ</th>
          <th class="action-column">GÜNCELLE</th>
          <th class="action-column">SİL</th>
        </tr>
        <tr v-for="item in okul" :key="item.id">
          <td>{{ item.okulId }}</td>
          <td>{{ item.okulAdi }}</td>
          <td>{{ item.userId }}</td> 
          <td>{{ item.userName }}</td>
          <td>{{ item.okulIletisim }}</td>
          <td>{{ item.okulAdres }}</td>
          <td>{{ item.okulTuru }}</td>
          <td class="action-column"><router-link :to="'/update-scholl/'+item.okulId">GÜNCELLE</router-link></td>
          <td class="action-column"><button v-on:click="okulSil(item.okulId)">OKULU SİL</button></td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import HeaderPage from './HeaderPage.vue';
  import axios from 'axios';
  
  export default {
    name: 'HomePage',
    data() {
      return {
        name: '',
        okul: [],
      };
    },
    components: {
      HeaderPage,
    },
    methods: {
    //     async okulSil(okulId) {
    //   let result = await axios.delete(`http://localhost:5215/api/Okuls/${okulId}`);
    //   console.warn(result);
    //   if (result.status == 204) {
    //     this.listeyiYukle();
    //   }
    // },
    async okulSil(okulId) {
  const confirmDelete = confirm('Bu okulu silmek istediğinize emin misiniz?');
  
  if (confirmDelete) {
    try {
      let result = await axios.delete(`http://localhost:5215/api/Okuls/${okulId}`);
      console.warn(result);
      if (result.status === 204) {
        this.listeyiYukle();
      }
    } catch (error) {
      console.error('Error during school deletion:', error);
    }
  }
},
      
      async listeyiYukle() {
        let user = localStorage.getItem('user-info');
  this.name = JSON.parse(user).name;
  if (!user) {
    this.$router.push({ name: 'SignUp' });
  }
  let result = await axios.get('http://localhost:5215/api/Okuls');
  console.warn(result);

  // Kullanıcı adlarını çekmek için döngü
  for (let i = 0; i < result.data.length; i++) {
    let userId = result.data[i].userId;
    console.warn(userId)
    
    // Her bir userId için ayrı bir API çağrısı yaparak kullanıcı adını al
    let userResult = await axios.get(`http://localhost:5215/api/User/${userId}`);
    
    // Okul verisine userName alanını ekle
    result.data[i].userName = userResult.data.userName;
    console.warn(userResult.data.userName)
  }

  this.okul = result.data;
  
      
      },
    },
    async mounted() {
      this.listeyiYukle();
      const userInfo = localStorage.getItem('user-info');
      const user = JSON.parse(userInfo);
      this.name=user.userName

    },
  };
  </script>

<style scoped>
.super-admin-welcome {
    text-align: center;
    margin: 20px;
}

.school-table {
    width: 100%;
    border-collapse: collapse;
}

.school-table th, .school-table td {
    padding: 10px;
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
}

.action-column a {
    background-color: #3498db;
}

.action-column button {
    background-color: #e74c3c;
}

.action-column a:hover, .action-column button:hover {
    opacity: 0.8;
}
</style> 
