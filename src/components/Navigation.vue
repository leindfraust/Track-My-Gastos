<template>
    <!--Menu Button-->
    <ion-header id="main">
        <ion-toolbar v-if="checkUser">
            <ion-buttons slot="start">
                <ion-menu-button>☰</ion-menu-button>
            </ion-buttons>
            <ion-title>Track My Gastos 💸</ion-title>
        </ion-toolbar>
    </ion-header>
    <!--Menu Content-->
    <ion-menu side="start" menu-id="first" content-id="main">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Expenses</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item @click="clothingNav">👔 Clothing</ion-item>
                <ion-item @click="foodNav">🍔 Food</ion-item>
                <ion-item @click="essentialsNav">💆🏼 Essentials</ion-item>
                <ion-item @click="miscellaneousNav">🔬 Miscellaneous</ion-item>
                <ion-item @click="aboutNav">ℹ️ About</ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>
<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonList, IonItem, IonMenu, IonToolbar, IonButtons, IonMenuButton, menuController } from '@ionic/vue'
import { defineComponent } from 'vue'
import store from '../storage'
export default defineComponent({
    name: 'NavigationMenu',
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonList,
        IonItem,
        IonMenu
    },
    data() {
        return {
            checkUser: false
        }
    },
    async mounted() {
        if (await store.get('wallet') !== null) {
            this.checkUser = true
        }
    },
    methods: {
        async clothingNav() {
            await this.$router.push('/clothing')
            await menuController.close()
        },
        async foodNav(){
            await this.$router.push('/food')
            await menuController.close()
        },
        async essentialsNav() {
            await this.$router.push('/essentials')
            await menuController.close()
        },
        async miscellaneousNav(){
            await this.$router.push('/miscellaneous')
            await menuController.close()
        },
        async aboutNav(){
            await this.$router.push('/about')
            await menuController.close()
        }
    }
})
</script>