<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col cols="12" class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Test App
        </h1>

        <p class="subheading font-weight-regular">
          Тест написан на коленке, строго не судить!
          <br>по ссылке можно прочитать
          <a @click="$router.push('/about')">Readme</a>
        </p>
      </v-col>

	  <v-col cols="12" class="mb-4">
		  <v-btn large @click.stop="handleFetchAndGo" :loading="loading">
			  {{loaded ? 'Fetched. just go' : 'fetch data & go'}}
		  </v-btn>
	  </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          What's next?
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script lang="ts">

import Vue from 'vue';
import { mapState } from "vuex";

export default Vue.extend({
    name: 'HelloWorld',

	computed: {
    	...mapState({
			'loading'	: 'loading',
			'loaded'	: 'loaded',
		})
	},

    data: () => ({
      whatsNext: [
        {
          text: 'Hire Me As Developer',
          href: 'mailto://bonduell2015@gmail.com',
        },
      ],
    }),

	methods:{
    	handleFetchAndGo() : void {
    		this.$store.dispatch('fetchUsersData')
				.then(() => this.$router.push('/history/all'))
				.catch(err => alert (err));
		}
	},

  })
</script>
