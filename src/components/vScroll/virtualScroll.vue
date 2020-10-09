<template>
	<div ref="container"
		 class="virtual-scroll--container"
	>
		<div ref="viewport"
			 class="virtual-scroll--viewport"
			 :style="`height: ${viewportHeight}.px`"
		>
			<slot v-for="(item, index) in virtualList"
				  :item="item"
				  :index="index"
			/>
		</div>
	</div>
</template>

<script>
import {ref, computed, watch, onBeforeUnmount, onMounted, watchEffect} from "@vue/composition-api"

export default {
	name: "virtualScroll.vue",
	props: {
		items		: {
			type	: Array,
			default : [],
		},

		itemHeight	: {
			type	: String | Number,
			default : 300,
		},

		bench		: {
			type	: String | Number,
			default	: 1,
		},

		input		: {
			type	: String,
			default	: '',
		}
	},

/** todo refactor the code bellow, add dynamic height for items **/

	setup (props, context) {
		const
			virtualHeight	= ref(0),
			offsetTop		= ref(0),
			container		= ref(null),
			viewport		= ref(null),

			startIndex = computed (() => {
				return Math.floor(offsetTop.value / Number(props.itemHeight)) - Number(props.bench)
			}),

			viewportHeight = computed(()=>{
				return props.items.length * Number(props.itemHeight);
			}),

			virtualList = computed(() => {
				if (virtualHeight.value === 0 || props.items.length === 0) { return [] }
				const count = Math.floor(virtualHeight.value / Number(props.itemHeight)) + Number(props.bench * 2 + 1);
				return props.items.slice(startIndex.value > 0 ? startIndex.value : 0, count + startIndex.value);
			}),

			goToTop = () => {
				container.value.scrollTop = 0;
			},

			onResize = () => {
				virtualHeight.value = container.value.clientHeight;
			},

			onScroll = () => {
				offsetTop.value = container.value.scrollTop;
			};

		watch(virtualList, ()=>{
			viewport.value.style.paddingTop = startIndex.value > 0 ? `${ startIndex.value * props.itemHeight }px` : '0px'
			setTimeout(()=>context.root.$forceUpdate(true), 0);
		})

		watchEffect(()=>{
			props.input && goToTop();
		})

		onMounted(()=>{
			context.root.$nextTick(() => onResize());
			window.addEventListener('resize', onResize);
			container.value.addEventListener('scroll', onScroll, { passive: false });
		})

		onBeforeUnmount(() => {
			window.removeEventListener('resize', onResize);
			container.value.addEventListener('scroll', onScroll);
		})

		return { virtualList, container, viewport, viewportHeight }
	}

}
</script>

<style scoped lang="sass">

.virtual-scroll
	&--container
		height: 100%
		width: 100%
		position: relative
		overflow: auto

	&--viewport
		position: absolute
		top: 0
		width: 100%

</style>