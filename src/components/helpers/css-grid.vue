<template>
    <div class="grid" :style="style"
		 @mousemove	= "e => $emit('mousemove', e)"
		 @mouseleave= "e => $emit('mouseleave', e)"
		 @mouseup	= "e => $emit('mouseup', e)"
	>
        <slot/>
    </div>
</template>

<script>

export default {

    name: "css-grid",

    props: {
        gridAreas   : {
            type    : String,
            default : "",
        },

        gridColumns : {
            type    : String,
            default : "",
        },

        gridRows    : {
            type    : String,
            default : "",
        },

        gridGap     : {
            type    : String,
            default : "",
        },

        fullSize   : {
            type    : Boolean,
            default : false,
        },

		height		: {
        	type	: String,
			default : '',
		},

		width		: {
        	type	: String,
			default : '',
		},

		color		: {
        	type	: String,
			default : 'transparent'
		},
    },

    computed:{
        style(){
            return {
                gridTemplateAreas   : this.gridAreas.replace(/,/g,""),
                gridTemplateColumns : this.gridColumns,
                gridTemplateRows    : this.gridRows,
                gridGap             : this.gridGap,
                width               : this.fullSize ? '100%' : this.width,
				height  			: this.fullSize ? '100%' : this.height,
				backgroundColor		: this.color,
            }
        }
    },

}

</script>

<style scoped>

.grid{
    display: grid;
}

</style>
