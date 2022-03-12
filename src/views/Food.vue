<template>
    <ion-page>
        <!--Back Button-->
        <back-button />
        <ion-content>
            <u-i-s-v-g-nav-item-curve />
            <div class="container is-fluid">
                <h1 class="title">
                    <ion-img :src="require('../../public/assets/food.svg')" alt="cart" id="logo"></ion-img>&nbsp;Foods
                </h1>
            </div>
            <section class="container is-fluid">
                <div
                    class="notification is-danger"
                    v-if="alertInsufficientMoney"
                >Not enough money on your wallet to complete your transaction. Please add funds to your wallet or restart.</div>
                <p class="subtitle is-5">Log your food transactions:</p>
                <div class="columns is-mobile">
                    <div class="column">
                        <div class="field">
                            <ion-input class="input" placeholder=" Item" v-model="item"></ion-input>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <ion-input
                                class="input"
                                type="Number"
                                v-model="itemMoney"
                                placeholder=" Price"
                            >&nbsp; PHP &nbsp;</ion-input>
                        </div>
                    </div>
                </div>
                <div class="has-text-right animate__animated animate__fadeInUp"
                    v-if="item !== '' && parseInt(itemMoney)">
                    <confirm-button @click="subtractMoney"></confirm-button>
                </div>
                <div class="container" v-if="Object.keys(groupedActivities).length !== 0">
                    <h4 class="title is-4">Recent transaction:</h4>

                    <ul v-for="(activities, index) in groupedActivities" :key="index">
                        <div
                            class="container notification is-info"
                            v-if="new Date(index).toDateString() === new Date().toDateString()"
                        >
                            <p
                                class="label has-text-white"
                            >Today({{ new Date(index).toDateString() }}):</p>
                            <li
                                class="has-text-centered"
                                v-for="activity in activities"
                                :key="activity.date"
                            >
                                {{ activity.description }}
                                <span
                                    v-if="activity.transaction !== 0"
                                >PHP {{ activity.transaction }}</span>
                            </li>
                        </div>
                    </ul>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonContent, IonPage, IonInput, IonImg } from '@ionic/vue'
import { defineComponent } from 'vue'
import store from '@/storage'
import ConfirmButton from '@/components/ConfirmButton.vue'
import BackButton from '../components/BackButton.vue'
import UISVGNavItemCurve from '@/components/UISVGNavItemCurve.vue'
import groupBy from 'lodash.groupby'

export default defineComponent({
    name: 'FoodNav',
    components: {
        IonContent,
        IonPage,
        IonInput,
        BackButton,
        UISVGNavItemCurve,
        ConfirmButton,
        IonImg
    },
    async mounted() {
        this.userMoney = await store.get('wallet')
        this.userDetails = await store.get('activities')
        this.userDetails = JSON.parse(this.userDetails)
        if (this.userDetails !== null) {
            this.activities = Array.prototype.reverse.call([...this.userDetails])
            this.groupedActivities = groupBy(this.activities.sort((a: any, b: any) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            }).filter((x: any) => { return new Date(x.date).toDateString() === new Date().toDateString() && x.type === 'Food' }), "date")
        } else {
            this.userDetails = []
        }
    },
    data() {
        return {
            userMoney: '',
            userDetails: [] as any,
            activities: [] as any,
            itemMoney: '',
            item: '',
            alertInsufficientMoney: false,
            groupedActivities: [] as any
        }
    },
    methods: {
        async subtractMoney() {
            let subtractMoney = parseFloat(this.userMoney) - parseFloat(this.itemMoney)
            if (subtractMoney < 0) {
                this.alertInsufficientMoney = true
            } else {
                await store.set('wallet', subtractMoney)
                this.userMoney = await store.get('wallet')
                await this.userDetails.push({
                    type: 'Food',
                    description: `${this.item} for`,
                    transaction: this.itemMoney,
                    date: new Date().toLocaleDateString()
                });
                await store.set('activities', JSON.stringify(this.userDetails))
                this.userDetails = await store.get('activities')
                this.userDetails = await JSON.parse(this.userDetails)
                if (await this.userDetails !== null) {
                    this.activities = Array.prototype.reverse.call([...this.userDetails])
                    this.groupedActivities = groupBy(await this.activities.sort((a: any, b: any) => {
                        return new Date(a.date).getTime() - new Date(b.date).getTime()
                    }).filter((x: any) => { return new Date(x.date).toDateString() === new Date().toDateString() && x.type === 'Food' }), "date")
                }
                this.item = ''
                this.itemMoney = ''
                this.alertInsufficientMoney = false
            }
        }
    }
})
</script>
<style scoped>
#logo {
    width: 15%;
    display: inline-block;
}
</style>