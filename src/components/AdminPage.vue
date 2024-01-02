<!-- <template>
    <HeaderPage/>
    <h1>Merhaba {{ name }}, Admin sayfasına hoşgeldiniz</h1>
    <table :border='1'>
    <tr>
        <td>ID</td>
        <td>OKUL ADI</td>
        <td>MÜDÜR ADI</td>
        <td>İLETİŞİM BİLGİLERİ</td>
        <td>OKUL ADRESİ</td>
        <td>GÜNCELLE</td>
        <td>SİL</td>
        
        
    </tr>
    <tr v-for="item in okul" :key="item.id">
    <td>{{ item.id }}</td>
    <td>{{ item.okuladi }}</td>
    <td>{{ item.mudur }}</td>
    <td>{{ item.iletisim_bilgisi}}</td>
    <td>{{ item.adres}}</td>
    <td><router-link :to="'/update-scholl/'+item.id">GÜNCELLE</router-link></td>
    <td>  <button v-on:click="okulSil(item.id)">OKULU SİL</button></td>
    </tr>
    </table>
   
    
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import axios from 'axios';
export default{
    name:'HomePage',
    data(){
        return{
            name:'',
            okul:[],
        }
    },
    components:{
    
        HeaderPage
    },
    methods:{
       async okulSil(id)
        {
            let result = await axios.delete("http://localhost:3000/okul/"+id);
            console.warn(result)
            if(result.status==200)
            {
                this.listeyiYukle()
            }
          
            
        },
        async listeyiYukle()
        {
                let user= localStorage.getItem('user-info');
        this.name= JSON.parse(user).name;
        if (!user) 
        {
            this.$router.push({name:'SignUp'})
        }
        let result =await axios.get("http://localhost:3000/okul");
        console.warn(result)
        this.okul=result.data;
        }
    },
  async mounted()
    {
       this.listeyiYukle()
    }
}
</script>
<style>
td{
    width:300px ;
    height: 40px;
    
}
table{
   
    margin-top: 20px;
}
</style> -->
<template>
    <div>
     <HeaderTwo />
      <div class="school-details">
        <h1>{{ okul.okuladi }} Okulu Detayları</h1>
        <div class="school-info">
          <p><strong>Müdür:</strong> {{ okul.mudur }}</p>
          <p><strong>İletişim Bilgisi:</strong> {{ okul.iletisim_bilgisi }}</p>
          <p><strong>Adres:</strong> {{ okul.adres }}</p>
        </div>
  
        <h2>Öğrenciler</h2>
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
            <tr v-for="ogrenci in okul.ogrenciler" :key="ogrenci.id" :class="{ 'high-devamsizlik': ogrenci.devamsızlık >= 3 }">
              <td>{{ ogrenci.id }}</td>
             <td>{{ ogrenci.ad }}</td>
              <td>{{ ogrenci.tc }}</td>
              <td>{{ ogrenci.sınıf }}</td>
              <td>{{ ogrenci.devamsızlık }}</td>
              <td>{{ ogrenci.iletisim_bilgisi }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <FooterTwo />
  </template>
  
  <script>
  
  import axios from 'axios';
  import HeaderTwo from './HeaderTwo.vue';
  import FooterTwo from './FooterTwo.vue'
  
  export default {
    name: 'SchoolDetails',
    components: {
      HeaderTwo,
      FooterTwo
    },
    data() {
      return {
        okul: {},
      };
    },
    async mounted() {
      const okulId = this.$route.params.id;
      const response = await axios.get(`http://localhost:3000/okul/${okulId}`);
      this.okul = response.data;
      const storedUser = JSON.parse(localStorage.getItem('user-info'));
      console.log(storedUser)


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
  </style>
  