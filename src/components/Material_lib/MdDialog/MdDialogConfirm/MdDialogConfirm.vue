<template>
  <md-dialog v-bind="$attrs" :md-fullscreen="false">
    <md-dialog-title v-if="mdTitle">{{ mdTitle }}</md-dialog-title>
    <md-dialog-content v-if="mdContent" v-html="mdContent" />

    <md-dialog-actions>
      <md-button @click="onCancel">{{ mdCancelText }}</md-button>
      <md-button class="md-primary" @click="onConfirm">{{ mdConfirmText }}</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
	import MdButton from "@/components/Material_lib/MdButton/MdButton.vue"
	import MdDialog from "@/components/Material_lib/MdDialog/MdDialog.vue"
	import MdDialogContent from "@/components/Material_lib/MdDialog/MdDialogContent.vue"
	import MdDialogActions from "@/components/Material_lib/MdDialog/MdDialogActions.vue"
	import MdDialogTitle from "@/components/Material_lib/MdDialog/MdDialogTitle.vue"

  export default {
		emits:['md-cancel','md-confirm','update:mdActive'],
		components: {
			MdButton,
			MdDialogActions,
			MdDialogTitle,
			MdDialog,
			MdDialogContent
		},
    name: 'MdDialogConfirm',
    props: {
      mdTitle: String,
      mdContent: String,
      mdConfirmText: {
        type: String,
        default: 'Ok'
      },
      mdCancelText: {
        type: String,
        default: 'Cancel'
      }
    },
    methods: {
      onCancel () {
        this.$emit('md-cancel')
        this.$emit('update:mdActive', false)
      },
      onConfirm () {
        this.$emit('md-confirm')
        this.$emit('update:mdActive', false)
      }
    }
  }
</script>
