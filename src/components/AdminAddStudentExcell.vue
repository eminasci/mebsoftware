<template>
    <HeaderTwo />
    <div class="container contain-add-student d-flex justify-content-center align-items-center">
      <div class="row">
        <h1 class="text-capitalize fw-bold">Öğrenci eklemek için excel dosyanızı seçin</h1>
        <div class="school-details text-center">
          <div class="school-details-container bg-light">
            <div class="col">
              <input type="file" ref="fileInput" @change="handleFileChange" />
              <button @click="uploadExcel" class="btn btn-success my-5">Excel Dosyasını Yükle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterTwo class="footer" />
  </template>
  
  <script>
  import axios from 'axios';
  import HeaderTwo from './HeaderTwo.vue';
  import FooterTwo from './FooterTwo.vue';
  
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
      HeaderTwo,
      FooterTwo
    }
  };
  </script>
  
  
  <style scoped>
  .school-details {
    margin: 20px;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .school-info {
    margin-bottom: 20px;
  }
  
  .school-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .school-table th,
  .school-table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .school-table th {
    background-color: #f2f2f2;
  }
  
  .school-table tr:hover {
    background-color: #f5f5f5;
  }
  
  .high-devamsizlik {
    background-color: #ffcccc;
    font-weight: bold;
  }
  
  .very-high-devamsizlik {
    background-color: #ff3333;
    color: #333;
    font-weight: bold;
  }
  
  .edit-button {
    background-color: #3498db;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 5px;
  }
  
  .edit-button:hover {
    background-color: #2980b9;
  }
  
  .delete-button {
    background-color: #e74c3c;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #c0392b;
  }
  
  .school-details-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .school-info {
    margin-top: 20px;
  }
  
  .school-info p strong {
    font-weight: bold;
  }
  
  .contain-add-student {
    width: 100vw;
    height: 67.5vh;
  }
  </style>