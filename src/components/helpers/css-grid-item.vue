<template>
    <div :style="style"
		 @mousedown	= "e => $emit('mousedown', e)"
	>
        <slot/>
    </div>
</template>

<script>
export default {
    name: "css-grid-item",

    props: {
        name    	: String,
        justify 	: String,
        align   	: String,
        place   	: String,
        overflow	: String,
		fullSize	: Boolean,
        height  	: String || "",
		width		: String || "",
    },

    computed:{
        style(){
            const custom = {
                justifySelf : this.justify,
                alignSelf   : this.align,
                placeSelf   : this.place,
                overflow    : this.overflow,
                height      : this.height,
				width		: this.width,
            }
            if (this.name) custom.gridArea = this.name;
            return custom;
        }
    },

}
</script>

<style scoped>

</style>
