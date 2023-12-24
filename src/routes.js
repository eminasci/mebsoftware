// import HomePage from './components/HomePage.vue'
// import SignUp from './components/SignUp.vue'
// import { createRouter, createWebHistory } from 'vue-router'
// import LoginPage from './components/LoginPage.vue'
// import AddScholl from './components/AddScholl.vue'
// import UpdateScholl from './components/UpdateScholl.vue'
// import AdminPage  from './components/AdminPage.vue'

// const routes = [
//     {
//         name: "HomePage",
//         component: HomePage,
//         path: '/',

//     },

//     {
//         name: "SignUp",
//         component: SignUp,
//         path: "/sign-up"
//     },
//     {
//         name: "LoginPage",
//         component: LoginPage,
//         path: "/login"
//     },
//     {
//         name: "AddScholl",
//         component: AddScholl,
//         path: "/add-scholl"
//     },
//     {
//         name: "UpdateScholl",
//         component: UpdateScholl,
//         path: "/update-scholl/:id"
//     },
//     {
//         name:"AdminPage",
//         component:AdminPage,
//         path:"/adminPage"
//     },




// ];

// const router = createRouter({
//     history: createWebHistory(),
//     routes
// });

// export default router
import HomePage from './components/HomePage.vue'
import SignUp from './components/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import AddScholl from './components/AddScholl.vue'
import UpdateScholl from './components/UpdateScholl.vue'
import AdminPage from './components/AdminPage.vue'
import ListUser from './components/ListUser.vue'

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/',
        beforeEnter: (to, from, next) => {
          // localStorage'da kullanıcı bilgisi var mı kontrol et
          const userInfo = localStorage.getItem('user-info');
    
          if (userInfo) {
            const user = JSON.parse(userInfo);
            if (user.roleId == 1) {
              // Kullanıcı izinli, sayfaya devam et
              next();
            } else {
              // Kullanıcı yetkili değil, login sayfasına yönlendir
              next('/login');
            }
          } else {
            // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
            next('/login');
          }
        },
      },
    
    {
        name: "SignUp",
        component: SignUp,
        path: "/sign-up",
        beforeEnter: (to, from, next) => {
            // localStorage'da kullanıcı bilgisi var mı kontrol et
            const userInfo = localStorage.getItem('user-info');
            if (userInfo) {
                const user = JSON.parse(userInfo);
                if (user.roleId== 1) {
                    next();
                } else {
                    next('/login');
                }
            } else {
                // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
                next('/login');
            }
        },
    },
    {
        name: "LoginPage",
        component: LoginPage,
        path: "/login"
    },
    {
        name: "AddScholl",
        component: AddScholl,
        path: "/add-scholl",
        beforeEnter: (to, from, next) => {
            // localStorage'da kullanıcı bilgisi var mı kontrol et
            const userInfo = localStorage.getItem('user-info');
            if (userInfo) {
                const user = JSON.parse(userInfo);
                if (user.roleId== 1) {
                    next();
                } else {
                    next('/login');
                }
            } else {
                // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
                next('/login');
            }
        },
    },
    {
        name:"ListUser",
        component: ListUser,
        path: "/list-user",
        beforeEnter: (to, from, next) => {
            // localStorage'da kullanıcı bilgisi var mı kontrol et
            const userInfo = localStorage.getItem('user-info');
            if (userInfo) {
                const user = JSON.parse(userInfo);
                if (user.roleId== 1) {
                    next();
                } else {
                    next('/login');
                }
            } else {
                // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
                next('/login');
            }
        },
    },
    {
        name: "UpdateScholl",
        component: UpdateScholl,
        path: "/update-scholl/:okulId",
        props:true,
        beforeEnter: (to, from, next) => {
            // localStorage'da kullanıcı bilgisi var mı kontrol et
            const userInfo = localStorage.getItem('user-info');
            if (userInfo) {
                const user = JSON.parse(userInfo);
                if (user.roleId == 1) {
                    next();
                } else {
                    next('/login');
                }
            } else {
                // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
                next('/login');
            }
        },
    },
    {
        name: "AdminPage",
        component: AdminPage,
        path: "/adminPage/:id",
        beforeEnter: (to, from, next) => {
            // localStorage'da kullanıcı bilgisi var mı kontrol et
            const userInfo = localStorage.getItem('user-info');
            if (userInfo) {
                const user = JSON.parse(userInfo);
                if (user.roleId ==2) {
                    next();
                } else {
                    next('/login');
                }
            } else {
                // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
                next('/login');
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

