<template>
  <!-- header -->
  <div class="header container-fluid ">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between">
        <router-link to="/">
          <div class="logo">
            <a href="index.html"><img src="../assets/mebLogo.png" alt="logo" width="160"></a>
          </div>
        </router-link>
        <div class="links d-lg-block d-none">
          <ul class="d-flex gap-5 align-items-center mb-0">
            <li class="list-group-item">
              <div class="position-relative">
                <router-link to="/">
                  <button class="btn   m-0 p-0 border-0 absolute-dropdown-button" type="button">
                    Anasayfa
                  </button>
                </router-link>
              </div>
            </li>
            <li class="list-group-item">
              <div class="position-relative">
                <button class="btn   m-0 p-0 border-0 absolute-dropdown-button" type="button">
                  Listeler <i class="fa-solid fa-caret-down fa-xs ms-2"></i>
                </button>
                <div class="absolute-dropdown">
                  <ul class="">
                    <router-link to="/admin-list-student">
                      <li class="list-group-item"><a class="dropdown-item text-dark" href="#">Öğrenci Listeleri</a>
                      </li>
                    </router-link>
                    <router-link to="/admin-list-fiveday">
                      <li class="list-group-item"><a class="dropdown-item text-dark" href="#">Devamsızlık 5 gün Listele</a>
                      </li>
                    </router-link>
                  </ul>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="position-relative">
                <button class="btn   m-0 p-0 border-0 absolute-dropdown-button" type="button">
                  Ekle <i class="fa-solid fa-caret-down fa-xs ms-2"></i>
                </button>
                <div class="absolute-dropdown">
                  <ul class="">
                    <router-link to="/admin-add-student">
                      <li class="list-group-item"><a class="dropdown-item text-dark" href="#">Öğrenci Ekle</a>
                      </li>
                    </router-link>
                    <router-link to="/admin-add-student-excell">
                      <li class="list-group-item"><a class="dropdown-item text-dark" href="#">Öğrenci Ekle(Excel)</a>
                      </li>
                    </router-link>
                  </ul>
                </div>
              </div>
            </li>

            <div class="img-rounded">
              <img src="../assets/profil.jpg" alt="" style="border-radius: 50%; width: 60px;">
            </div>
            <div class="text-white">
              <li class="list-group-item">
                <div class="dropdown-item" href="#">{{this.userInfo}}</div>
              </li>
            </div>
            <div class="free-demo d-lg-block d-none " v-on:click="logout">
              <a class="text-decoration-none" href="#">Çıkış Yap</a>
            </div>
          </ul>
        </div>


        <button class="btn border-0 d-lg-none d-block " type="button" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i
            class="fa-solid fa-grip-vertical text-white"></i></button>
        <div class="offcanvas offcanvas-end bg-dark " tabindex="-1" id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel"><img src="../assets/mebLogo.png" alt=" logo img"
                width="160px"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body ">
            <div class="d-flex flex-column">
              <ul class="p-0 mt-4">
                <li class="list-group-item mb-5 ">
                  <a href="#" class="text-decoration-none d-flex align-items-center justify-content-between">Paketler <i
                      class="fa-solid fa-arrow-right "></i></a>
                </li>
                <li class="list-group-item mb-5 ">
                  <a href="#" class="text-decoration-none d-flex align-items-center justify-content-between">Paketler <i
                      class="fa-solid fa-arrow-right "></i></a>
                </li>
                <li class="list-group-item mb-5 ">
                  <a href="#" class="text-decoration-none d-flex align-items-center justify-content-between">Paketler <i
                      class="fa-solid fa-arrow-right "></i></a>
                </li>
                <li class="list-group-item mb-5 ">
                  <a href="#" class="text-decoration-none d-flex align-items-center justify-content-between">Paketler <i
                      class="fa-solid fa-arrow-right "></i></a>
                </li>
                <li class="list-group-item mb-5 ">
                  <a href="#" class="text-decoration-none d-flex align-items-center justify-content-between">Paketler <i
                      class="fa-solid fa-arrow-right "></i></a>
                </li>


                <a href="#" class="btn purple-btn w-100">Ücretsiz Deneyin </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /header -->
</template>
  
<script>
export default {
  name: 'HeaderTwo',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'LoginPage' });
    },
    async fetchUserName() {
      try {
        const storedUserInfo = JSON.parse(localStorage.getItem('user-info'));
      this.userInfo = storedUserInfo.userName || 'Varsayılan Kullanıcı Adı';
        console.log(this.userInfo)
      } catch (error) {
        console.error('Kullanıcı adı getirme hatası:', error);
      }
    },
  },
  created(){
    this.fetchUserName();
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
          color: red;
          transition: 0.2s;
        }
      }

      a {
        text-decoration: none;
        color: white;

        &:hover {
          color: red;
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
      border: 1px solid red;
      background-color: red;
    }
  }

  .absolute-dropdown-button:hover {
    &+.absolute-dropdown {
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
            color: red !important;
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
  