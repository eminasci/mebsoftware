<template>
    <HeaderPage />
    <div>
      <h1>Tüm Öğrenciler</h1>
      <table class="student-table">
        <thead>
          <tr>
            <th>Öğrenci Adı</th>
            <th>T.C. Kimlik</th>
            <th>Devamsızlık</th>
            <th>Durum</th>
            <th>Sınıf</th>
            <th>Telefon Numarası</th>
            <th>Veli Adı</th>
            <th>Veli Telefon Numarası</th>
            <th>Okul</th>
            <th>Güncelle</th> <!-- Yeni sütun ekleyin -->
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.ogrenciId">
            <td>{{ student.ogrenciName }}</td>
            <td>{{ student.ogrenciTc }}</td>
            <td>{{ student.ogrenciDevamsizlik }}</td>
            <td>{{ student.ogrenciDurum }}</td>
            <td>{{ student.ogrenciSinif }}</td>
            <td>{{ student.ogrenciPhoneNumber }}</td>
            <td>{{ student.veliName }}</td>
            <td>{{ student.veliPhoneNumber }}</td>
            <td>{{ student.okul ? student.okul.okulAdi : '-' }}</td>
            <td>
             <button @click="editStudent(student.ogrenciId)" class="edit-button">Güncelle</button>
            </td>
            <td>  <button @click="confirmDeleteStudent(student.ogrenciId)" class="delete-button">Sil</button> </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import HeaderPage from './HeaderPage.vue';
  
  export default {
    data() {
      return {
        students: [],
      };
    },
    methods: {
        async editStudent(studentId) {
      // Öğrenci güncelleme sayfasına yönlendirme yapabilirsiniz
      console.log('Edit student:', studentId);
      // Örneğin:
       this.$router.push({ name: 'EditStudent', params: { studentId } });
    },
      async fetchStudents() {
        try {
          let result = await axios.get('http://localhost:5215/api/Students');
          this.students = result.data;
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      },
      async confirmDeleteStudent(studentId) {
        if (confirm('Öğrenciyi silmek istediğinize emin misiniz?')) {
          this.deleteStudent(studentId);
        }
      },
      async deleteStudent(studentId) {
        try {
          let result = await axios.delete(`http://localhost:5215/api/Students/${studentId}`);
          console.log(result);
          // Başarı mesajı veya yönlendirme yapabilirsiniz
          this.fetchStudents(); // Öğrencileri tekrar yükleyerek tabloyu güncelle
        } catch (error) {
          console.error('Error deleting student:', error);
        }
      },
    },
    mounted() {
      this.fetchStudents();
    },
    components: { HeaderPage },
  };
  </script>
  
  <style scoped>
  .student-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .student-table th,
  .student-table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .student-table th {
    background-color: #f2f2f2;
  }
  
  .delete-button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    opacity: 0.8;
  }
  .edit-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  margin-right: 5px;
}

.edit-button:hover {
  opacity: 0.8;
}
  
  </style>
  