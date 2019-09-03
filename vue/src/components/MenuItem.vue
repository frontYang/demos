<template>
  <!-- <div v-if="item[children]"> -->
  <div>
    <!-- 无子菜单 -->
    <el-menu-item v-if="!item[children] || item[children].length == 0" :index="item[index] + '/' + nav.current">
      <i class="el-icon-menu"></i>
      <span v-if="!toggle">{{item[label]}}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-submenu v-else :index="item[index] + '/' + nav.current">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span v-if="!toggle">{{item[label]}}</span>
      </template>

      <template v-for="child in item[children]">
        <MenuItem
          v-if="child[children]&&child[children].length>0"
          :item="child"
          :key="child[index]"/>
        <el-menu-item v-else :key="child[index]" :index="child[index] + '/' + nav.current">
          <i class="el-icon-location"></i>
          <span v-if="!toggle">{{item[label]}}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    // 子属性名
    children: {
      type: String,
      default: 'subNav'
    },

    // label 属性名
    label: {
      type: String,
      default: 'label'
    },

    // 跳转链接 属性名
    index: {
      type: String,
      default: 'index'
    },

    // 
    toggle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState([
      'nav'
    ]),
  },
  methods: {
    
  }
}
</script>