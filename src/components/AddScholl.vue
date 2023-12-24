<!-- 
<template>
    <HeaderPage />
    <div class="add-school-page">
        <h1>Hello {{ name }}, Welcome on Add School Page</h1>
        <form class="add-school-form">
            <div class="form-group">
                <label for="okuladi">Okul Adı:</label>
                <input type="text" id="okuladi" name="okuladi" placeholder="Okul adını girin" v-model="okul.okuladi" />
            </div>
            <div class="form-group">
                <label for="mudur">Okul Müdürü:</label>
                <select id="mudur" v-model="okul.mudur">
                    <option disabled>Please select an option</option>
                    <option v-for="item in mudur" :key="item.id">{{ item.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="iletisim_bilgisi">İletişim Bilgileri:</label>
                <input type="text" id="iletisim_bilgisi" name="iletisim_bilgisi" placeholder="İletişim bilgilerini giriniz" v-model="okul.iletisim_bilgisi" />
            </div>
            <div class="form-group">
                <label for="adres">Okul Adresi:</label>
                <input type="text" id="adres" name="adres" placeholder="Okul adresini girin" v-model="okul.adres" />
            </div>
            <button type="button" v-on:click="okulEkle">Yeni okul ekle</button>
        </form>
    </div>
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import axios from 'axios';

export default {
    name: 'AddScholl',
    components: {
        HeaderPage
    },
    data() {
        return {
            name: '',
            okul: {
                okuladi: '',
                mudur: '',
                iletisim_bilgisi: '',
                adres: '',
            },
            mudur: [],
        }
    },
    methods: {
        async okulEkle() {
            console.warn(this.okul)
            const result = await axios.post("http://localhost:3000/okul", {
                okuladi: this.okul.okuladi,
                mudur: this.okul.mudur,
                iletisim_bilgisi: this.okul.iletisim_bilgisi,
                adres: this.okul.adres
            });
            if (result.status == 201) {
                this.$router.push({ name: 'HomePage' })
            }
            console.warn("result", result)
        }
    },
    async mounted() {
     
    }
}
</script>

<style scoped>
.add-school-page {
    text-align: center;
    margin: 20px;
}

.add-school-form {
    max-width: 400px;
    margin: auto;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 16px;
}

label {
    display: block;
    margin-bottom: 8px;
}

input, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style> 
 -->
 <template>
    <HeaderPage />
    <div class="add-school-page">
        <h1>Hello {{ name }}, Welcome on Add School Page</h1>
        <form class="add-school-form" @submit.prevent="okulEkle">
            <div class="form-group">
                <label for="okulAdi">Okul Adı:</label>
                <input type="text" id="okulAdi" name="okulAdi" placeholder="Okul adını girin" v-model="okul.OkulAdi" required />
            </div>
            <div class="form-group">
                <label for="mudur">Okul Müdürü:</label>
                <select id="mudur" v-model="okul.UserId" required>
                    <option disabled>Please select an option</option>
                    <option v-for="item in mudur" :key="item.id" :value="item.userId">{{ item.userName }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="iletisimBilgisi">İletişim Bilgileri:</label>
                <input type="text" id="iletisimBilgisi" name="iletisimBilgisi" placeholder="İletişim bilgilerini giriniz" v-model="okul.OkulIletisim" required />
            </div>
            <div class="form-group">
                <label for="okulTuru">Okul Türü:</label>
                <input type="text" id="okulTuru" name="okulTuru" placeholder="Okul türünü girin" v-model="okul.OkulTuru" required />
            </div>
            <div class="form-group">
                <label for="okulAdres">Okul Adresi:</label>
                <input type="text" id="okulAdres" name="okulAdres" placeholder="Okul adresini girin" v-model="okul.OkulAdres" required />
            </div>
            <button type="submit">Yeni okul ekle</button>
        </form>
    </div>
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import axios from 'axios';

export default {
    name: 'AddSchool',
    components: {
        HeaderPage
    },
    data() {
        return {
            name: '',
            okul: {
                OkulAdi: '',
                UserId: '',
                OkulIletisim: '',
                OkulTuru: '',
                OkulAdres: ''
            },
            mudur: [],
        }
    },
    methods: {
        async okulEkle() {
            try {
                const result = await axios.post("http://localhost:5215/api/Okuls/add-school/" + this.okul.UserId, this.okul);
                if (result.status === 201) {
                    this.$router.push({ name: 'HomePage' });
                }
                console.warn("result", result);
            } catch (error) {
                console.error('Error during school registration:', error);
            }
        }
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
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
}
</script>

<style scoped>
.add-school-page {
    text-align: center;
    margin: 20px;
}

.add-school-form {
    max-width: 400px;
    margin: auto;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 16px;
}

label {
    display: block;
    margin-bottom: 8px;
}

input, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
