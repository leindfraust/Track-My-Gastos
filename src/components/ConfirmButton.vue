<template>
    <ion-img
        :src="require('../../public/assets/confirmbutton.svg')"
        alt="confirm-button"
        id="confirm-button"
    ></ion-img>
</template>
<script lang="ts">
import { IonImg } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ConfirmButton',
    components: {
        IonImg
    }
});
</script>
<style scoped>
#confirm-button {
    width: 50%;
    margin: auto;
    cursor: pointer;
}
</style>