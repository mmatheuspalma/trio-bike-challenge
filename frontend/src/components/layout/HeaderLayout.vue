<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderLayout'
})
</script>

<template>
  <header class="header container mx-auto">
    <div class="header__content mx-auto md:px-24 py-10">
      <div class="container mx-auto">
        <div class="flex">
          <h1 class="my-0 text-5xl font-extrabold">
            <router-link :to="{ name: 'home' }">Bike Rental</router-link>
          </h1>

          <div class="navigation ml-auto">
            <nav class="menu">
              <menu class="menu menu--inline">
                <li>
                  <a href="#" class="button button--primary button--text font-semibold"
                    >Manhattan <i class="fa-solid fa-location-dot"></i
                  ></a>
                </li>
                <li><a href="#" class="button button--primary button--text font-semibold">Log in</a></li>
                <li><a href="#" class="button button--secondary font-semibold">Sign up</a></li>
              </menu>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
}
</style>
