<template>
    <ion-img :src="require('../../public/assets/navitemcurve.svg')" id="nav-curve" alt="nav-curve"></ion-img>
</template>
<script lang="ts">
import { IonImg } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'UISVGNavItemCurve',
    components: {
        IonImg
    }
})
</script>
<style scoped>
#nav-curve {
    position: absolute;
    width: 100vw;
    height: 75vh;
    top: -30vh;
    left: 10vw;
}
</style>