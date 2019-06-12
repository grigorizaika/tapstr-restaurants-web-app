<template>
  <b-container fluid class="h-100">
    <b-row>
      <b-col cols='3'>

      </b-col>
      <b-col cols='6'>
        <div id="restaurantInfoForm" v-if="signedIn" align="center">
          <b-input type="text" placeholder="Name" name="name_field" v-model="restaurant_name" class="w-75"></b-input>
          <b-input type="email" placeholder="Email" name="email_field" v-model="restaurant_email" class="w-75"></b-input>
          <b-input type="text" placeholder="City" name="city_field" v-model="restaurant_city" class="w-75"></b-input>

          <b-button @click="submitRestaurantData()">Submit</b-button>
        </div>
        <amplify-authenticator v-if="!signedIn"></amplify-authenticator>
      </b-col>
      <b-col cols='3'>
        <amplify-sign-out v-if="signedIn"></amplify-sign-out>
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
      signedIn: false,

      restaurant_name: "",
      restaurant_email: "",
      restaurant_city: ""
    }
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on('authState', info => {
      if(info === "signedIn") {
        this.findUser();
      } else {
        this.signedIn = false;
      }
    });
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.signedIn = true;
        console.log(user);
      } catch (err) {
        this.signedIn = false;
      }
    },
    submitRestaurantData() {
      axios.post('https://axqeajmn83.execute-api.eu-central-1.amazonaws.com/dev/user-sign-up', {
        name: this.restaurant_name,
        email: this.restaurant_email,
        city: this.restaurant_city
      }).then((response) => {
        window.console.log(response);
        this.restaurant_name="";
        this.restaurant_email="";
        this.restaurant_city="";
      });
    }
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
