<template>
  
    
    <slot :md-item="mdItem" :md-id="mdId" :md-index="mdIndex" />
    
  
</template>
<script>
  export default {
    name: 'MdTableRowGhost',
    props: {
      mdIndex: [String, Number],
      mdId: [String, Number],
      mdItem: [Array, Object]
    }
  }
</script>
