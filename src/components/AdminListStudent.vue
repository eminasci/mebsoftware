<template>
  <div>
    <h2>Okul Information</h2>
    <div v-if="okul">
      <p>Okul Adı: {{ okul.OkulAdi }}</p>
      <p>Okul Adres: {{ okul.OkulAdres }}</p>
      
    </div>
    <div v-else>
      <p>Okul bilgisi bulunamadı.</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      okul: null,
      userId: null,
    };
  },
  mounted() {
    this.userId = this.getUserIdFromLocalStorage();
    this.fetchOkul();
  },
  methods: {
    getUserIdFromLocalStorage() {
      const userInfo = localStorage.getItem('user-info');

      if (userInfo) {
        const parsedInfo = JSON.parse(userInfo);
        return parsedInfo.userId;
      }

      return null;
    },
    fetchOkul() {
      if (!this.userId) {
        console.error('User ID not found.');
        return;
      }

      const apiUrl = `/User/get-school/${this.userId}`;

      this.axios
        .get(apiUrl)
        .then((response) => {
          this.okul = response.data;
          console.log('Okul Data:', this.okul);
        })
        .catch((error) => {
          console.error('Error fetching Okul:', error);
        });
    },
  },
};
</script>