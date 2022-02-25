<template>
    <ion-page>
        <navigation-menu />
        <ion-content>
            <div class="container is-fluid">
                <h1 class="title">Clothing👔</h1>
            </div>
            <section class="section">
                <p class="subtitle is-5">Log your clothing transactions:</p>
                <div class="columns is-mobile ">
                    <div class="column">
                        <div class="field">
                            <ion-input class="input" placeholder=" item"></ion-input>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <ion-input class="input" type="Number" placeholder=" price"> &nbsp; PHP &nbsp;</ion-input>
                        </div>
                    </div>
                </div>
                <button class="button is-success">Confirm</button>
            </section>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonContent, IonPage, IonInput } from '@ionic/vue'
import { defineComponent } from 'vue'
import NavigationMenu from '@/components/Navigation.vue'
import store from '@/storage'

export default defineComponent({
    name: 'ClothingNav',
    components: {
        IonContent,
        IonPage,
        NavigationMenu,
        IonInput
    },
    async mounted() {
        this.userMoney = await store.get('wallet')
    },
    data() {
        return {
            userMoney: '',
            userDetails: [] as any,
            activities: [] as any
        }
    },
})
</script>