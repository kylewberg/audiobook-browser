<template>
    <div id="app" class="flex flex-col min-h-screen text-gray-800">
        <header class="flex-none bg-blue-900 text-white px-8 py-2">
            <div class="container mx-auto">
                <div class="flex justify-between items-center ">
                    <router-link to="/" class="text-lg font-bold"><i class="fas fa-headphones text-green-300"></i> Audiobook Browser</router-link>    
                    <nav class="text-sm font-bold">
                        <ul class="flex">
                            <li class="px-1"><router-link to="/audiobooks" class="hover:underline">Audiobooks</router-link></li>
                        </ul>
                    </nav>  
                </div>
            </div>      
        </header>
        <main class="flex-grow pt-4 pb-8 px-8">
            <div class="container mx-auto">
                <router-view/>         
            </div>
        </main>
        <footer class="flex-none py-2 px-8">
            <div class="container mx-auto">
                <div class="flex justify-between p-2 text-sm text-gray-600 border-t">
                    <span>&copy; 2021 <a href="https://www.kylewberg.com/" target="_blank">Kyle Berg</a></span>
                    <nav>
                        <ul class="flex">
                            <li class="px-1"><router-link to="/about">About</router-link></li>
                        </ul>
                    </nav>                
                </div>  
            </div>          
        </footer>
    </div>  
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
