<template>
    <ion-page>
        <back-button/>
        <ion-content>
            <div class="container is-fluid">
                <h1 class="title">Aboutℹ️</h1>
            </div>
            <section class="section is-large content">
                <p class="title is-3">A simple wallet money tracker, that enables you to monitor your transactions.</p>
                <p class="subtitle">This application is aimed at people who are challenged in saving their money, it acts as simply monitoring your daily spending by logging your transactions manually. It also shows your spending activities from different types of transactions and warns you if you are low on money.</p>
                <br/>
                <p class="subtitle is-5">My socials: <a href="www.facebook.com/leindfraust">Facebook</a> | | <a href="www.github.com/leindfraust">Github</a></p>
            </section>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import { defineComponent } from "vue"
import BackButton from '@/components/BackButton.vue'
export default defineComponent({
    name: 'AboutNav',
    components: {
    IonContent,
    IonPage,
    BackButton
}
})
</script>