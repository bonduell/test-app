<template>
	<!--<custom-transition :reverse="reverse"> -->
	<virtual-scroll
		:items="items"
		item-height="324"
		bench="2"
		:input="substring"
		progress
		v-on:progress="e => $emit('progress', e)"
	>
		<template v-slot="{ item, index }">
			<v-hover v-slot:default="{ hover }" :key="index" open-delay="300" close-delay="200">
				<v-card :ripple="false"
						class="mx-12 my-6"
						:elevation="hover ? 12 : 0"
						height="300"
						style="transition: all ease-out 0.3s"
						min-width="300"
				>
					<v-divider/>

					<v-row no-gutters align="center" class="flex-nowrap pr-3">
						<v-card-title v-html="getItemName(item.name)"/>
						<v-spacer/>
						<v-btn icon @click.stop="handleChangeState(item)">
							<v-icon color="yellow darken-3">
								{{item.state.value === 'favourites' ? 'mdi-star' : 'mdi-star-outline'}}
							</v-icon>
						</v-btn>
					</v-row>

					<v-divider/>

					<v-row no-gutters class="flex-nowrap pr-1 mt-n1">
						<v-col class="shrink row no-gutters align-center justify-center flex-nowrap">
							<v-avatar
								@click.prevent="handleChangeState(item)"
								size="120"
								class="ml-6"
								style="background-color: orange; cursor: pointer"
							>
								<span class="display-1 font-weight-bold text--white"
									  v-text="item.firstname.split('')[0] + item.lastname.split('')[0]"
								/>
							</v-avatar>
						</v-col>

						<v-col class="grow">
							<v-list-item v-for="(subItem, idx) in item.items" :key="'sub' + idx">
								<v-list-item-content>
									<v-list-item-title class="row no-gutters justify-end">
										<span v-html="getItemName(subItem.name)"/>
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-col>
					</v-row>
				</v-card>

			</v-hover>
		</template>
	</virtual-scroll>
	<!--</custom-transition> -->
</template>

<script>

import CustomTransition from "./transition";
import VirtualScroll from "@/components/vScroll/virtualScroll"

export default {
	name: "listView.vue",

	components:{
		CustomTransition,
		VirtualScroll,
	},

	props: {
		items		: Array,
		reverse 	: Boolean,
		substring	: {
			type	: String,
			default : '',
		}
	},

	data: () => ({
		names	: {},
	}),

	watch :{
		items : function(){
			this.$nextTick(() => this.highlightSubstrings(this.substring));
		},
	},

	methods:{
		handleChangeState(item){
			item.state.value = item.state.value === 'common' ? 'favourites' : 'common'
		},

		async highlightSubstrings(subString){
			this.names = {};
			if (subString === '') { return }

			const regExp = new RegExp(subString, 'gi');

			const doReplace = (name) => {
				if (!this.names[name]) {
					this.names[name] = name.replaceAll(regExp, `<u class="red--text">$&</u>`);
				}
			}

			this.items.forEach(item => {
				doReplace(item.name);
				item.items && item.items.forEach(subItem => doReplace(subItem.name));
			})
		},

		getItemName(name){
			return this.names[name] || name;
		}
	}

}
</script>

<style scoped>
</style>
