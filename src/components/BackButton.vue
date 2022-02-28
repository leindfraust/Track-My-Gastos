<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button id="button" @click="homeNav"></ion-back-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>
<script lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BackButton',
    components: {
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton
    },
    methods: {
        async homeNav(){
            await this.$router.push('/')
            location.reload()
        }
    }
})
</script>
<style scoped>
#button {
    border-color: transparent !important;
    padding: 0 !important
}
</style>