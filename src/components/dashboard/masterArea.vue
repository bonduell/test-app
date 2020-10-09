<template>
	<div style="overflow: hidden; height: 100%">
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
			</template>
		</custom-toolbar>
		<v-divider/>

		<v-card flat style="overflow: hidden;" :style="$store.state.bottom ? 'height: calc(100% - 64px)' : 'height: calc(100vh - 64px)'">
			<list-view :items="masterList" reverse :substring="input"/>
		</v-card>
	</div>
</template>

<script>

import ListView from "./elements/listView";
import CustomToolbar from "./customToolbar";
import { reactive } from "@vue/composition-api";
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

		return { input, masterList, state };
	},

}

</script>
