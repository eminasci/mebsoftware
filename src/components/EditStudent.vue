<template>
  <div>
    <HeaderTest />
    <div class="my-50">
      <div class="add-student-form admin-details-container">
        <div class="inner-content">
          <div class="update-student-form">
            <h1>Öğrenci Güncelle</h1>
            <form @submit.prevent="updateStudent" class="student-form">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="OgrenciName">Öğrenci Adı:</label>
                    <input v-model="studentModel.ogrenciName" type="text" required />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="OgrenciTc">Öğrenci T.C.:</label>
                    <input v-model="studentModel.ogrenciTc" type="text" required />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="OgrenciDevamsizlik">Devamsızlık:</label>
                    <input v-model="studentModel.ogrenciDevamsizlik" type="number" required />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="OgrenciDurum">Durum:</label>
                    <input v-model="studentModel.ogrenciDurum" type="text" required />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="OgrenciSinif">Sınıf:</label>
                    <input v-model="studentModel.ogrenciSinif" type="text" required />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="OgrenciPhoneNumber">Telefon Numarası:</label>
                    <input v-model="studentModel.ogrenciPhoneNumber" type="text" required />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="VeliName">Veli Adı:</label>
                    <input v-model="studentModel.veliName" type="text" required />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="VeliPhoneNumber">Veli Telefon Numarası:</label>
                    <input v-model="studentModel.veliPhoneNumber" type="text" required />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="OkulId">Okul:</label>
                    <select v-model="studentModel.okulId" required>
                      <option v-for="school in schools" :key="school.okulId" :value="school.okulId">{{ school.okulAdi }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" class="submit-button">Öğrenciyi Güncelle</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterTest />
</template>

<script>
import axios from 'axios';
import HeaderTest from './HeaderTest.vue';
import FooterTest from './FooterTest.vue';
export default {
  name: 'UpdateStudent',
  components: {
    FooterTest,
    HeaderTest
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
        this.$router.push({ name: 'ListStudent' });

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

input,
select {
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

input,
select {
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

.my-50 {
  margin: 100px auto;
}
</style>
