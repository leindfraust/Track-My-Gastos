<template>
    <!--Menu Button-->
    <ion-header id="main">
        <ion-toolbar v-if="checkUser">
            <ion-buttons slot="start">
                <ion-menu-button>☰</ion-menu-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <!--Menu Content-->
    <ion-menu side="start" menu-id="first" content-id="main">
        <ion-content>
            <ion-list>
                <ion-item @click="historyNav">
                    <ion-img :src="require('../../public/assets/history.svg')" alt="history"></ion-img>&nbsp;History
                </ion-item>
                <ion-item @click="promptRestart">
                    <ion-img :src="require('../../public/assets/restart.svg')" alt="restart"></ion-img>&nbsp;Restart
                </ion-item>
                <ion-item @click="aboutNav">
                    <ion-img :src="require('../../public/assets/info.svg')" alt="Info"></ion-img>&nbsp;About
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>
<script lang="ts">
import { IonContent, IonHeader, IonList, IonItem, IonMenu, IonToolbar, IonButtons, IonMenuButton, menuController, IonImg, alertController } from '@ionic/vue'
import { defineComponent } from 'vue'
import store from '../storage'
export default defineComponent({
    name: 'NavigationMenu',
    components: {
        IonContent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonList,
        IonItem,
        IonMenu,
        IonImg
    },
    data() {
        return {
            checkUser: false,
        }
    },
    async mounted() {
        if (await store.get('wallet') !== null) {
            this.checkUser = true
        }
    },
    methods: {
        async historyNav() {
            await this.$router.push('/history')
            await menuController.close()
        },
        async promptRestart() {
            const alert = await alertController
                .create({
                    message: 'Are you sure you want to restart?',
                    buttons: [{
                        text: 'No',
                        role: 'cancel',
                        cssClass: 'secondary',
                        id: 'cancel-button'
                    }, {
                        text: 'Yes',
                        id: 'confirm-button',
                        handler: () => {
                            store.clear()
                            location.reload()
                        }
                    }],
                });
            await alert.present()
        },
        async aboutNav() {
            await this.$router.push('/about')
            await menuController.close()
        }
    }
})
</script>
<style scoped>
ion-content {
    --overflow: hidden;
}
</style>