
  <template>
    <div class="header">
      <div class="logo-container">
        <img class="logo" src="../assets/mebLogo.png" alt="MEB Logo" />
      </div>
      <div class="nav">
        <router-link class="nav-link" to="/">Ana Sayfa</router-link>
        <div class="divider"></div>
        <router-link class="nav-link" to="/admin-list-student">Öğrencileri Listele</router-link>
        <div class="divider"></div>
        <router-link class="nav-link" to="/admin-add-student">Öğrenci Ekle</router-link>
        <div class="divider"></div>
      
        <a class="nav-link" v-on:click="logout" href="#">Çıkış Yap</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminHeaderPage',
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push({ name: 'LoginPage' });
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #3498db;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo-container {
    margin-right: 20px;
  }
  
  .logo {
    width: 60px;
  }
  
  .nav {
    display: flex;
    align-items: center;
  }
  
  .nav-link {
    color: #fff;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    padding: 10px;
    margin-right: 5px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .divider {
    height: 20px;
    width: 1px;
    background-color: #fff;
    margin: 0 10px;
  }
  
  .nav-link:hover {
    background: #2c3e50;
    cursor: pointer;
  }
  </style>
  