<template>
	<v-app id="app">

		<custom-toolbar title="Test App" app v-if="bottom || $route.name==='Home'" key="toolbar"/>

		<v-main>
			<router-view/>
		</v-main>

	</v-app>
</template>

<script>
import Vue from 'vue';
import CustomToolbar from './components/dashboard/customToolbar'
import { mapState } from "vuex";

export default Vue.extend({
	name: 'App',

	components: {
		CustomToolbar,
	},

	computed:{
		...mapState({
			bottom	: 'bottom',
			layout	: 'layout',
		}),
	},

	methods:{
		setMode(e){
			this.$vuetify.theme.dark = e.matches;
		},
	},

	created() {
		this.setMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

		try { //all browsers
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.addEventListener('change', this.setMode);
		} catch (err) {
			try { //if safari
				window
					.matchMedia('(prefers-color-scheme: dark)')
					.addListener(this.setMode);
			}
			catch (err){
				console.warn(err)
			}
		}
	}
});

</script>

<style>
	html {
	 overflow: hidden;
	}
</style>
