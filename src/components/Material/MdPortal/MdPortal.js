export default {
  name: 'MdPortal',
  abstract: true,
	emits:['md-destroy','md-initial-parent'],
  props: {
    mdAttachToParent: Boolean,
    mdTarget: {
      type: null,
      validator (value) {
        if (HTMLElement && value && value instanceof HTMLElement) {
          return true
        }
				console.log('The md-target-el prop is invalid. You should pass a valid HTMLElement.');
        //Vue.util.warn('The md-target-el prop is invalid. You should pass a valid HTMLElement.', this)

        return false
      }
    }
  },
  data: () => ({
    leaveTimeout: null,
    originalParentEl: null
  }),
  computed: {
    transitionName () {
			
			return this.$attrs['transition-prefix'] ? this.$attrs['transition-prefix'] : 'v';
      
    },
    leaveClass () {
      return this.transitionName + '-leave-from'
    },
    leaveActiveClass () {
      return this.transitionName + '-leave-active'
    },
    leaveToClass () {
      return this.transitionName + '-leave-to'
    }
  },
  watch: {
    mdTarget (newTarget, oldTarget) {
      this.changeParentEl(newTarget)

      if (oldTarget) {
        this.$forceUpdate()
      }
    }
  },
  methods: {
    getTransitionDuration (el) {
			
      const duration = window.getComputedStyle(el).transitionDuration
      const num = parseFloat(duration, 10)
      let unit = duration.match(/m?s/)

      if (unit) {
        unit = unit[0]
      }

      if (unit === 's') {
        return num * 1000
      }

      if (unit === 'ms') {
        return num
      }

      return 0
    },
    killGhostElement (el) {
			
      if (el.parentNode) {
				
        this.changeParentEl(this.originalParentEl)
				
        this.$options._parentElm = this.originalParentEl
				
        el.parentNode.removeChild(el)
      }
    },
    initDestroy (manualCall) {
			
      let el = this.$el

      if (manualCall && this.$el.nodeType === Node.COMMENT_NODE) {
        el = this.$vnode.elm
      }

      el.classList.add(this.leaveClass)
      el.classList.add(this.leaveActiveClass)

      this.$nextTick().then(() => {
        el.classList.add(this.leaveToClass)

        clearTimeout(this.leaveTimeout)
        this.leaveTimeout = setTimeout(() => {
          this.destroyElement(el)
        }, this.getTransitionDuration(el))
      })
    },
    destroyElement (el) {
      window.requestAnimationFrame(() => {
        el.classList.remove(this.leaveClass)
        el.classList.remove(this.leaveActiveClass)
        el.classList.remove(this.leaveToClass)
        this.$emit('md-destroy')
        this.killGhostElement(el)
      })
    },
    changeParentEl (newTarget) {
      newTarget && newTarget.appendChild(this.$el)
    }
  },
  mounted () {
		
    if (!this.originalParentEl) {
      this.originalParentEl = this.$el.parentNode
      this.$emit('md-initial-parent', this.$el.parentNode)
    }
		
    if (this.mdAttachToParent && this.$el.parentNode.parentNode) {
      this.changeParentEl(this.$el.parentNode.parentNode)
    } else if (document) {
      this.changeParentEl(this.mdTarget || document.body)
    }
  },
  beforeUnmount () {
		
    if (this.$el.classList) {
      this.initDestroy()
    } else {
			var _this = this;
			this.$nextTick(function(){
				_this.killGhostElement(_this.$el)
			});
      
    }
  },
  render () {
		
    const defaultSlot = this.$slots.default();
		
    if (defaultSlot && defaultSlot[0]) {
      return defaultSlot[0]
    }
  }
}
