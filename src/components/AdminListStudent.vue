<template>
  <div>
    <HeaderTwoVue />
    <div class="my-5">
      <div class="school-details">
        <div class="school-details-container bg-light">
          <h1 class="fw-bold">{{ okul.okuladi }} Okul Detayları</h1>
          <div class="school-info" v-if="Array.isArray(okul) && okul.length > 0">
            <p><strong class="text-uppercase">Müdür:</strong> {{ user.userName }}</p>
            <p><strong class="text-uppercase">İletişim Bilgisi:</strong> {{ user.userPhoneNumber }}</p>
            <p><strong class="text-uppercase">Okul Adı:</strong> <span class="fw-light">{{ okul[0].okul.okulAdi }}</span></p>
          </div>
        </div>

        <h2 class="fw-bold my-4">Öğrenciler</h2>
        <div v-if="Array.isArray(okul) && okul.length > 0">
          <div class="button-container">
            <button @click="listAllStudents" class="custom-button">Tüm Öğrencileri Listele</button>
            <button @click="listHighDevamsizlikStudents" class="custom-button">Devamsızlık 5 Gün Üstü</button>
            <!-- Yeni eklenen buton -->
            <button @click="exportToExcel" class="custom-button">Öğrenci Listesini İndir (Excel)</button>
          </div>
          <table class="school-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Adı</th>
                <th>T.C. Kimlik Numarası</th>
                <th>Sınıfı</th>
                <th>Devamsızlık</th>
                <th>İletişim Bilgisi</th>
                <th>Veli Adı</th>
                <th>Veli Tel</th>
                <th>Durum</th>
                <th>Güncelle</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ogrenci in displayedStudents" :key="ogrenci.ogrenciId"
                :class="{ 'high-devamsizlik': ogrenci.ogrenciDevamsizlik >= 3, 'very-high-devamsizlik': ogrenci.ogrenciDevamsizlik >= 5 }">
                <td>{{ ogrenci.ogrenciId }}</td>
                <td>{{ ogrenci.ogrenciName }}</td>
                <td>{{ ogrenci.ogrenciTc }}</td>
                <td>{{ ogrenci.ogrenciSinif }}</td>
                <td>{{ ogrenci.ogrenciDevamsizlik }}</td>
                <td>{{ ogrenci.ogrenciPhoneNumber }}</td>
                <td>{{ ogrenci.veliName }}</td>
                <td>{{ ogrenci.veliPhoneNumber }}</td>
                <td>{{ ogrenci.ogrenciDurum }}</td>
                <td><button @click="editStudent(ogrenci.ogrenciId)" class="edit-button">Güncelle</button></td>
                <td><button @click="confirmDeleteStudent(ogrenci.ogrenciId)" class="delete-button">Sil</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>Kullanıcıya bağlı okul bulunamadı.</p>
        </div>
      </div>
    </div>
    <FooterTwoVue />
  </div>
</template>

<script>
import axios from 'axios';
import ExcelJS from 'exceljs';
import HeaderTwoVue from './HeaderTwo.vue';
import FooterTwoVue from "./FooterTwo.vue";

export default {
  name: 'SchoolDetails',
  components: {
    HeaderTwoVue,
    FooterTwoVue,
  },
  data() {
    return {
      okul: {},
      user: {},
      displayedStudents: [], // Yeni eklenen alan
    };
  },
  created() {
    this.fetchSchoolDetails();
  },
  methods: {
    async editStudent(studentId) {
      console.log('Edit student:', studentId);
      this.$router.push({ name: 'AdminEditStudent', params: { studentId } });
    },
    async confirmDeleteStudent(studentId) {
      if (confirm('Öğrenciyi silmek istediğinize emin misiniz?')) {
        await axios.delete(`http://localhost:5215/api/Students/${studentId}`);
        this.fetchSchoolDetails();
      }
    },
    async fetchSchoolDetails() {
      const storedUserInfo = JSON.parse(localStorage.getItem('user-info'));
      this.userInfo = storedUserInfo.userId;
      this.user = storedUserInfo;

      try {
        const response = await axios.get(`http://localhost:5215/api/User/get-school/${this.userInfo}`);
        const rawData = response.data;
        const plainArray = Array.from(rawData);
        this.okul = plainArray;
        this.displayedStudents = plainArray; // Okul verilerini displayedStudents'e atıyoruz
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('Okul bulunamadı.');
        } else {
          console.error('API Request Failed:', error);
        }
      }
    },
    listAllStudents() {
      this.displayedStudents = this.okul; // Tüm öğrencileri displayedStudents'e atıyoruz
    },
    listHighDevamsizlikStudents() {
      this.displayedStudents = this.okul.filter(ogrenci => ogrenci.ogrenciDevamsizlik >= 5);
      // Devamsızlık süresi 5 gün üzerinde olan öğrencileri displayedStudents'e atıyoruz
    },
    // Yeni eklenen metot
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Students');

      // Excel başlıklarını ekle
      const headers = [
        'ID',
        'Adı',
        'T.C. Kimlik Numarası',
        'Sınıfı',
        'Devamsızlık',
        'İletişim Bilgisi',
        'Veli Adı',
        'Veli Tel',
        'Durum',
      ];
      worksheet.addRow(headers);

      // Öğrenci verilerini ekleyin
      this.displayedStudents.forEach(ogrenci => {
        const row = [
          ogrenci.ogrenciId,
          ogrenci.ogrenciName,
          ogrenci.ogrenciTc,
          ogrenci.ogrenciSinif,
          ogrenci.ogrenciDevamsizlik,
          ogrenci.ogrenciPhoneNumber,
          ogrenci.veliName,
          ogrenci.veliPhoneNumber,
          ogrenci.ogrenciDurum,
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
};
</script>

<style scoped>
.custom-button {
  background-color: #2ecc71;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 5px;
}

.custom-button:hover {
  background-color: #27ae60;
}
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

.button-container {
  margin-bottom: 20px;
}

.custom-button {
  background-color: #2ecc71;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 5px;
}

.custom-button:hover {
  background-color: #27ae60;
}
</style>
