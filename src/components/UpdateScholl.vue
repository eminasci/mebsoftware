<template>
  <div>
    <HeaderTest />
    <div class="my-50">
      <div class="add-student-form admin-details-container">
        <div class="inner-content">
          <div class="update-school-container">
            <h1 class="mb-5 fw-bold ">Okul Güncelle</h1>
            <form class="update-school-form">
              <label for="okuladi">Okul Adı:</label>
              <input type="text" name="okuladi" v-model="okul.okulAdi" placeholder="Okul adını girin" />

              <label for="mudur">Müdür:</label>
              <select v-model="okul.userId">
                <option disabled>Seçenek seçiniz</option>
                <option v-for="item in mudur" :key="item.id" :value="item.userId">{{ item.userName }}</option>
              </select>

              <label for="iletisim_bilgisi">İletişim Bilgisi:</label>
              <input type="text" name="iletisim_bilgisi" v-model="okul.okulIletisim"
                placeholder="İletişim bilgilerini giriniz" />

              <label for="adres">Okul Adresi:</label>
              <input type="text" name="adres" v-model="okul.okulAdres" placeholder="Okul adresini girin" />

              <label for="okulTuru">Okul Türü:</label>
              <input type="text" name="okulTuru" v-model="okul.okulTuru" placeholder="Okul türünü girin" />

              <button type="button" @click="okulGuncelle">Okulu Güncelle</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterTest />
</template>

<script>
import HeaderTest from './HeaderTest.vue';
import FooterTest from './FooterTest.vue';
import axios from 'axios';

export default {
  name: 'UpdateSchool',
  components: {
    HeaderTest, FooterTest
  },
  data() {
    return {
      name: '',
      okul: {
        okulAdi: '',
        userId: '', // Değişiklik burada
        okulIletisim: '',
        okulAdres: '',
        okulTuru: ''
      },
      mudur: [],
    };
  },
  methods: {
    async okulGuncelle() {
      try {
        const result = await axios.put(`http://localhost:5215/api/Okuls/update-school/${this.$route.params.okulId}`, {
          OkulAdi: this.okul.okulAdi,
          UserId: this.okul.userId,
          OkulIletisim: this.okul.okulIletisim,
          OkulAdres: this.okul.okulAdres,
          OkulTuru: this.okul.okulTuru,
        });

        if (result.status === 200) {
          this.$router.push({ name: 'HomePage' });
        }

        console.warn('result', result);
      } catch (error) {
        console.error('Error during school update:', error);
      }
    },
  },
  async mounted() {
    try {
      const mudurResult = await axios.get('http://localhost:5215/api/User');
      this.mudur = mudurResult.data;

      let user = localStorage.getItem('user-info');
      this.name = JSON.parse(user).name;

      if (!user) {
        this.$router.push({ name: 'SignUp' });
      }

      const result = await axios.get(`http://localhost:5215/api/Okuls/${this.$route.params.okulId}`);
      this.okul = result.data;

    } catch (error) {
      console.error('Error during component mount:', error);
    }
  },
};
</script>

<style scoped>
.update-school-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.update-school-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  max-width: 400px;
  margin: auto;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.add-student-form {
  max-width: 800px;
  margin: auto;
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
