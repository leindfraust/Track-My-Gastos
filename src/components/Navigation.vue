<template>
    <ion-header id="main">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-menu-button v-if="checkUser">☰</ion-menu-button>
            </ion-buttons>
            <ion-title>Track My Gastos 💸</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-menu side="start" menu-id="first" content-id="main">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Expenses</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item @click="homeNav">💰 Wallet</ion-item>
                <ion-item @click="clothingNav">👔 Clothing</ion-item>
                <ion-item>🍔 Food</ion-item>
                <ion-item>💆🏼 Essentials</ion-item>
                <ion-item>🔬 Miscellaneous</ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>
<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonList, IonItem, IonMenu, IonToolbar, IonButtons, IonMenuButton } from '@ionic/vue'
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
        IonMenu,
    },
    data() {
        return {
            checkUser: false
        }
    },
    async mounted(){
        if(await store.get('wallet')){
            this.checkUser = true
        }
    },
    methods: {
        clothingNav(){
            this.$router.push('/clothing')
        },
        homeNav(){
            this.$router.push('/')
        }
    }
})
</script>