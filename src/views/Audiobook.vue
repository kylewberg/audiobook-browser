<template>
    <div v-if="audiobook">
        <div>
            <div>
                <router-link to="/" class="hover:text-green-500"
                    >Home</router-link
                >
                <span class="text-green-500"> &raquo; </span>
                <router-link to="/audiobooks" class="hover:text-green-500"
                    >Audiobooks</router-link
                >
                <span class="text-green-500"> &raquo; </span>
            </div>
            <h1 class="text-5xl font-bold mt-4" style="max-width: 20ch">
                {{ audiobook.title }}
            </h1>
            <div v-if="audiobook.authors" class="mt-2 text-gray-700 text-lg">
                by
                <span
                    v-for="(author, index) in audiobook.authors"
                    :key="author.id"
                    ><span v-if="index !== 0">, </span
                    >{{ author.first_name + " " + author.last_name }}</span
                >
            </div>
        </div>
        <div class="flex flex-wrap mt-8">
            <div class="w-full pb-8 lg:w-4/5 lg:pr-8 lg:pb-0">
                <div v-if="audiobook.description">
                    <h2 class="text-2xl font-bold">Description</h2>
                    <div
                        v-html="audiobook.description"
                        :class="{ 'h-24': descriptionCollapsed }"
                        class="max-w-prose overflow-hidden mt-4"
                    ></div>
                    <button
                        @click="toggleDescription"
                        class="mt-2 font-bold text-blue-900 hover:underline"
                    >
                        {{ descriptionCollapsed ? "Read More" : "Read Less" }}
                    </button>
                </div>
                <div v-if="audiobook.sections" class="mt-8">
                    <h2 class="text-2xl font-bold">Audio Tracks</h2>
                    <div class="overflow-x-auto border border-gray-200 mt-4">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="relative px-4 py-3">
                                        <span class="sr-only">Number</span>
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Length
                                    </th>
                                    <th scope="col" class="relative px-4 py-3">
                                        <span class="sr-only">Listen</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="track in audiobook.sections"
                                    :key="track.id"
                                    class="hover:bg-gray-50"
                                >
                                    <td
                                        class="px-4 py-2 whitespace-nowrap text-gray-900"
                                    >
                                        {{ track.section_number }}
                                    </td>
                                    <td
                                        class="px-4 py-2 whitespace-nowrap text-gray-900"
                                    >
                                        <span
                                            :title="track.title"
                                            class="inline-block truncate leading-tight"
                                            style="max-width: 60ch"
                                            >{{ track.title }}</span
                                        >
                                    </td>
                                    <td
                                        class="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-500 font-mono"
                                    >
                                        {{ track.playtime | formatTime }}
                                    </td>
                                    <td
                                        class="px-4 py-2 whitespace-nowrap text-right text-sm font-medium"
                                    >
                                        <a
                                            v-if="track.listen_url"
                                            :href="track.listen_url"
                                            class="text-sm font-bold text-blue-900 hover:underline"
                                            target="_blank"
                                            >Listen</a
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-1/5">
                <div class="p-2 rounded border border-gray-200 bg-gray-50">
                    <table>
                        <tbody>
                            <tr v-if="audiobook.copyright_year !== '0'">
                                <td class="p-1"><strong>Year</strong></td>
                                <td class="p-1">
                                    {{ audiobook.copyright_year }}
                                </td>
                            </tr>
                            <tr v-if="audiobook.language">
                                <td class="p-1"><strong>Language</strong></td>
                                <td class="p-1">{{ audiobook.language }}</td>
                            </tr>
                            <tr v-if="audiobook.totaltime">
                                <td class="p-1"><strong>Length</strong></td>
                                <td class="p-1">{{ audiobook.totaltime }}</td>
                            </tr>
                            <tr v-if="audiobook.genres">
                                <td class="p-1 align-top">
                                    <strong>Genres</strong>
                                </td>
                                <td class="p-1 align-top">
                                    <span
                                        v-for="genre in audiobook.genres"
                                        :key="genre.id"
                                        >{{ genre.name }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-4">
                    <div v-if="audiobook.url_zip_file" class="mb-2">
                        <a
                            :href="audiobook.url_zip_file"
                            class="text-blue-900 font-bold hover:underline"
                            target="_blank"
                            >Download All Files</a
                        >
                    </div>
                    <div v-if="audiobook.url_librivox" class="mb-2">
                        <a
                            :href="audiobook.url_librivox"
                            class="text-blue-900 font-bold hover:underline"
                            target="_blank"
                            >View on Librivox.org</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from "../api";

export default {
    name: "Audiobook",
    data() {
        return {
            audiobook: null,
            descriptionCollapsed: true,
        };
    },
    methods: {
        toggleDescription() {
            this.descriptionCollapsed = !this.descriptionCollapsed;
        },
    },
    filters: {
        formatTime: function (time) {
            time = Number(time);
            const h = Math.floor(time / 3600);
            const m = Math.floor(time % 3600 / 60);
            const s = Math.floor(time % 3600 % 60);
            const segments = [
                (h > 0) ? ((h < 10) ? '0'+h : h) : '00',
                (m > 0) ? ((m < 10) ? '0'+m : m) : '00',
                (s > 0) ? ((s < 10) ? '0'+s : s) : '00'
            ];

            return segments.join(':'); 
        },
    },
    created() {
        API.getAudiobook(this.$route.params.id)
            .then((response) => {
                this.audiobook = response.data.books[0];
            })
            .catch((e) => {
                console.error(e);
            });
    },
};
</script>
