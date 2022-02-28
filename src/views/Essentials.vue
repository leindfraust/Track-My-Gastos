<template>
    <ion-page>
        <!--Back Button-->
        <back-button />
        <ion-content>
            <div class="container is-fluid">
                <h1 class="title">Essentiasls💆🏼</h1>
            </div>
            <section class="container is-fluid">
                <div
                    class="notification is-danger"
                    v-if="alertInsufficientMoney"
                >Not enough money on your wallet to complete your transaction. Please add funds to your wallet or reset.</div>
                <p class="subtitle is-5">Log your Essentials transactions:</p>
                <div class="columns is-mobile">
                    <div class="column">
                        <div class="field">
                            <ion-input class="input" placeholder=" Item" v-model="essentialsName"></ion-input>
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
                <div class="has-text-right">
                    <button
                        class="button is-success"
                        @click="subtractMoney"
                        :disabled="alertInsufficientMoney"
                    >Confirm</button>
                </div>
                <div class="container" v-if="activities !== null">
                    <h4 class="title is-4">Essentials transactions:</h4>
                    <ul
                        v-for="(activity, index) in activities.filter((x: any) => { return x.type === 'Essentials' })"
                        :key="index"
                    >
                        <li>
                            {{ activity.description }}
                            <span
                                v-if="activity.transaction !== 0"
                            >PHP {{ activity.transaction }}</span>
                            on {{ new Date(activity.date).toDateString() }}
                        </li>
                    </ul>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonContent, IonPage, IonInput } from '@ionic/vue'
import { defineComponent } from 'vue'
import store from '@/storage'
import BackButton from '../components/BackButton.vue'

export default defineComponent({
    name: 'EssentialsNav',
    components: {
        IonContent,
        IonPage,
        IonInput,
        BackButton
    },
    async mounted() {
        this.userMoney = await store.get('wallet')
        this.userDetails = await store.get('activities')
        this.userDetails = JSON.parse(this.userDetails)
        if (this.userDetails !== null) {
            this.activities = Array.prototype.reverse.call([...this.userDetails])
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
            essentialsName: '',
            alertInsufficientMoney: false
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
                    type: 'Essentials',
                    description: `Bought ${this.essentialsName} for`,
                    transaction: this.itemMoney,
                    date: new Date()
                });
                await store.set('activities', JSON.stringify(this.userDetails))
                this.userDetails = await store.get('activities')
                this.userDetails = await JSON.parse(this.userDetails)
                if (await this.userDetails !== null) {
                    this.activities = Array.prototype.reverse.call([...this.userDetails])
                }
                this.essentialsName = ''
                this.itemMoney = ''
            }
        }
    }
})
</script>