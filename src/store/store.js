import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userRestaurant: undefined,
        userSession: undefined,
    },
    mutations: {
        changeUserRestaurant(state, userRestaurant) {
            state.userRestaurant = userRestaurant
            console.log('Changing Restaurant in the store ')
            console.log(state.userRestaurant)
        },
        changeUserSession(state, userSession) {
            state.userSession = userSession
        }
    },
    getters: {
        userRestaurant: state => state.userRestaurant,
        userSession: state => state.userSession,
        isUserSignedIn: state => state.userRestaurant !== undefined
    }
})
