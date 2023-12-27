
<template>
    <HeaderPage/>
    <div>
      <h1>Öğrenci Ekle</h1>
      <form @submit.prevent="addStudent" class="student-form">
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
    <label for="OkulId">Okul:</label>
        <select v-model="selectedSchool" @change="onSchoolChange" required>
          <option v-for="school in schools" :key="school.okulId" :value="school.okulId">{{ school.okulAdi }}</option>
        </select>

    
</div>  
  
        <button type="submit" class="submit-button">Öğrenciyi Ekle</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import HeaderPage from './HeaderPage.vue';
  
  export default {
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
            selectedSchool: null,
        };
    },
    methods: {
        async addStudent() {
            // Öğrenci eklemeye yönelik axios isteğini burada yapın
            // this.studentModel ve this.selectedSchool içindeki verileri kullanarak API'ye POST isteği gönderin
            try {
                let result = await axios.post('http://localhost:5215/api/Students/add-student', {
                    ...this.studentModel,
                    OkulId: this.selectedSchool,
                });
                alert("Öğrenci başarıyla kaydedildi");
                console.warn(result)
                // Başarı mesajı veya yönlendirme yapabilirsiniz
            }
            catch (error) {
                console.error('Error adding student:', error);
            }
        },
        async fetchSchools() {
            // Okulları çekmeye yönelik axios isteğini burada yapın
            try {
                let result = await axios.get('http://localhost:5215/api/Okuls');
                this.schools = result.data;
            }
            catch (error) {
                console.error('Error fetching schools:', error);
            }
        },
        onSchoolChange() {
            // Okul seçimi değiştiğinde yapılacak işlemleri burada ekleyebilirsiniz
            console.log('Selected school:', this.selectedSchool);
        },
    },
    async mounted() {
        // Component yüklendiğinde okulları çekiyoruz
        await this.fetchSchools();
    },
    components: { HeaderPage }
};
  </script>
  
  <style scoped>
  .student-form {
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
  
