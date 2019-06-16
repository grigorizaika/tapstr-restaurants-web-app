<template>
  <b-container fluid class="h-100">
    <b-row>
      <b-col cols='3'>
        <b-button @click="getRestaurantData()">GET restaurant data</b-button>
      </b-col>
      <b-col cols='6'>
        <div id="restaurantInfoForm" v-if="isLoggedIn" align="center">
          <b-input type="text" placeholder="Name" name="name_field" v-model="restaurant.name" class="w-75"></b-input>
          <b-input type="email" placeholder="Email" name="email_field" v-model="restaurant.email" class="w-75"></b-input>
          <b-row class="w-75">
            <b-col cols="4" class="w-100" style="padding-left: 0px;">
              <b-input type="number" placeholder="Zip code" v-model="restaurant.zip" pattern="^[0-9]{5}(?:-[0-9]{4})?$" style="margin-left: 0px;"></b-input>
            </b-col>
            <b-col cols="8">
              <b-form-select v-model="restaurant.city" :options="cities" style="margin: 16px">
                <template slot="first">
                  <option :value="null" disabled>-- Please select your city --</option>
                </template>
              </b-form-select>
            </b-col>
            <b-col cols="4">

            </b-col>

          </b-row>
          <b-input type="text" placeholder="Address" v-model="restaurant.address" class="w-75"></b-input>
          <b-input type="url" placeholder="Website" v-model="restaurant.website" class="w-75"></b-input>
          <b-input type="text" placeholder="Cuisine" v-model="restaurant.cuisine" class="w-75"></b-input>
          <b-input type="number" placeholder="Price range" v-model="restaurant.price_range" pattern="^[0-9]-[0-9]$" class="w-75"></b-input>
          <b-row class="w-75">
             <b-col cols="3" style="padding-left: 0px;"><label for="tableBookingCheckout">Table booking: </label></b-col>
             <b-col cols="3"><b-form-checkbox id="tableBookingCheckout" v-model="restaurant.hasTableBooking"></b-form-checkbox></b-col>
             <b-col cols="6"></b-col>
          </b-row>
          <b-input type="text" v-model="restaurant.opening_hours" placeholder="Opening hours" class="w-75"></b-input>
          <b-input type="text" v-model="restaurant.type" placeholder="Restaurant type" class="w-75"></b-input>
          <b-input type="number" v-model="restaurant.avg_price_for_two" placeholder="Average price for two" class="w-75" ></b-input>
          <b-input type="tel" v-model="restaurant.phone_number" placeholder="Phone number" class="w-75"></b-input>

          <b-button @click="submitRestaurantData()">
          <div v-if="!isLoading">Submit</div>
          <b-spinner v-if="isLoading" label="Loading..."></b-spinner></b-button>


        </div>
        <amplify-authenticator v-if="!isLoggedIn"></amplify-authenticator>
      </b-col>
      <b-col cols='3'>
        <amplify-sign-out v-if="isLoggedIn"></amplify-sign-out>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import axios from 'axios'

export default {
  name: 'RestaurantStart',
  data: function() {
    return {
      isLoading: false,

      signedIn: false,
      /*userRestaurant: Object,*/
      session: Object,

      restaurant: {
        name: "",
        email: "",
        zip: "",
        city: "",
        address: "",
        website: "",
        cuisine: "",
        price_range: "",
        has_table_booking: false,
        opening_hours: "",
        type: "",
        avg_price_for_two: "",
        phone_number: "",
      },
      cities: [],
      pickedCity: "City",
    }
  },
  computed: {
    userRestaurant() { return this.$store.getters.userRestaurant },
    userSession() { return this.$store.getters.userSession },
    restaurantEmail() { return this.$store.getters.isUserSignedIn ? this.$store.getters.userRestaurant.attributes.email : "blank@restaurant.com"},
    isLoggedIn() { return this.$store.getters.isUserSignedIn },
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on('authState', info => {
      if(info === "signedIn") {
        this.findUser();
      } else {
        /* TODO: surround w/ try/catch clauses */
        this.$store.commit('changeUserRestaurant', undefined);
        this.$store.commit('changeUserSession', undefined);
      }
    });
    this.getCities();
  },
  methods: {
    async findUser() {
      /* TODO: surround w/ try/catch clauses */
      this.$store.commit('changeUserRestaurant', await Auth.currentAuthenticatedUser());
      this.$store.commit('changeUserSession', await Auth.currentSession());
    },
    submitRestaurantData() {
      var that = this;
      that.isLoading = true;

      var headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userSession.getIdToken().getJwtToken(),
      }

      axios.post('https://axqeajmn83.execute-api.eu-central-1.amazonaws.com/dev/venue-profile', that.restaurant, { headers: headers })
      .then((response) => {
        that.isLoading = false;
        console.log(response);
      });
    },
    getRestaurantData() {
      var that = this;

      var headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userSession.getIdToken().getJwtToken(),
      };

      axios.get('https://axqeajmn83.execute-api.eu-central-1.amazonaws.com/dev/venue-profile?accessToken='
        + this.userSession.getAccessToken().getJwtToken(), { headers: headers })
          .then((response) => {
            console.log(response.data);
          });
    },
    getCities() {
      var that = this;
      axios.get('https://axqeajmn83.execute-api.eu-central-1.amazonaws.com/dev/city')
        .then((resonse) => {
          that.cities = resonse.data.Items;
          console.log(resonse.data.Items);
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

input {
  margin: 16px;
}

#restaurantInfoForm {
  padding: 2%;
  background-color: #e3e3e3;
}

</style>
