<template>
  <HeaderTwoVue />
  <div class="my-50">

<div class="add-student-form admin-details-container">
  <div class="inner-content">
  <h1 class="fw-bold text-uppercase mb-5">Yeni Öğrenci Ekle</h1>
  <form @submit.prevent="submitForm" class="student-form ">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="OgrenciName">Öğrenci Adı:</label>
          <input v-model="studentModel.OgrenciName" type="text" class="form-control" required />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="OgrenciTc">Öğrenci T.C.:</label>
          <input v-model="studentModel.OgrenciTc" type="text" class="form-control" required />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="OgrenciDevamsizlik">Devamsızlık:</label>
          <input v-model="studentModel.OgrenciDevamsizlik" type="number" class="form-control" required />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="OgrenciDurum">Durum:</label>
          <input v-model="studentModel.OgrenciDurum" type="text" class="form-control" required />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="OgrenciSinif">Sınıf:</label>
          <input v-model="studentModel.OgrenciSinif" type="text" class="form-control" required />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="OgrenciPhoneNumber">Telefon Numarası:</label>
          <input v-model="studentModel.OgrenciPhoneNumber" type="text" class="form-control" required />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="VeliName">Veli Adı:</label>
          <input v-model="studentModel.VeliName" type="text" class="form-control" required />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="VeliPhoneNumber">Veli Telefon Numarası:</label>
          <input v-model="studentModel.VeliPhoneNumber" type="text" class="form-control" required />
        </div>
      </div>
    </div>

    <div class="form-group mt-3">
      <button type="submit" class="submit-button btn btn-primary">Öğrenciyi Ekle</button>
    </div>
  </form>
</div>

</div>
  </div>
  <FooterTwoVue />
</template>

<script>
import axios from 'axios';

import HeaderTwoVue from './HeaderTwo.vue';
import FooterTwoVue from './FooterTwo.vue';

export default {
  name: 'AddStudent',
  components: {

    HeaderTwoVue,
    FooterTwoVue,
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
  max-width: 800px;
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
  background-color: #34db4a;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #29b935;
}

.admin-details-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.inner-content {
  /* İçeriği içeride hizala */
  padding: 10px;
  /* İstediğiniz dolgu miktarı */
}

.my-50{
  margin: 100px auto;
}
</style>
