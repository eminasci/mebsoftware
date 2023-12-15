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
    <HeaderPage/>
    <div class="admin-welcome">
        <h1>Merhaba {{ name }}, Admin sayfasına hoşgeldiniz</h1>
        <table class="school-table" :border='1'>
            <tr>
                <th>ID</th>
                <th>OKUL ADI</th>
                <th>MÜDÜR ADI</th>
                <th>İLETİŞİM BİLGİLERİ</th>
                <th>OKUL ADRESİ</th>
                <th class="action-column">GÜNCELLE</th>
                <th class="action-column">SİL</th>
            </tr>
            <tr v-for="item in okul" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.okuladi }}</td>
                <td>{{ item.mudur }}</td>
                <td>{{ item.iletisim_bilgisi}}</td>
                <td>{{ item.adres}}</td>
                <td class="action-column"><router-link :to="'/update-scholl/'+item.id">GÜNCELLE</router-link></td>
                <td class="action-column"><button v-on:click="okulSil(item.id)">OKULU SİL</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import axios from 'axios';

export default {
    name: 'HomePage',
    data() {
        return {
            name: '',
            okul: [],
        }
    },
    components: {
        HeaderPage
    },
    methods: {
        async okulSil(id) {
            let result = await axios.delete("http://localhost:3000/okul/" + id);
            console.warn(result)
            if (result.status == 200) {
                this.listeyiYukle()
            }
        },
        async listeyiYukle() {
            let user = localStorage.getItem('user-info');
            this.name = JSON.parse(user).name;
            if (!user) {
                this.$router.push({ name: 'SignUp' })
            }
            let result = await axios.get("http://localhost:3000/okul");
            console.warn(result)
            this.okul = result.data;
        }
    },
    async mounted() {
        this.listeyiYukle()
    }
}
</script>

<style scoped>
.admin-welcome {
    text-align: center;
    margin: 20px;
}

.school-table {
    width: 100%;
    border-collapse: collapse;
}

.school-table th, .school-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

.school-table th {
    background-color: #f2f2f2;
}

.action-column {
    width: 100px;
    text-align: center;
}

.action-column a, .action-column button {
    padding: 8px;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-weight: bold;
}

.action-column a {
    background-color: #3498db;
}

.action-column button {
    background-color: #e74c3c;
}

.action-column a:hover, .action-column button:hover {
    opacity: 0.8;
}
</style>
