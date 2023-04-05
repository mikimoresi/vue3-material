<template>
  <div class="md-speed-dial-content">
    <slot  />
  </div>
</template>

<script>
  //function getChildIndex (direction, index, count) {
  //  if (direction === 'top') {
  //    return count - index - 1
  //  }
//
  //  return index
  //}

  export default {
    name: 'MdSpeedDialContent',
    inject: ['MdSpeedDial'],
		/*
    methods: {
      setChildrenIndexes () {
				//console.log(this);
        //this.$nextTick().then(() => {
				//	console.log(this.slots);
        //  const countChild = this.$refs.length

        //  this.$refs.forEach((child, index) => {
        //    if (child._vnode.tag === 'button') {
        //      const childIndex = getChildIndex(this.MdSpeedDial.direction, index, countChild)

        //      child.$el.setAttribute('md-button-index', childIndex)
        //      child.$el.classList.add('md-raised')
        //    }
        //  })
        //})
      }
    },
    mounted () {
      this.setChildrenIndexes()
    },
    updated () {
      this.setChildrenIndexes()
    }*/
  }
</script>

<style lang="scss">
  @import "../MdAnimation/variables";

  .md-speed-dial-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    transition: .3s $md-transition-default-timing;
  }
</style>
