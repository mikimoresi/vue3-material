<template>
  
	<div>

    <md-button class="md-button md-raised md-theme-default md-accent">
			this is a button
		</md-button>

		<md-datepicker  :md-immediately="true" >
      <label>Datepicker</label>	
    </md-datepicker>	

		<md-checkbox >
			<md-tooltip md-delay="300" md-direction="bottom" >this is a tooltip</md-tooltip>
			this is a checkbox
		</md-checkbox>
		
  </div>
  
</template>

<script>
	import '@/components/Material_lib/css/vue-material.min.css';
	import '@/components/Material_lib/css/default.css';
	import '@/main/css/main.css';
	
	import MdButton from "@/components/Material_lib/MdButton/MdButton.vue"
	import MdDatepicker from "@/components/Material_lib/MdDatepicker/MdDatepicker.vue"
	import MdTooltip from "@/components/Material_lib/MdTooltip/MdTooltip.vue"

	import MdCheckbox from "@/components/Material_lib/MdCheckbox/MdCheckbox.vue"

	export default {
		
		components: {
			MdButton,
			MdDatepicker,
			MdTooltip,
			MdCheckbox
		},
		
		name: 'app'

		
	}



</script>