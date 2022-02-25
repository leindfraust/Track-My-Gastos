<template>
  <ion-page>
    <navigation-menu />
    <ion-content v-if="userMoney == null">
      <section class="section is-large">
        <div class="container">
          <h3
            class="title is-3 animate__animated animate__fadeInDown"
          >Tired of seeing your wallet magically empty? Rest easy, you can now track your expenses automatically!</h3>
          <p
            class="subtitle is-4 animate__animated animate__fadeInLeft"
          >Before we begin, let us take a look at your wallet.</p>
          <div class="container animate__animated animate__fadeInUp">
            <ion-label
              class="label subtitle is-5"
            >How much money do you currently have right now in your wallet?</ion-label>
            <div class="field has-addons">
              <div class="control">
                <ion-input type="number" class="input" v-model="userInputMoney"></ion-input>
              </div>
              <div class="control">
                <button
                  class="button is-primary"
                  @click="submitUserMoney"
                  :disabled="userInputMoney == ''"
                >Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ion-content>
    <ion-content v-else>
      <div class="container is-fluid">
      <h1 class="title">Wallet💰</h1>
      </div>
      <section class="section is-large">
        <div class="container is-fluid">
          <div
            class="notification is-danger"
            v-if="parseFloat(userMoney) == 0"
          >Your wallet money is nonexistent. 💀</div>
          <div
            class="notification is-warning"
            v-if="parseFloat(userMoney) <= 499 && parseFloat(userMoney) > 0"
          >You might want to rethink your spending decisions. 🥺</div>
          <div
            class="notification is-success"
            v-if="parseFloat(userMoney) >= 500"
          >You are doing a good job. Keep at it! 🤗</div>
          <h3 class="title is-3">Current Wallet Money: PHP {{ userMoney }}</h3>
          <button class="button is-danger" @click="resetAccount">RESET</button>
          <br />
          <br />
          <ion-label class="label subtitle is-5">Add funds to your wallet:</ion-label>
          <div class="field has-addons">
            <div class="control">
              <ion-input
                type="number"
                class="input"
                v-model="userInputMoney"
                placeholder="Add Funds"
              ></ion-input>
            </div>
            <div class="control">
              <button
                class="button is-primary"
                @click="addUserMoney"
                :disabled="userInputMoney == ''"
              >Confirm</button>
            </div>
          </div>
        </div>
        <div class="container is-fluid" v-if="activities !== null">
          <h4 class="title is-4">Recent transactions:</h4>
          <ul v-for="(activity, index) in activities" :key="index">
            <li>
              {{ activity.type }}
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
import { IonContent, IonPage, IonInput, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import NavigationMenu from '@/components/Navigation.vue';
import store from '../storage'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonLabel,
    NavigationMenu
  },
  data() {
    return {
      userDetails: [] as any,
      userMoney: '',
      userInputMoney: '',
      activities: [] as any,
      isLoading: false
    }
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
  methods: {
    async submitUserMoney() {
      await store.set('wallet', this.userInputMoney)
      this.userMoney = await store.get('wallet')
      this.userInputMoney = ''
      location.reload()
    },
    resetAccount() {
      store.clear()
      location.reload()
    },
    async addUserMoney() {
      let addMoney = parseFloat(this.userInputMoney) + parseFloat(this.userMoney)
      await store.set('wallet', addMoney)
      this.userMoney = await store.get('wallet')
      await this.userDetails.push({
        type: 'Added funds',
        transaction: this.userInputMoney,
        date: new Date()
      });
      await store.set('activities', JSON.stringify(this.userDetails))
      this.userDetails = await store.get('activities')
      this.userDetails = await JSON.parse(this.userDetails)
      if (await this.userDetails !== null) {
        this.activities = Array.prototype.reverse.call([...this.userDetails])
      }
      this.userInputMoney = ''
    }
  }
});
</script>

<style scoped>
</style>
