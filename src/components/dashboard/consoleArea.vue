<template>
	<div style="overflow: hidden; height: 100%">
		<v-toolbar flat>
			<v-tabs>
				<v-tab v-for="(tab, idx) in tabs"
					   :key="idx"
					   text
					   rounded
					   :to="tab.route"
				>
					{{tab.title}}
				</v-tab>
			</v-tabs>

		</v-toolbar>

		<v-divider/>

		<v-card style="overflow-y: auto; height: calc(100% - 64px)">
			<history-view :items="items"/>
		</v-card>
	</div>
</template>

<script>

import HistoryView from "./elements/historyView"

export default {
	name: "consoleArea.vue",

	props: {
		id : String,
	},

	components:{
		HistoryView,
	},

	computed: {
		items : function(){
			return this.getHistory(this.id);
		}

	},

	data: () => ({
		tabs	: [
			{
				title	: 'вся история',
				route	: '/history/all',
			},
			{
				title	: 'Добавления',
				route	: '/history/add',
			},
			{
				title	: 'Удаления',
				route	: '/history/remove',
			},
		],
	}),

	methods: {

		getHistory(id){
			let users = this.$store.getters.getUserList;
			return users
				.reduce((acc, current) => {
					let history = current.history;

					if(id === 'add'){
						history = history.filter(item => item.state === 'favourites')
					} else if (id === 'remove'){
						history = history.filter(item => item.state === 'common')
					}

					return acc.concat(history)
				}, [])
				.sort((a, b) => a.timestamp - b.timestamp);
		}

	},
}

</script>

<style scoped>

</style>
