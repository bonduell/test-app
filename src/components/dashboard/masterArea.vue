<template>
	<div class="fill-height">
		<custom-toolbar title="Common" :app="!$store.state.bottom" key="toolbar">
			<template v-slot:search>
				<v-row no-gutters align="center" style="flex-wrap: nowrap">
					<v-text-field v-model="input"
								  flat
								  outlined
								  rounded
								  dense
								  label="Search..." append-icon="mdi-magnify"
								  hide-details
					/>
					<v-btn icon @click.stop="state.sortByAsc = !state.sortByAsc" class="ml-6">
						<v-icon :color="state.sortByAsc ? 'primary' : ''" small>mdi-sort</v-icon>
					</v-btn>
				</v-row>
				<v-progress-linear :value="progress" absolute height="2"
								   style="top:63px; left: 0"
				/>
			</template>
		</custom-toolbar>
		<v-divider/>

		<v-card flat :style="$store.state.bottom ? 'height: calc(100% - 65px)' : 'height: calc(100vh - 65px)'">
			<list-view :items="masterList" reverse :substring="input" v-on:progress="e => progress = e"/>
		</v-card>
	</div>
</template>

<script>

import ListView from "./elements/listView";
import CustomToolbar from "./customToolbar";
import { reactive, ref } from "@vue/composition-api";
import { sortByAsc, sortByDesc } from "@/features/sorters";
import { filterByMatches, filterByFieldValue } from "@/features/filters";
import useCustomHandlers from "../../features/useCustomHandlers";

export default {
	name: "masterArea.vue",

	components: {
		ListView,
		CustomToolbar,
	},

	setup(props, { root }) {
		const state = reactive({ sortByAsc : false, });
		const progress = ref(0);
		const { input, masterList } = useCustomHandlers(root.$store.getters.getUserList, () => computedHandlers()),

		/**
		 *  здесь можно менять обработчики динамически в зависимости от
		 *  выбранного пользователем режима. На примере sortByAsc/sortByDesc
		 **/
		computedHandlers = () => [
				(arr) => filterByFieldValue(arr, 'state', 'common'),
				(arr, counters, input) => filterByMatches(arr, counters, input),
				(arr, counters) => state.sortByAsc ? sortByAsc(arr, counters) : sortByDesc(arr, counters),
			];

		return { input, masterList, state, progress };
	},
}

</script>
