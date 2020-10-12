<template>
	<v-app-bar :app="app"
			   height="64"
			   :elevation="app ? '1' : '0'"
			   :clipped-left="layout === 'left-layout'"
			   :clipped-right="layout !== 'left-layout'"
	>
		<v-app-bar-nav-icon @click.stop="" v-if="app" :disabled="true"/>

		<v-toolbar-title>{{title}}</v-toolbar-title>

		<v-spacer/>

		<slot name="search"/>

		<v-spacer v-if="app"/>

		<v-row no-gutters justify="end" v-if="app">
			<v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
				<v-icon :color="$vuetify.theme.dark ? 'primary' : ''" small>mdi-theme-light-dark</v-icon>
			</v-btn>

			<v-btn icon @click="layout = 'left-layout'" :disabled="$route.name!=='History'">
				<v-icon :color="layout === 'left-layout' ? 'primary' : ''" small>mdi-format-align-left</v-icon>
			</v-btn>

			<v-btn icon @click="layout = 'right-layout'" :disabled="$route.name!=='History'">
				<v-icon :color="layout === 'right-layout' ? 'primary' : ''" small>mdi-format-align-right</v-icon>
			</v-btn>

			<v-btn icon @click="bottom = !bottom" :disabled="$route.name!=='History'">
				<v-icon :color="bottom ? 'primary' : ''" small>mdi-format-align-bottom</v-icon>
			</v-btn>
		</v-row>
	</v-app-bar>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from "vuex";

export default Vue.extend({
	name: "customToolbar.vue",

	props: {
		title	: {
			type	: String,
			default	: '',
		},

		app		: {
			type	: Boolean,
			default	: false,
		},

	},

	computed: {
		...mapState({
			getLayout	: state => state.layout,
			getBottom	: state => state.bottom,
		}),

		layout: {
			get() { return this.getLayout },
			set(val) { this.setLayout(val) },
		},

		bottom: {
			get() { return this.getBottom },
			set(val) { this.setBottom(val) },
		},
	},

	watch: {
		"$vuetify.theme.dark" : function (val) {
			this.setScrollbarTheme(val)
		},
	},

	mounted() {
		document.documentElement.classList.add('scrollbar')
		this.setScrollbarTheme(this.$vuetify.theme.dark);
	},

	methods: {
		...mapActions({
			setLayout : 'setLayout',
			setBottom : 'setBottomLayout',
		}),

		setScrollbarTheme(val){
			if (val){
				document.documentElement.classList.add('scrollbar--dark')
			} else {
				document.documentElement.classList.remove('scrollbar--dark');
			}
		}
	},
});

</script>


<style lang="sass">

.scrollbar
	::-webkit-scrollbar
		width: 8px
		height: 3px
	::-webkit-scrollbar-button
		background-color: #f7f7f7
	::-webkit-scrollbar-track
		background-color: #f7f7f7
	::-webkit-scrollbar-track-piece
		background-color: white
	::-webkit-scrollbar-thumb
		height: 50px
		background-color: lightgrey
		border-radius: 3px
	::-webkit-scrollbar-corner
		background-color: #f7f7f7
	::-webkit-resizer
		background-color: #f7f7f7

	&--dark
		::-webkit-scrollbar-button
			background-color: #666
		::-webkit-scrollbar-track
			background-color: #646464
		::-webkit-scrollbar-track-piece
			background-color: #1E1E1E
		::-webkit-scrollbar-thumb
			height: 50px
			background-color: #666
			border-radius: 3px
		::-webkit-scrollbar-corner
			background-color: #646464
		::-webkit-resizer
			background-color: #666

</style>
