<template>
    <ion-page>
        <back-button />
        <ion-content>
            <section class="section">
                <h1 class="title has-text-centered">History</h1>
                <ul>
                    <li>
                        <ul v-for="(activities, index) in groupedActivities" :key="index">
                            <p class="label has-text-black">{{ new Date(index).toDateString() }}:</p>
                            <li
                                class="has-text-centered"
                                v-for="activity in activities"
                                :key="activity.date"
                            >
                                <div class="columns is-mobile">
                                    <div class="column">
                                        <ion-img
                                            :src="require(`../../public/assets/${activity.type.toLowerCase()}.svg`)"
                                            class="transactionItems"
                                            alt="transaction-items"
                                        ></ion-img>
                                    </div>
                                    <div class="column">
                                        {{ activity.description }}
                                        <span
                                            v-if="activity.transaction !== 0"
                                        >PHP {{ activity.transaction }}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonContent, IonPage, IonImg } from '@ionic/vue'
import { defineComponent } from "vue"
import BackButton from '@/components/BackButton.vue'
import store from '@/storage'
import groupBy from 'lodash.groupby'

export default defineComponent({
    name: 'HistoryNav',
    components: {
        IonContent,
        IonPage,
        IonImg,
        BackButton
    },
    data() {
        return {
            activities: [] as any,
            groupedActivities: [] as any,
            userDetails: [] as any
        }
    },
    async mounted() {
        this.userDetails = await store.get('activities')
        this.userDetails = JSON.parse(this.userDetails)
        if (this.userDetails !== null) {
            this.activities = Array.prototype.reverse.call([...this.userDetails])
            this.groupedActivities = groupBy(this.activities.sort((a: any, b: any) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            }).filter((x: any) => { return new Date(x.date).getTime() < new Date().getTime() }), "date")
        } else {
            this.userDetails = []
        }
    }
})
</script>
<style scoped>
.transactionItems {
    width: 50%;
    display: inline-block;
}
</style>