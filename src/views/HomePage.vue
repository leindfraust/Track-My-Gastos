<template>
  <ion-page>
    <navigation-menu />
    <ion-content v-if="userMoney == null" style="position: relative;" id="introContent">
      <u-i-s-v-g-vue></u-i-s-v-g-vue>
      <section class="section is-large" id="introSection">
        <div class="container">
          <div class="container box" :class="{ 'is-hidden': promptSubmitMoney }">
            <h3 class="title is-4 has-text-centered animate__animated animate__fadeInDown">Tired of seeing your wallet
              magically empty? Rest easy, you can now track your expenses automatically!</h3>
            <br />
            <p class="subtitle has-text-centered is-4 animate__animated animate__fadeInLeft">Before we begin, let us take
              a look at your wallet.</p>
          </div>
          <br />
          <div class="animate__animated animate__fadeInUp" :class="{ 'is-hidden': promptSubmitMoney }">
            <ion-img @click="nextpromptSubmitMoney" :class="{ 'animate__animated animate__fadeOut': nextClicked }"
              :src="require('../../public/assets/nextbutton.svg')" alt="next-button" id="next-button"></ion-img>
          </div>
          <div class="container box has-text-centered animate__animated animate__fadeInUp"
            :class="{ 'is-hidden': !promptSubmitMoney }">
            <ion-label class="label subtitle is-3">How much money do you currently have right now in your
              wallet?</ion-label>
            <div class="field">
              <div class="control">
                <ion-input type="number" class="input" v-model="userInputMoney"></ion-input>
              </div>
            </div>
          </div>
          <ion-img v-if="userInputMoney !== ''" class="animate__animated animate__fadeInUp" @click="submitUserMoney"
            :class="{ 'animate__animated animate__fadeOut': submitMoneyClicked }"
            :src="require('../../public/assets/nextbutton.svg')" alt="next-button" id="next-button"></ion-img>
        </div>
      </section>
    </ion-content>
    <ion-content v-else style="position: relative;">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-img :src="require('../../public/assets/curve.svg')" id="curve-upper" alt="curve"></ion-img>
      <section>
        <div class="container is-fluid">
          <h1 class="title is-4 has-text-white" v-if="parseFloat(userMoney) == 0">Your wallet money is nonexistent.</h1>
          <h1 class="title is-4 has-text-white" v-if="parseFloat(userMoney) <= 499 && parseFloat(userMoney) > 0">You might
            want to rethink your spending decisions.</h1>
          <h1 class="title is-4 has-text-white" v-if="parseFloat(userMoney) >= 500">You are doing a good job. Keep it up!
          </h1>
          <div class="container box">
            <div class="container has-text-right">
              <a style="text-decoration: none; color:black" @click="openModal">
                <strong>···</strong>
              </a>
            </div>
            <!--Modal-->
            <div class="modal" :class="{ 'is-active': isActiveModal }">
              <div class="modal-background"></div>
              <div class="modal-content has-text-centered box" style="background-color: white;">
                <div class="has-text-right has-text-info">
                  <a @click="closeModal">X</a>
                </div>
                <section>
                  <ion-label class="label subtitle is-5">Add funds to your wallet:</ion-label>
                  <div class="field">
                    <div class="control">
                      <ion-input type="number" class="input" v-model="userInputMoney" placeholder="Add Funds"></ion-input>
                    </div>
                    <br />
                    <ion-img v-if="userInputMoney !== ''" class="animate__animated animate__fadeInUp"
                      :src="require('../../public/assets/confirmbutton.svg')" id="confirm-button" alt="confirm"
                      @click="addUserMoney"></ion-img>
                  </div>
                </section>
              </div>
            </div>
            <p class="subtitle is-6 has-text-black">your total balance:</p>
            <h1 class="title is-2 has-text-info">PHP {{ userMoney }}</h1>
            <div class="container">
              <ion-img v-if="parseFloat(userMoney) >= 500" :src="require('../../public/assets/fullbar.svg')" class="bar"
                alt="fullbar"></ion-img>
              <ion-img v-if="parseFloat(userMoney) <= 499 && parseFloat(userMoney) > 0"
                :src="require('../../public/assets/halfbar.svg')" class="bar" alt="halfbar"></ion-img>
              <ion-img v-if="parseFloat(userMoney) == 0" :src="require('../../public/assets/lowbar.svg')" class="bar"
                alt="lowbar"></ion-img>
            </div>
          </div>
          <br />
          <div class="columns is-mobile">
            <div class="column">
              <ion-img :src="require('../../public/assets/clothing.svg')" @click="clothingNav" class="navItems"
                alt="cart"></ion-img>
              <p class="title is-5 has-text-centered">Clothing</p>
            </div>
            <div class="column">
              <ion-img :src="require('../../public/assets/food.svg')" @click="foodNav" class="navItems"
                alt="cart"></ion-img>
              <p class="title is-5 has-text-centered">Food</p>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column">
              <ion-img :src="require('../../public/assets/essentials.svg')" class="navItems" alt="cart"
                @click="essentialsNav"></ion-img>
              <p class="title is-5 has-text-centered">Essentials</p>
            </div>
            <div class="column">
              <ion-img :src="require('../../public/assets/miscellaneous.svg')" class="navItems" alt="cart"
                @click="miscellaneousNav"></ion-img>
              <p class="title is-5 has-text-centered">Miscellaneous</p>
            </div>
          </div>
        </div>
        <br />
        <div class="container is-fluid" v-if="activities.length !== 0">
          <h4 class="title is-4">Recent transactions:</h4>
          <ul v-for="(activities, index) in groupedActivities" :key="index">
            <div class="container notification is-info"
              v-if="new Date(index).toDateString() === new Date().toDateString()">
              <p class="label has-text-white">Today({{ new Date(index).toDateString() }}):</p>
              <li class="has-text-centered" v-for="activity in activities" :key="activity.date">
                <div class="columns is-mobile">
                  <div class="column">
                    <ion-img :src="require(`../../public/assets/${activity.type.toLowerCase()}.svg`)"
                      class="transactionItems" alt="transaction-items"></ion-img>
                  </div>
                  <div class="column">
                    {{ activity.description }}
                    <span v-if="activity.transaction !== 0">PHP {{ activity.transaction }}</span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <br />
      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonLabel, IonImg, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import NavigationMenu from '@/components/Navigation.vue';
import store from '../storage'
import UISVGVue from '@/components/UISVGBubbles.vue';
import groupBy from 'lodash.groupby'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonLabel,
    IonImg,
    IonRefresher,
    IonRefresherContent,
    NavigationMenu,
    UISVGVue
  },
  data() {
    return {
      userDetails: [] as any,
      userMoney: '',
      userInputMoney: '',
      activities: [] as any,
      isLoading: false,
      promptSubmitMoney: false,
      nextClicked: false,
      submitMoneyClicked: false,
      isActiveModal: false,
      groupedActivities: [] as any
    }
  },
  async mounted() {
    this.userMoney = await store.get('wallet')
    this.userDetails = await store.get('activities')
    this.userDetails = JSON.parse(this.userDetails)
    if (this.userDetails !== null) {
      this.activities = Array.prototype.reverse.call([...this.userDetails])
      this.groupedActivities = groupBy(this.activities.sort((a: any, b: any) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }).filter((x: any) => { return new Date(x.date).getTime() < new Date().getTime() }), "date")
    } else {
      this.userDetails = []
    }
  },
  methods: {
    async doRefresh(e: any) {
      this.userMoney = await store.get('wallet')
      this.userDetails = await store.get('activities')
      this.userDetails = JSON.parse(this.userDetails)
      if (this.userDetails !== null) {
        this.activities = Array.prototype.reverse.call([...this.userDetails])
        this.groupedActivities = groupBy(this.activities.sort((a: any, b: any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        }).filter((x: any) => { return new Date(x.date).getTime() < new Date().getTime() }), "date")
      } else {
        this.userDetails = []
      }
      setTimeout(() => {
        e.target.complete();
      }, 1000)
    },
    openModal() {
      this.isActiveModal = true
    },
    closeModal() {
      this.isActiveModal = false
    },
    nextpromptSubmitMoney() {
      this.nextClicked = true
      setTimeout(() => { this.promptSubmitMoney = true }, 500)
    },
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
      this.isActiveModal = false
      let addMoney = parseFloat(this.userInputMoney) + parseFloat(this.userMoney)
      await store.set('wallet', addMoney)
      this.userMoney = await store.get('wallet')
      await this.userDetails.push({
        type: 'Wallet',
        description: 'Added funds of',
        transaction: this.userInputMoney,
        date: new Date().toLocaleDateString()
      });
      await store.set('activities', JSON.stringify(this.userDetails))
      this.userDetails = await store.get('activities')
      this.userDetails = await JSON.parse(this.userDetails)
      if (await this.userDetails !== null) {
        this.activities = Array.prototype.reverse.call([...this.userDetails])
        this.groupedActivities = groupBy(await this.activities.sort((a: any, b: any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        }).filter((x: any) => { return new Date(x.date).getTime() <= new Date().getTime() }), "date")
      }
      this.userInputMoney = ''
    },
    async clothingNav() {
      await this.$router.push('/clothing')
    },
    async foodNav() {
      await this.$router.push('/food')
    },
    async essentialsNav() {
      await this.$router.push('/essentials')
    },
    async miscellaneousNav() {
      await this.$router.push('/miscellaneous')
    },
    async aboutNav() {
      await this.$router.push('/about')
    }
  }
});
</script>

<style scoped>
#next-button {
  width: 85%;
  margin: auto;
  cursor: pointer;
}

#confirm-button {
  width: 50%;
  margin: auto;
  cursor: pointer;
}

#curve-upper {
  position: absolute;
  width: 120vw;
  height: 75vh;
  left: -10vw;
  top: -27.8%;
}

#introSection {
  margin-top: 18vh;
}

.navItems {
  margin: auto;
  width: 60%;
}

.transactionItems {
  width: 50%;
  display: inline-block;
}

.bar {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 27px;
}

#introContent {
  --overflow: hidden;
}
</style>
