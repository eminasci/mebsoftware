<template>
  <AdminHeaderPage/>
  <div>
  
    <div class="add-student-form">
      <h1>Yeni Öğrenci Ekle</h1>
      <form @submit.prevent="submitForm" class="student-form">
        <div class="form-group">
          <label for="OgrenciName">Öğrenci Adı:</label>
          <input v-model="studentModel.OgrenciName" type="text" required />
        </div>

        <div class="form-group">
          <label for="OgrenciTc">Öğrenci T.C.:</label>
          <input v-model="studentModel.OgrenciTc" type="text" required />
        </div>

        <div class="form-group">
          <label for="OgrenciDevamsizlik">Devamsızlık:</label>
          <input v-model="studentModel.OgrenciDevamsizlik" type="number" required />
        </div>

        <div class="form-group">
          <label for="OgrenciDurum">Durum:</label>
          <input v-model="studentModel.OgrenciDurum" type="text" required />
        </div>

        <div class="form-group">
          <label for="OgrenciSinif">Sınıf:</label>
          <input v-model="studentModel.OgrenciSinif" type="text" required />
        </div>

        <div class="form-group">
          <label for="OgrenciPhoneNumber">Telefon Numarası:</label>
          <input v-model="studentModel.OgrenciPhoneNumber" type="text" required />
        </div>

        <div class="form-group">
          <label for="VeliName">Veli Adı:</label>
          <input v-model="studentModel.VeliName" type="text" required />
        </div>

        <div class="form-group">
          <label for="VeliPhoneNumber">Veli Telefon Numarası:</label>
          <input v-model="studentModel.VeliPhoneNumber" type="text" required />
        </div>

        <div class="form-group">
          <button type="submit" class="submit-button">Öğrenciyi Ekle</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AdminHeaderPage from './AdminHeaderPage.vue';



export default {
  name: 'AddStudent',
  components: {
    AdminHeaderPage,
  },
  data() {
    return {
      studentModel: {
        OgrenciName: '',
        OgrenciTc: '',
        OgrenciDevamsizlik: 0,
        OgrenciDurum: '',
        OgrenciSinif: '',
        OgrenciPhoneNumber: '',
        VeliName: '',
        VeliPhoneNumber: '',
        
        
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        // LocalStorage'tan UserId'yi al
        const userInfo = JSON.parse(localStorage.getItem('user-info'));
        if (userInfo && userInfo.userId) {
          this.studentModel.UserId = userInfo.userId;
          console.log(this.studentModel.UserId)
          console.log(userInfo.userId)
        }

        // Öğrenciyi eklemek için istek gönder
        const response = await axios.post('http://localhost:5215/api/Students/add-student-admin', this.studentModel);
        console.log(response.data);
        alert('Öğrenci başarıyla eklendi.');
        this.resetForm();
      } catch (error) {
        console.error('Error adding student:', error);
        alert('Öğrenci eklenirken bir hata oluştu.');
      }
    },
    resetForm() {
      this.studentModel = {
        OgrenciName: '',
        OgrenciTc: '',
        OgrenciDevamsizlik: 0,
        OgrenciDurum: '',
        OgrenciSinif: '',
        OgrenciPhoneNumber: '',
        VeliName: '',
        VeliPhoneNumber: '',
      };
    },
  },
};
</script>

<style scoped>
.add-student-form {
  max-width: 400px;
  margin: auto;
}

.student-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2980b9;
}
</style>
