<template>
	<v-scroll-x-reverse-transition
		group
		hide-on-leave
		style="width: 100%"
		v-if="reversedTransition"
	>
		<slot/>
	</v-scroll-x-reverse-transition>

	<v-scroll-x-transition
		group
		hide-on-leave
		style="width: 100%"
		v-else
	>
		<slot/>
	</v-scroll-x-transition>
</template>

<script>

import { mapState } from "vuex";

export default {
	name: "transition.vue",

	props:{
		reverse : Boolean,
	},

	computed:{
		...mapState({
			layout	: state => state.layout,
		}),

		reversedTransition (){
			return this.layout==='left-layout' ? this.reverse : !this.reverse;
		},
	}
}
</script>

<style scoped>

</style>
