<template>
	<div id="app">
		<transition name="fade" mode="out-in">			
			<router-view></router-view>
		</transition>
	</div>
</template>

<style lang="scss">
	body {
		margin: 0;
		padding: 0;
		background-color: #F2F2F2;		
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;		
		color: #2c3e50;
	}

	a{
		text-decoration: none;
		&:hover,
		&:active{
			text-decoration: none;
		}
		
	}

	.page{
		width: 1120px;
		margin: 0 auto;
	}

	.box-card{
    min-height: 553px;
	}
	
  .tit{
    font-size: 12px;
    padding: 0 0 17px;
	}
	
	.pop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;

		.pop-mask{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0, .5);
		}
		.pop-inner{
			position: absolute;
			top: 50%;
			left: 50%;
			max-width: 1120;			
			transform: translate3d(-50%, -50%, 0);
		}
	}
	

	.el-dialog{
    width: 70%;
    max-width: 1120px;
    .el-dialog__header{
      text-align: center;
    }
    .dialog-th{
      padding: 0 23px 7px 23px;
    }

    .dialog-content{
      display: flex;
      .front,.back{
        flex: 1;
        margin: 0 23px;
      }

      .content-th{
        padding-bottom: 10px; 
      }
    }

    .el-dialog__footer{
      padding-bottom: 36px;
    }

    .el-button--primary{
      width: 150px;
      border-radius: 4px;
    }
  }
</style>

<script>
	// @ is an alias to /src

	import Header from '@/components/Header';
	
	export default {
		name: 'app',
		components: {
			Header
		}
	}
</script>
