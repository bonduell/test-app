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
});

</script>

