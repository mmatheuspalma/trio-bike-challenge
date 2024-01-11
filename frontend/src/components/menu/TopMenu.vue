<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopMenu'
})
</script>

<template>
  <nav class="menu">
    <menu class="menu menu--inline">
      <li>
        <a href="#" class="button button--text">Manhattan <i class="fa-solid fa-location-dot"></i></a>
      </li>
      <li><a href="#" class="button button--text">Log in</a></li>
      <li><a href="#" class="button">Sign up</a></li>
    </menu>
  </nav>
</template>
