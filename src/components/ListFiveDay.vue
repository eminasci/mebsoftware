<template>
  <HeaderTest />
  <div class="my-100-50">
    <h1 class="fw-bold mb-5">Tüm Öğrenciler</h1>
    <button @click="filterHighDevamsizlik" class="filter-button">5 Gün Üstü Devamsızlık Listele</button>
    <button @click="showAllStudents" class="all-students-button">Tüm Öğrencileri Listele</button>
    <button @click="exportToExcel" class="export-excel-button">Öğrenci Listesini İndir (Excel)</button>
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
          <th>Güncelle</th>
          <th>Sil</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in studentsToShow"
          :key="student.ogrenciId"
          :class="{
            'high-devamsizlik': student.ogrenciDevamsizlik >= 3,
            'very-high-devamsizlik': student.ogrenciDevamsizlik >= 5,
          }"
        >
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
          <td>
            <button @click="confirmDeleteStudent(student.ogrenciId)" class="delete-button">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <FooterTest />
</template>

<script>
import axios from 'axios';
import ExcelJS from 'exceljs';
import HeaderTest from './HeaderTest.vue';
import FooterTest from './FooterTest.vue';

export default {
  data() {
    return {
      students: [],
      studentsToShow: [],
    };
  },
  methods: {
    async editStudent(studentId) {
      console.log('Edit student:', studentId);
      this.$router.push({ name: 'EditStudent', params: { studentId } });
    },
    async fetchStudents() {
      try {
        let result = await axios.get('http://localhost:5215/api/Students');
        this.students = result.data;
        this.studentsToShow = this.students; // Tüm öğrencileri başlangıçta göster
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
        this.fetchStudents(); // Öğrencileri tekrar yükleyerek tabloyu güncelle
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },
    filterHighDevamsizlik() {
      this.studentsToShow = this.students.filter(student => student.ogrenciDevamsizlik >= 5);
    },
    showAllStudents() {
      this.studentsToShow = this.students;
    },
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Students');

      // Excel başlıklarını ekle
      const headers = [
        'Öğrenci Adı',
        'T.C. Kimlik',
        'Devamsızlık',
        'Durum',
        'Sınıf',
        'Telefon Numarası',
        'Veli Adı',
        'Veli Telefon Numarası',
        'Okul',
      ];
      worksheet.addRow(headers);

      // Öğrenci verilerini ekleyin
      this.students.forEach(student => {
        const row = [
          student.ogrenciName,
          student.ogrenciTc,
          student.ogrenciDevamsizlik,
          student.ogrenciDurum,
          student.ogrenciSinif,
          student.ogrenciPhoneNumber,
          student.veliName,
          student.veliPhoneNumber,
          student.okul ? student.okul.okulAdi : '-',
        ];
        worksheet.addRow(row);
      });

      // Dosyayı indirme işlemi
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = 'students.xlsx';
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    },
  },
  mounted() {
    this.fetchStudents();
  },
  components: { HeaderTest, FooterTest },
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

.filter-button,
.all-students-button,
.export-excel-button {
  background-color: #4CAF50; /* Yeşil renk */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.filter-button:hover,
.all-students-button:hover,
.export-excel-button:hover {
  background-color: #45a049; /* Koyu yeşil renk (hover) */
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

.high-devamsizlik {
  background-color: #ffcccc;
  font-weight: bold;
}

.very-high-devamsizlik {
  background-color: #ff3333;
  color: #333;
  font-weight: bold;
}

.my-100-50 {
  margin: 100px 50px;
}
</style>
