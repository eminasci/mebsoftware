<!-- <template>
    <HeaderPage/>
    <h1>Hello {{ name }}, Welcome on Update Scholl</h1>
    <form class="add_scholl">
        <input type="text" name="okuladi" placeholder="Okul adını girin:" v-model="okul.okuladi"/>
        <select v-model="okul.mudur">
        <option disabled >Please select option</option>
        <option v-for="item in mudur" :key="item.id" >

        {{ item.name }}
         </option>
  </select>
        <input type="text" name="iletisim_bilgisi" placeholder="İletişim bilgilerini giriniz:" v-model="okul.iletisim_bilgisi"/>
        <input type="text" name="adres" placeholder="Okul adresini girin:" v-model="okul.adres"/>
        <button type="button" v-on:click="okulGuncelle">Okulu Güncelle</button>
    </form> 
    
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import axios from 'axios';
export default{
    name:'UpdateScholl',
    components:{
        HeaderPage
    },
    data()
    {
        return{
            name:'',
            okul:
            {
                okuladi:'',
                mudur:'',
                iletisim_bilgisi:'',
                adres:'',

            },
            mudur:[],
        }

    },
    methods: {
        async okulGuncelle()
        {
            const result = axios.put("http://localhost:3000/okul/"+this.$route.params.id,{
                okuladi: this.okul.okuladi,
                mudur:this.okul.mudur,
                iletisim_bilgisi:this.okul.iletisim_bilgisi,
                adres:this.okul.adres
            });
            if ((await result).status==200) {

                this.$router.push({name:'HomePage'})
            }
            console.warn("result",result)

        }

    },
   async mounted()
    {   
        const mudurResult = await axios.get('http://localhost:3000/user')   
        this.mudur =mudurResult.data
        let user= localStorage.getItem('user-info');
        this.name= JSON.parse(user).name;
        if (!user) {
            this.$router.push({name:'SignUp'})
        }
       
        const result = await axios.get('http://localhost:3000/okul/'+this.$route.params.id)
        this.okul=result.data
    }
}
</script> -->
<template>
    <div>
      <HeaderPage />
      <div class="update-scholl-container">
        <h1>Hello {{ name }}, Welcome to Update School</h1>
        <form class="update-school-form">
          <label for="okuladi">Okul Adı:</label>
          <input type="text" name="okuladi" v-model="okul.okuladi" placeholder="Okul adını girin" />
  
          <label for="mudur">Müdür:</label>
          <select v-model="okul.mudur">
            <option disabled>Seçenek seçiniz</option>
            <option v-for="item in mudur" :key="item.id">{{ item.name }}</option>
          </select>
  
          <label for="iletisim_bilgisi">İletişim Bilgisi:</label>
          <input type="text" name="iletisim_bilgisi" v-model="okul.iletisim_bilgisi" placeholder="İletişim bilgilerini giriniz" />
  
          <label for="adres">Okul Adresi:</label>
          <input type="text" name="adres" v-model="okul.adres" placeholder="Okul adresini girin" />
  
          <button type="button" v-on:click="okulGuncelle">Okulu Güncelle</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import HeaderPage from './HeaderPage.vue'
  import axios from 'axios';
  
  export default {
    name: 'UpdateScholl',
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
      };
    },
    methods: {
      async okulGuncelle() {
        const result = await axios.put(`http://localhost:3000/okul/${this.$route.params.id}`, {
          okuladi: this.okul.okuladi,
          mudur: this.okul.mudur,
          iletisim_bilgisi: this.okul.iletisim_bilgisi,
          adres: this.okul.adres
        });
  
        if (result.status === 200) {
          this.$router.push({ name: 'HomePage' });
        }
  
        console.warn('result', result);
      },
    },
    async mounted() {
      const mudurResult = await axios.get('http://localhost:3000/user');
      this.mudur = mudurResult.data;
  
      let user = localStorage.getItem('user-info');
      this.name = JSON.parse(user).name;
  
      if (!user) {
        this.$router.push({ name: 'SignUp' });
      }
  
      const result = await axios.get(`http://localhost:3000/okul/${this.$route.params.id}`);
      this.okul = result.data;
    },
  };
  </script>
  
  <style scoped>
    .update-scholl-container {
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
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #45a049;
    }
  </style>
  