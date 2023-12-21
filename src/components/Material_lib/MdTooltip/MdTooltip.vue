<template>
  <md-popover :md-settings="popperSettings" :md-active="shouldRender">
    <transition name="md-tooltip" v-if="shouldRender">
      <div class="md-tooltip" :class="[tooltipClasses, $mdActiveTheme]" :style="tooltipStyles">
        <slot />
      </div>
    </transition>
  </md-popover>
</template>

<script>
	import { getCurrentInstance } from "vue";
  import MdComponent from '../core/MdComponent'
  import MdPropValidator from '../core/utils/MdPropValidator'
  import MdPopover from '../MdPopover/MdPopover.vue'

	

  export default new MdComponent({
		setup() {
      // accessible inside setup function
      const instance = getCurrentInstance();
  			
      return {instance}
    },
    name: 'MdTooltip',
		emit:['update:mdActive'],
    components: {
      MdPopover
    },
    props: {
      mdActive: Boolean,
			mdTargetref: String,
      mdDelay: {
        type: [String, Number],
        default: 0
      },
      mdDirection: {
        type: String,
        default: 'bottom',
        ...MdPropValidator('md-direction', ['top', 'right', 'bottom', 'left'])
      }
    },
    data: () => ({
      shouldRender: false,
      targetEl: null
    }),
    computed: {
      tooltipClasses () {
        return 'md-tooltip-' + this.mdDirection
      },
      tooltipStyles () {
        return `transition-delay: ${this.mdDelay}ms`
      },
      popperSettings () {
        return {
          placement: this.mdDirection,
          modifiers: {
            offset: {
              offset: '0, 16'
            }
          }
        }
      }
    },
    watch: {
      mdActive () {
        this.shouldRender = this.mdActive
      },
      shouldRender (shouldRender) {
        this.$emit('update:mdActive', shouldRender)
      }
    },
    methods: {
      show () {
        this.shouldRender = true
      },
      hide () {
        this.shouldRender = false
      }
    },
    mounted () {
      this.$nextTick().then(() => {
        this.shouldRender = this.mdActive
				
				
				if(this.mdTargetref) {
					if(this.instance.parent.refs[this.mdTargetref]) {
						this.targetEl = this.instance.parent.refs[this.mdTargetref][0];
					}
				} else {
					//console.log(this.instance);
        	this.targetEl = this.instance.parent.vnode.el;
					
				}

        if (this.targetEl) {
					
          this.targetEl.addEventListener('mouseenter', this.show, false)
					var _this = this;
					this.targetEl.addEventListener('touchstart', function(){
						setTimeout(function(){
							_this.hide();
						},2000);
					});
          this.targetEl.addEventListener('mouseleave', this.hide, false)
        }
      })
    },
    beforeUnmount () {
      if (this.targetEl) {
        this.targetEl.removeEventListener('mouseenter', this.show)
        this.targetEl.removeEventListener('mouseleave', this.hide)
      }
    }
  })
</script>

<style lang="scss">
  @import "@/components/Material_lib/MdAnimation/variables";
  @import "@/components/Material_lib/MdLayout/mixins";

  $md-tooltip-height: 22px;
  $md-tooltip-height-mobile: 32px;

  .md-tooltip {
    height: $md-tooltip-height;
    padding: 0 8px;
    position: fixed;
    z-index: 111;
    pointer-events: none;
    border-radius: 2px;
    transition: .15s $md-transition-enter-timing;
    transition-property: opacity, transform;
    will-change: opacity, transform, top, left !important;
    font-size: 10px;
    line-height: $md-tooltip-height;
    text-transform: none;
    white-space: nowrap;

    @include md-layout-small {
      height: $md-tooltip-height-mobile;
      font-size: 14px;
      line-height: $md-tooltip-height-mobile;
    }

    &.md-tooltip-leave-active {
      transition-timing-function: $md-transition-leave-timing;
    }

    &.md-tooltip-enter-from,
    &.md-tooltip-leave-active {
      opacity: 0;

      &.md-tooltip-top {
        transform: translate3d(0, 4px, 0) scale(.95);
      }

      &.md-tooltip-right {
        transform: translate3d(-4px, 0, 0) scale(.95);
      }

      &.md-tooltip-bottom {
        transform: translate3d(0, -4px, 0) scale(.95);
      }

      &.md-tooltip-left {
        transform: translate3d(4px, 0, 0) scale(.95);
      }
    }
  }
</style>
