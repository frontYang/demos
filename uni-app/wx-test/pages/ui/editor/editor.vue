<template>
	<view class="page page-editor">
		<ui-editor
			placeholder="请填写"
      @InputEvent="inputEditor"
      :html="html"
		></ui-editor>
	</view>
</template>

<script>
	import uiEditor from "@/components/ui-editor/ui-editor";
	export default {
		data(){
			return {
				html: `<p style="color:red;"></p>`
			}
		},
		components: {
			uiEditor
		},
		methods: {
			inputEditor(e){
				// console.log(val)
			}
		}
		
	}
</script>

<style>

</style>
