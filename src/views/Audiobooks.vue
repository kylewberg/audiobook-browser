<template>
    <div>
        <section>
            <div>
                <router-link to="/" class="hover:text-green-500">Home</router-link>  
                <span class="text-green-500"> &raquo; </span>
            </div>            
            <h1 class="text-5xl font-bold mt-4">Audiobooks</h1>
        </section>
        <section class="flex justify-end py-2">
            <form v-on:submit.prevent="search" class="flex items-center">
                <button v-if="searchTerm" @click="clearSearch" type="button" class="p-2"><span class="text-gray-600 font-bold" title="Clear Search">&times;</span> <span class="sr-only">Clear Search</span></button>            
                <label for="search-term" class="sr-only">Search Term</label>
                <input id="search-term" v-model.lazy="searchTerm" type="text" class="p-1 border border-gray-200 text-sm" placeholder="title...">
                <button class="p-2 text-sm font-bold text-blue-900 hover:underline" type="submit">Search</button>
            </form>
        </section> 
        <section v-if="audiobooks.length > 0" class="overflow-x-auto border border-gray-200">        
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author(s)
                        </th>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                        </th>
                        <th scope="col" class="relative px-4 py-3">
                            <span class="sr-only">Download</span>
                        </th>                        
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="audiobook in audiobooks" :key="audiobook.id" class="hover:bg-gray-50">
                        <td class="px-4 py-2 whitespace-nowrap text-gray-900">
                            <router-link :to="{ name: 'audiobook', params: { id: audiobook.id }}" :title="audiobook.title" class="inline-block truncate leading-tight text-blue-900 font-bold hover:underline" style="max-width:40ch;">
                                {{ audiobook.title }}
                            </router-link>                            
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            <span v-if="audiobook.authors">
                                <span v-for="(author, index) in audiobook.authors" :key="author.id"><span v-if="index !== 0">, </span>{{ author.first_name + ' ' + author.last_name }}</span>
                            </span>
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            <span v-if="audiobook.copyright_year !== '0'">{{ audiobook.copyright_year }}</span>
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-right">
                            <a v-if="audiobook.url_zip_file" :href="audiobook.url_zip_file" class="text-sm font-bold text-blue-900 hover:underline" target="_blank">Download</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>  
        <section v-if="audiobooks" class="flex justify-between mt-4 p-2">
            <div>
                <button v-if="offset >= this.limit" @click="getPrevPage" class="text-blue-900 font-bold text-sm hover:underline">Previous</button>
            </div>
            <div>
                <button v-if="audiobooks.length >= this.limit" @click="getNextPage" class="text-blue-900 font-bold text-sm hover:underline">Next</button>
            </div>
        </section>      
        <section v-if="loading">
            <p class="text-xl">Loading...</p>    
        </section>   
    </div>
</template>

<script>
import API from '../api';

export default {
  name: 'Audiobooks',
  data() {
        return {
            'audiobooks': [],
            'offset': 0,
            'limit': 10,
            'searchTerm': '',
            'loading': false
        }
  },
  methods: {
        getAudiobooks() {
            this.audiobooks = [];
            this.loading = true;
            API.getAudiobooks(this.offset, this.limit, this.searchTerm)
                .then(response => {
                    this.loading = false;
                    if(response.data.error) {
                        alert(response.data.error);
                    } else {
                        this.audiobooks = response.data.books;
                    }
                })               
                .catch(e => {
                    console.error(e);
                });
        },              
        getNextPage() {
            this.offset += this.limit;
            this.getAudiobooks();
        },
        getPrevPage() {
            this.offset -= this.limit;
            this.getAudiobooks();
        },
        search() {
            this.getAudiobooks();
        },
        clearSearch() {
            this.searchTerm = '';
            this.offset = 0;
            this.getAudiobooks();
        }            
  },
  created() {
      this.getAudiobooks();
  }  
}
</script>
