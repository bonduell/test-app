<template>
	<div class="fill-height">
		<v-toolbar flat align="center">
			<v-toolbar-title>Favourites</v-toolbar-title>
			<v-spacer/>
			<v-text-field v-model="input"
						  flat
						  outlined
						  rounded
						  dense
						  label="Search..." append-icon="mdi-magnify"
						  hide-details
			/>
			<v-progress-linear :value="progress" absolute height="3"
							   style="top:62px; left: 0"
			/>

		</v-toolbar>

		<v-divider/>

		<v-card flat style="height: calc(100% - 65px)">
			<list-view v-on:progress="e => progress = e"
				:substring="input"
				:items="items 	| filterByFieldValue('state', 'favourites')
								| filterByMatches(counters, input)"
			/>
		</v-card>

	</div>
</template>

<script>

import ListView from "@/components/dashboard/elements/listView";
import { filterByFieldValue, filterByMatches } from "@/features/filters";

export default {
	name: "slaveArea.vue",

	components: {
		ListView,
	},

	filters: {
		filterByMatches,
		filterByFieldValue,
	},

	computed: {
		items () {
			return this.$store.getters.getUserList;
		},
	},

	data: () => ({
		input		: '',
		counters	: new Map(),
		progress	: 0,
	})
}

</script>

<style scoped>
</style>
