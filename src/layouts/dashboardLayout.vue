<template>
	<css-grid ref="main-grid" full-size
			  style="transition: all ease-out 0.3s"
			  :grid-rows	= "computedRows"
			  :grid-columns	= "computedColumns"
			  :grid-areas	= "computedGrid.template"
			  :class		= "$vuetify.theme.dark ? 'theme--dark' : 'theme--light'"
	>
		<css-grid-item name="master" ref="master-grid" full-size :style="computedMasterStyle">
			<div class="grid-item--wrapper"
				 :class="bottom ? 'grid-item--wrapper-rounded' : ''"
			>
				<slot name="master"/>
			</div>
		</css-grid-item>

		<css-grid-item name="slave" ref="slave-grid" full-size class="grid-item--slave" :style="computedSlaveStyle">
			<div class="grid-item--wrapper grid-item--wrapper-rounded">
				<slot name="slave"/>
			</div>
		</css-grid-item>

		<css-grid-item name="console" full-size class="grid-item--console" :style="computedConsoleStyle">
			<div class="grid-item--wrapper grid-item--wrapper-rounded">
				<slot name="console" :changeMode="{
						onModeChange : consoleMinimizeChange,
						value		 : consoleMinimize,
					}
				"/>
			</div>
		</css-grid-item>

		<css-grid-item name="vResizer" full-size
					   :style="computedVResizerStyle"
					   @mousedown.prevent="startYResize"
		>
			<v-hover v-slot:default="{ hover }" open-delay="150">
				<v-row no-gutters justify="center" align="center"
					   class="resizer-vertical"
					   :class="vResize || hover  ? `resizer-vertical--active` : ''"
				>
					<v-icon :size="resizerWidth" class="resizer-vertical--icon-fixed"
							:style="!bottom ? 'top: 50vh' : ''"
					>
						mdi-drag-vertical
					</v-icon>
				</v-row>
			</v-hover>
		</css-grid-item>

		<css-grid-item name="hResizer" full-size
					   :style="computedHResizerStyle"
					   @mousedown.prevent="startXResize"
		>
			<v-hover v-slot:default="{ hover }" open-delay="150">
				<v-row no-gutters justify="center" align="center"
					   class="resizer-horizontal"
					   :class="(hResize || hover) && !consoleMinimize ? `resizer-horizontal--active` : ''"
				>
					<v-icon v-show="!consoleMinimize" :size="resizerHeight">mdi-drag-horizontal</v-icon>
				</v-row>
			</v-hover>
		</css-grid-item>

	</css-grid>
</template>

<script>

import CssGrid from "@/components/helpers/css-grid"
import CssGridItem from "@/components/helpers/css-grid-item"
import { mapState } from "vuex"

export default {
	name: "game-layout",
	components: { CssGrid, CssGridItem },

	computed:{
		...mapState({
			layout	: state => state.layout,
			bottom	: state => state.bottom,
		}),

		computedGrid(){
			const activeTemplate = this.bottom ? this.layout + '-bottom' : this.layout;
			return this.settings[activeTemplate];
		},

		computedColumns(){
			const leftPanel = this.computedGrid.leftPanel;
			return leftPanel + '% ' + this.resizerWidth + 'px ' + 'calc(' + (100 - leftPanel) + '% - ' +
				this.resizerWidth + 'px)';
		},

		computedRows(){
			const topPanel = this.computedGrid.topPanel;
			if (!this.consoleMinimize) {
				return topPanel + 'vh ' + this.resizerHeight + 'px calc(' + (100 - topPanel) + 'vh - ' +
					(this.resizerHeight + this.offsetTop) + 'px) 1fr';
			} else {
				return 'calc(100vh - 146px) ' + this.resizerHeight + 'px ' + '64px' + ' 1fr';
			}
		},

		computedMasterStyle(){
			return {
				paddingTop		: this.bottom ? `${this.padding}px` : '',
				paddingLeft		: this.bottom && this.layout ==='left-layout' ? `${this.padding}px` : '',
				paddingRight	: this.layout === 'right-layout' && this.bottom ? `${this.padding}px` : '',
			}
		},

		computedSlaveStyle(){
			return {
				paddingRight	: this.layout === 'left-layout' ? `${this.padding}px` : '',
				paddingLeft		: this.layout !== 'left-layout' ? `${this.padding}px` : '',
				paddingTop		: `${this.padding}px`,
				top				: `${this.offsetTop}px`,
			}
		},

		computedConsoleStyle(){
			return {
				top				: `calc(${this.computedGrid.topPanel}vh + ${this.offsetTop + this.resizerHeight}px)`,
				paddingLeft		: this.bottom || this.layout !== 'left-layout' ? `${this.padding}px` : '',
				paddingRight	: this.layout === 'left-layout' || this.bottom ? `${this.padding}px` : '',
				paddingBottom	: this.consoleMinimize ? `0px` : `${this.padding}px`,
			}
		},

		computedHResizerStyle(){
			return {
				position		: 'sticky',
				top				: `calc(${this.computedGrid.topPanel}vh + ${this.offsetTop}px)`,
				paddingRight	: this.layout === "left-layout" || this.bottom ? `${this.padding}px` : '',
				paddingLeft		: this.layout !== "left-layout" || this.bottom ? `${this.padding}px` : '',
			}
		},

		computedVResizerStyle(){
			return {
				paddingTop		: this.bottom ? `${this.padding}px` : '',
			}
		},

		settings(){
			return this.$store.state.settings;
		}
	},

	data: ()=>({
		minWidth		: 300,
		minHeight		: 300,
		offsetTop		: 64,
		resizerHeight	: 16,
		resizerWidth	: 16,
		padding			: 16,
		vResize			: false,
		hResize			: false,
		consoleMinimize		: false,
	}),

	methods:{
		consoleMinimizeChange(){
			this.consoleMinimize = !this.consoleMinimize;
			setTimeout(() => {
				window.dispatchEvent(new Event('resize'));
				this.$forceUpdate();
			}, 0)
		},

		startXResize(e) {
			if (this.consoleMinimize) { return }
			this.subscribeEvents();
			this.hResize	= true;
			this.screenY	= e.screenY;
			this.topHeight	= this.slaveGridItem.$el.clientHeight;
		},

		startYResize(e) {
			this.subscribeEvents();
			this.vResize	= true;
			this.screenX	= e.screenX;
			this.leftWidth	= this.layout !== "right-layout" ? this.masterGridItem.$el.clientWidth :
				this.slaveGridItem.$el.clientWidth;
		},

		updateSettings(){
			this.$store.dispatch('updateSettings');
		},

		stopResize() {
			this.updateSettings();
			this.unsubscribeEvents();
			this.vResize = false;
			this.hResize = false;
		},

		subscribeEvents(){
			this.mainGrid.$el.addEventListener('mousemove', this.handleMouseMove)
			this.mainGrid.$el.addEventListener('mouseleave', this.stopResize)
			this.mainGrid.$el.addEventListener('mouseup', this.stopResize)
		},

		unsubscribeEvents(){
			this.mainGrid.$el.removeEventListener('mousemove', this.handleMouseMove)
			this.mainGrid.$el.removeEventListener('mouseleave', this.stopResize)
			this.mainGrid.$el.removeEventListener('mouseup', this.stopResize)
		},

		handleMouseMove(e) {
			e.preventDefault();

			if (this.vResize) {
				let offset = (this.screenX - e.screenX);
				let leftPanel = (this.leftWidth - offset) * 100 / this.mainGrid.$el.clientWidth;
				if ((this.leftWidth - offset >= this.minWidth) && (this.mainGrid.$el.clientWidth + offset - this.leftWidth > this.minWidth)){
					this.computedGrid.leftPanel = leftPanel;
				}
			}

			if (this.hResize) {
				let offset = this.screenY - e.screenY;
				let topPanel = (this.topHeight - offset) * 100 / window.innerHeight;
				if ((this.topHeight - offset >= this.minHeight) && (window.innerHeight + offset - this.topHeight > this.minHeight)){
					this.computedGrid.topPanel = topPanel;
				}
			}

			window.dispatchEvent(new Event('resize'));
			this.$forceUpdate();
		},

	},

	mounted() {
		this.mainGrid		= this.$refs['main-grid'];
		this.masterGridItem	= this.$refs['master-grid'];
		this.slaveGridItem	= this.$refs['slave-grid'];
		this.offsetTop		= 64 //this.mainGrid.$el.parentElement.offsetTop;
	}

}

</script>

<style scoped lang="sass">
@import '../assets/variables.scss'

+theme(grid) using ($material)
	.grid-item--wrapper
		$sh-color 	: map-deep-get($material, 'grid-item', 'box-shadow')
		box-shadow 	: 0 1px 0 0 $sh-color, 0 0 0 1px $sh-color

	.resizer-vertical
		&--active
			$sh-color 		: map-deep-get($material, 'grid-item', 'box-shadow')
			box-shadow 		: 0 1px 0 0 $sh-color, 0 0 0 1px $sh-color
			background-color: map-deep-get($material, 'grid-item', 'background')

	.resizer-horizontal
		&--active
			$sh-color 		: map-deep-get($material, 'grid-item', 'box-shadow')
			box-shadow 		: 0 1px 0 0 $sh-color, 0 0 0 1px $sh-color
			background-color: map-deep-get($material, 'grid-item', 'background')

.grid-item--slave
	position		: sticky

.grid-item--console
	position		: sticky

.grid-item--wrapper
	height 			: 100%
	width 			: 100%
	overflow 		: hidden

	&-rounded
		border-radius 	: 4px

.resizer-vertical
	height 			: 100%
	cursor 			: col-resize
	transition 		: background-color 200ms ease 0s, box-shadow 200ms ease 0s
	z-index 		: -1
	margin-left 	: 1px
	margin-right 	: 1px

	&--icon-fixed
		position	: fixed

.resizer-horizontal
	margin-top  	: 1px
	margin-bottom   : 1px
	cursor 			: row-resize
	transition 		: background-color 200ms ease 0s, box-shadow 200ms ease 0s
	z-index 		: -1

</style>
