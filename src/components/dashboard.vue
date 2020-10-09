<template>
	<dashboard-layout>
		<template v-slot:master>
			<master-area/>
		</template>

		<template v-slot:slave>
			<slave-area/>
		</template>

		<template v-slot:console>
			<router-view/>
		</template>

	</dashboard-layout>
</template>

<script>

import MasterArea from "./dashboard/masterArea";
import SlaveArea from "./dashboard/slaveArea";
import ConsoleArea from "@/components/dashboard/consoleArea";
import DashboardLayout from "../layouts/dashboardLayout";

export default {
	name: "dashboard.vue",

	components: {
		MasterArea,
		SlaveArea,
		ConsoleArea,
		DashboardLayout,
	},

	created() {
		this.$store.dispatch('fetchUsersData');
	},
}
</script>

<style scoped>

</style>
