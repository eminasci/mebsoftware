<template>
    <div class="bg-footer py-1 footer ">
        <div class="container d-flex justify-content-between align-items-center mt-5">
            <div class="footer-column col-12 col-md-4">
                <img src="../assets/mebLogo.png" alt="" width="160">
            </div>
            <div class="footer-column col-12 col-md-4 ">
                <div class="footer-heading">LİSTELER</div>
                <router-link to="/list-user">
                    <p><a href="#" class="footer-link ">Kullanıcı Listeleri</a></p>
                </router-link>
                <router-link to="/list-student">
                    <p><a href="#" class="footer-link">Öğrenci Listeleri</a></p>
                </router-link>
                <router-link to="/">
                    <p><a href="#" class="footer-link">Okul Listeleri</a></p>
                </router-link>
            </div>
            <div class="footer-column col-12 col-md-4">
                <div class="footer-heading">EKLE</div>
                <router-link to="/sign-up">
                    <p><a href="#" class="footer-link">Kullanıcı Ekle</a></p>
                </router-link>
                <router-link to="/add-student">
                    <p><a href="#" class="footer-link">Öğrenci Ekle</a></p>
                </router-link>
                <router-link to="/add-scholl">
                    <p><a href="#" class="footer-link">Okul Ekle</a></p>
                </router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'FooterTest',
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: 'LoginPage' });
        }
    }
}
</script>
  
<style scoped>
.bg-footer {
    background-color: #1a1a1a;
}

.footer-column {
    text-align: center;
}

.footer-column .footer-heading {
    font-weight: bold;
    margin-bottom: 10px;
    color: white;
    /* Beyaz renk */
}

.footer-column .footer-text {
    font-weight: bold;
    margin-bottom: 10px;
    color: white;
    /* Beyaz renk */
}

.footer-column p {
    margin: 5px 0;
}

.footer-column .footer-link {
    color: white;
    /* Beyaz renk */
    text-decoration: none;
}

.footer-column .footer-link:hover {
    color: red;
    /* Hover durumunda kırmızı renk */
}
</style>
  