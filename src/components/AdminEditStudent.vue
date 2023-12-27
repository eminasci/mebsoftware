<template>
   <div>
    <AdminHeaderPage/>
    <div class="update-student-form">
      <h1>Öğrenci Güncelle</h1>
      <form @submit.prevent="updateStudent" class="student-form" >
        <div class="form-group">
          <label for="OgrenciName">Öğrenci Adı:</label>
          <input v-model="studentModel.ogrenciName" type="text" required />
        </div>

        <div class="form-group">
          <label for="OgrenciTc">Öğrenci T.C.:</label>
          <input v-model="studentModel.ogrenciTc" type="text" required />
        </div>

        <div class="form-group">
          <label for="OgrenciDevamsizlik">Devamsızlık:</label>
          <input v-model="studentModel.ogrenciDevamsizlik" type="number" required />
        </div>

        <div class="form-group">
          <label for="OgrenciDurum">Durum:</label>
          <input v-model="studentModel.ogrenciDurum" type="text" required />
        </div>

        <div class="form-group">
          <label for="OgrenciSinif">Sınıf:</label>
          <input v-model="studentModel.ogrenciSinif" type="text" required />
        </div>

        <div class="form-group">
          <label for="OgrenciPhoneNumber">Telefon Numarası:</label>
          <input v-model="studentModel.ogrenciPhoneNumber" type="text" required />
        </div>

        <div class="form-group">
          <label for="VeliName">Veli Adı:</label>
          <input v-model="studentModel.veliName" type="text" required />
        </div>

        <div class="form-group">
          <label for="VeliPhoneNumber">Veli Telefon Numarası:</label>
          <input v-model="studentModel.veliPhoneNumber" type="text" required />
        </div>

      
        
       

        <button type="submit" class="submit-button">Öğrenciyi Güncelle</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AdminHeaderPage from './AdminHeaderPage.vue';

export default {
  name: 'UpdateStudent',
  components: {
   
    AdminHeaderPage
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
        OkulId: null,
      },
      schools: [],
    };
  },
  methods: {
    async updateStudent() {
      try {
        const studentId = this.$route.params.studentId;

        // Öğrenciyi güncelleme isteği
        const result = await axios.put(`http://localhost:5215/api/Students/update-student/${studentId}`, this.studentModel);

        alert('Öğrenci başarıyla güncellendi');
        console.warn(result);
        this.$router.push({ name: 'AdminListStudent' });

      } catch (error) {
        console.error('Error updating student:', error);
      }
    },
    async fetchSchools() {
      // Okulları çekme işlemi
      try {
        const result = await axios.get('http://localhost:5215/api/Okuls');
        this.schools = result.data;
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    },
    async fetchStudentDetails() {
      try {
        const studentId = this.$route.params.studentId;

        // Öğrenci detaylarını çekme isteği
        const result = await axios.get(`http://localhost:5215/api/Students/${studentId}`);
        this.studentModel = result.data;
        console.warn(result.data.ogrenciName)
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    },
  },
  async created() {
    await this.fetchSchools();
    await this.fetchStudentDetails(); // Sayfa yüklendiğinde öğrenci detaylarını çekiyoruz
  },
};
</script>

<style scoped>
.update-student-form {
  max-width: 400px;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
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
