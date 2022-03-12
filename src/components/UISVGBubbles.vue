<template>
    <ion-img :src="require('../../public/assets/shapesbubble.svg')" id="bubble-upper" alt="bubbles"></ion-img>
    <ion-img
        :src="require('../../public/assets/shapesbubblelower.svg')"
        id="bubble-lower"
        alt="bubbles"
    ></ion-img>
</template>
<script lang="ts">
import { IonImg } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'UISVG',
    components: {
        IonImg
    }
})
</script>
<style scoped>
#bubble-upper {
    width: 75vw;
    height: 45vh;
    left: -1%;
    top: -4%;
    position: absolute;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
#bubble-lower {
    position: absolute;
    width: 93.28vw;
    height: 50vh;
    left: 27.5%;
    top: 59%;
    z-index: -1;
}
</style>