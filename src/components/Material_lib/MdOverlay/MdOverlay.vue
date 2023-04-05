<template>
  <md-portal :md-attach-to-parent="mdAttachToParent" :mdTarget="mdTarget" transition-prefix='md-overlay'>
    
    <div class="md-overlay" :class="overlayClasses"  v-if="mdActive"  :style="style ? style : false"></div>
    
  </md-portal>
</template>

<script>
	import MdPortal from "@/components/Material_lib/MdPortal/MdPortal";

	export default {
		name: "MdOverlay",
		components: {
			MdPortal,
		},
		props: {
			mdTarget: {
				type: null,
				default: null,
			},
			mdActive: Boolean,
			mdAttachToParent: Boolean,
			mdFixed: Boolean,
		},
		computed: {
			overlayClasses() {
				return {
					"md-fixed": this.mdFixed
					
				};
			},
			style() {
				if(this.mdTarget) {
					return {
						top: (this.mdTarget.scrollTop-100)+"px"
					}
				}
			}
		},
	};
</script>
<style >
	@-webkit-keyframes mdOverlayAppear{
		0% {
			opacity: 0 ;
			
		}
		
		100%{
			opacity: 1;
		}
	}
	@-keyframes mdOverlayAppear{
		0% {
			opacity: 0 ;
			
		}
		
		100%{
			opacity: 1;
		}
	}
	@-webkit-keyframes mdOverlayFade{
		0% {
			opacity: 1 ;
			
		}
		
		100%{
			opacity: 0;
		}
	}
	@-keyframes mdOverlayFade{
		0% {
			opacity: 1 ;
			
		}
		
		100%{
			opacity: 0;
		}
	}
</style>
<style lang="scss">
	@import "@/components/Material_lib/MdAnimation/variables";

	.md-overlay {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10;
		overflow: hidden;
		background: rgba(#000, 0.6);
		
		-webkit-animation-duration:0.35s;
		
  	-webkit-animation-name:mdOverlayAppear;
  	-webkit-animation-timing-function:$md-transition-default-timing;
		-webkit-animation-fill-mode: forwards;
  	animation-duration:0.35s;
		
		animation-name:mdOverlayAppear;
		animation-fill-mode: forwards;
		animation-timing-function:$md-transition-default-timing;
		animation-iteration-count:1;
		-webkit-animation-iteration-count:1;
		
		

		body > &,
		&.md-fixed {
			position: fixed;
		}
		
	}
	.md-overlay-leave-active {
		-webkit-animation-name:mdOverlayFade;
		animation-name:mdOverlayFade;

		
	}
	
	

	
</style>
