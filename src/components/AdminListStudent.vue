<!-- <template>
  <div>
    <HeaderPage />
    <div class="school-details">
      <h1>{{ okul.okuladi }} Okulu Detayları</h1>
      <div class="school-info">
        <p><strong>Müdür:</strong> {{ okul.mudur }}</p>
        <p><strong>İletişim Bilgisi:</strong> {{ okul.iletisim_bilgisi }}</p>
        <p><strong>Adres:</strong> {{ okul.adres }}</p>
      </div>

      <h2>Öğrenciler</h2>
      <div v-if="okul.ogrenciler && okul.ogrenciler.length > 0">
        <table class="school-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Adı</th>
              <th>T.C. Kimlik Numarası</th>
              <th>Sınıfı</th>
              <th>Devamsızlık</th>
              <th>İletişim Bilgisi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ogrenci in okul" :key="ogrenci" :class="{ 'high-devamsizlik': ogrenci.devamsizlik >= 3 }">
              <td>{{ ogrenci.ogrenciId }}</td>
              <td>{{ ogrenci.ogrenciName }}</td>
              <td>{{ ogrenci.ogrenciTc }}</td>
              <td>{{ ogrenci.ogrenciSinif }}</td>
              <td>{{ ogrenci.ogrenciDevamsizlik }}</td>
              <td>{{ ogrenci.ogrenciIletisimBilgisi }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Kullanıcıya bağlı okul bulunamadı.</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage.vue';
import axios from 'axios';

export default {
  name: 'SchoolDetails',
  components: {
    HeaderPage,
  },
  data() {
    return {
      okul: {},
    };
  },
  async mounted() {
    const storedUserInfo = JSON.parse(localStorage.getItem('user-info'));
    this.userInfo = storedUserInfo.userId;

    console.warn(this.userInfo);

    try {
      const response = await axios.get(`http://localhost:5215/api/User/get-school/${this.userInfo}`);
      this.okul = response.data;
      
     
      console.log(this.okul[0])
    } catch (error) {
      // Hata durumunda eğer 404 hatası alınıyorsa, kullanıcıya bağlı okul bulunamadığı bilgisini gösterelim.
      if (error.response && error.response.status === 404) {
        alert('Okul bulunamadı.');
      } else {
        console.error('API Request Failed:', error);
      }
    }
  },
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
  background-color: #ffcccc; /* veya istediğiniz başka bir renk */
  font-weight: bold;
}
</style> -->
<template>
  <HeaderTwoVue />

  <div class="my-5">
    <div class="school-details">
      <div class="school-details-container bg-light">
        <h1 class="fw-bold">{{ okul.okuladi }} Okul Detayları</h1>
        <div class="school-info" v-if="Array.isArray(okul) && okul.length > 0">
          <p><strong class="text-uppercase">Müdür:</strong> {{ user.userName }}</p>
          <p><strong class="text-uppercase">İletişim Bilgisi:</strong> {{ user.userPhoneNumber }}</p>
          <p><strong class="text-uppercase">Okul Adı:</strong> <span class="fw-light">{{ okul[0].okul.okulAdi }}</span>
          </p>
        </div>
      </div>

      <h2 class="fw-bold my-4">Öğrenciler</h2>
      <div v-if="Array.isArray(okul) && okul.length > 0">
        <table class="school-table">
          <thead >
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
            <tr v-for="ogrenci in okul" :key="ogrenci.ogrenciId"
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
              <td> <button @click="editStudent(ogrenci.ogrenciId)" class="edit-button">Güncelle</button></td>
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
</template>

<script>

import axios from 'axios';
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
    };
  },
  created() {
    this.fetchSchoolDetails();
  },
  methods: {
    async editStudent(studentId) {
      // Öğrenci güncelleme sayfasına yönlendirme yapabilirsiniz
      console.log('Edit student:', studentId);
      // Örneğin:
      this.$router.push({ name: 'AdminEditStudent', params: { studentId } });
    },
    async confirmDeleteStudent(studentId) {
      if (confirm('Öğrenciyi silmek istediğinize emin misiniz?')) {
        await axios.delete(`http://localhost:5215/api/Students/${studentId}`)
        this.fetchSchoolDetails();

      }
    },
    async fetchSchoolDetails() {
      const storedUserInfo = JSON.parse(localStorage.getItem('user-info'));
      this.userInfo = storedUserInfo.userId;
      this.user = storedUserInfo


      try {
        const response = await axios.get(`http://localhost:5215/api/User/get-school/${this.userInfo}`);
        const rawData = response.data;
        const plainArray = Array.from(rawData); // veya [...rawData];
        this.okul = plainArray;

      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('Okul bulunamadı.');
        } else {
          console.error('API Request Failed:', error);
        }
      }
    },
  },
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
  /* veya istediğiniz başka bir renk */
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
  /* İstediğiniz maksimum genişlik */
  margin: 0 auto;
  /* Sayfa ortasında hizalamak için */
  padding: 20px;
  /* İstediğiniz dolgu miktarı */
  border: 1px solid #ccc;
  /* Kutu kenarlık rengi ve kalınlığı */
  border-radius: 10px;
  /* Köşe yarıçapı */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Gölgelendirme */
}

.school-info {
  margin-top: 20px;
  /* İstediğiniz üst boşluk miktarı */
}

/* İsterseniz başlıkları kalın yapabilirsiniz */
.school-info p strong {
  font-weight: bold;
}
</style>

