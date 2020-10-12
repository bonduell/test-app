<template>
	<section>
		<v-list-item v-for="(item, idx) in items"
					 :key="idx"
					 :color="item.state==='common' ? 'red lighten-2' : 'green lighten-2'"
					 :input-value="true"
		>
			<v-list-item-content>
				<v-list-item-title>
					<span>{{`${item.id}: ${item.name}`}}</span>
				</v-list-item-title>
				<v-list-item-subtitle>
					<span>{{`${item.state === 'common' ? 'Удалено' : 'Добавлено'}`}}</span>
				</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<span>{{getDateString(item.timestamp)}}</span>
			</v-list-item-action>
		</v-list-item>
	</section>
</template>

<script>
export default {
	name: "history-view.vue",
	props: {
		items: Array,
	},

	methods:{
		getDateString(value){
			const time = new Date(value);
			return `${time.getHours()}h : ${time.getMinutes()}m : ${time.getSeconds()}s`;
		}
	}
}
</script>

<style scoped>

</style>
