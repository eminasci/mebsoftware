
  <template>
    <div class="header">
      <div class="logo-container">
        <img class="logo" src="../assets/mebLogo.png" alt="MEB Logo" />
      </div>
      <div class="nav">
        <router-link class="nav-link" to="/">Ana Sayfa</router-link>
        <div class="divider"></div>
        <router-link class="nav-link" to="/add-scholl">Okul Ekle</router-link>
        <div class="divider"></div>
        <router-link class="nav-link" to="/sign-up">Kullanıcı Ekle</router-link>
        <div class="divider"></div>
        <router-link class="nav-link" to="/list-user">Kullanıcıları Listele</router-link>
        <div class="divider"></div>
        <router-link class="nav-link" to="/add-student">Öğrenci Ekle</router-link>
        <div class="divider"></div>
        <router-link class="nav-link" to="/list-student">Öğrenci Listele</router-link>
        <div class="divider"></div>
       
        
        <a class="nav-link" v-on:click="logout" href="#">Çıkış Yap</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderPage',
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push({ name: 'LoginPage' });
      }

      
    }
  }
  </script>
  
  <style scoped>
 body {
  font-family: "Urbanist", sans-serif;
  background-color: #141414;
}
.bg-dark {
  background-color: #141414 !important;
}
.header {
  background-color: #1a1a1a;
  padding: 20px 0px;
  ul {
    text-decoration: none;
    li {
      button {
        color: white;
        &:hover {
          color: #703bf7;
          transition: 0.2s;
        }
      }
      a {
        text-decoration: none;
        color: white;
        &:hover {
          color: #703bf7;
          transition: 0.2s;
        }
      }
    }
  }
  .free-demo {
    border-radius: 10px;
    border: 1px solid #262626;
    background-color: #141414;
    padding: 16px 24px;
    a {
      color: white !important;
    }
    &:hover {
      transition: 0.5s;
      border: 1px solid #8354f8;
      background-color: #703bf7;
    }
  }

  .absolute-dropdown-button:hover {
    & + .absolute-dropdown {
      visibility: visible;
    }
  }
  .absolute-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    visibility: hidden;
    padding-top: 15px;
    &:hover {
      visibility: visible;
    }
    ul {
      background-color: #1a1a1a;
      list-style: none;
      padding: 10px 20px;
      border-radius: 10px;
      width: 240px;
      li {
        margin-bottom: 15px;
        a {
          color: white !important;
          &:hover {
            color: #703bf7 !important;
          }
        }
      }
    }
  }
}
.nav-bg {
 /* background-image: url("../img/nav-bg.png"); */
  color: #fff;
  background-repeat: no-repeat;
  text-align: center;
  font-family: Urbanist;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}

.footer {
  margin-top: 100px !important;
  input {
    background-color: transparent;
    border-radius: 12px;
    border: 1px solid var(--Grey-15, #262626);
    font-family: Urbanist;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.108px;
    &::placeholder {
      color: #999 !important;
    }
  }
  .absolute-btn {
    top: 0;
    right: 0;
    color: #e2e2e2 !important;
    z-index: 99 !important;
  }

  h6 {
    color: #999;
    font-family: Urbanist;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.12px;
  }
  li {
    a {
      color: #fff;
      font-family: Urbanist;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: -0.108px;
    }
  }
}
  </style>
  