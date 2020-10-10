<template>
    <v-fab-transition>
        <v-btn fab class="mb-6"
			   color="secondary"
			   v-show="fab"
               @click="toTop"
			   style="position: sticky; top: calc(100% - 64px); left: calc(100% - 64px)"
        >
            <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>

export default {
    name: "AppFab",

	props:{
    	top 	: Number | String,
		action	: Function,
	},

	computed:{
    	fab(){
    		return this.top > 300;
		}
	},

    methods: {
        toTop() {
            this.action && this.action();
        }
    },

}
</script>
