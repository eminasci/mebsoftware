<template>
  <HeaderTest />
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <button @click="uploadExcel">Excel Dosyasını Yükle</button>
  </div>
  <!-- <FooterTest /> -->
</template>

<script>
import axios from 'axios';
import HeaderTest from './HeaderTest.vue';
// import FooterTest from './FooterTest.vue';

export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadExcel() {
      try {
        if (!this.selectedFile) {
          alert('Lütfen bir Excel dosyası seçin.');
          return;
        }

        const formData = new FormData();
        formData.append('excelFile', this.selectedFile);

        // Axios instance'ı kullanarak isteği yapın
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:5215/api',  // API adresiniz
          withCredentials: true,  // Tarayıcı çerezleri göndermesini sağlar
        });

        const response = await axiosInstance.post('/Students/add-student-from-excel', formData);

        alert('Başarıyla eklendi:', response.data);
      } catch (error) {
        console.error('Hata:', error.response.data);
      }
    },
  },
  components: {
    HeaderTest,
    // FooterTest
  }
};
</script>


