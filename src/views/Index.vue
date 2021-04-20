<template>
    <div id="kg_container" class="home">
    <!-- <KGBuilder pid="kg_container" />-->
    <div>
        <div class="logo">
            <span>广州大学漏洞检索平台</span>
        </div>
    </div>
    <el-input placeholder="请输入内容" v-model="inputVal" class="input-with-select">
    <el-select v-model="selectVal" slot="prepend" placeholder="请选择">
      <el-option
      v-for="({label, value}) in selectList"
      :key="value"
      :label="label"
      :value="value">
    </el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
    </div>
</template>

<script>
// import KGBuilder from '../components/KGBuilder'
export default {
  name: 'Home',
  data() {
      return {
          inputVal: '',
          selectVal: '',
          selectList: [{
              label: 'cve',
              value: 'cve'
          },{
              label: 'exb',
              value: 'exb'
          },{
              label: 'metasploit',
              value: 'metasploit'
          },{
              label: 'cnnvd',
              value: 'cnnvd'
          }]
      }
  },
  components: {
    // KGBuilder,
  },
}
</script>
<style>
html, body {
}
#app {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content:center;
      align-items: center;
      background: url('../assets/bg2.jpeg') no-repeat center center;
      background-size: cover;
    }
    #kg_container {
      width: 50%;
    }
/**#kg_container {
  height: 100vh;
  width: 60%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}**/
.el-select .el-input {
    width: 130px;
    border-radius: 5px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #1d243b;
  }
  .el-input-group--append /deep/ .el-input__inner.text {
      background-color: red;
  }
  .logo {
      text-align: center;
      font-size: 32px;
      letter-spacing: 2px;
      color: #fff;
      position: relative;
      top: -100px;

  }
</style>
