import { getData, sendData } from '../api/form';

export default {
    state: {
        formData: null
    },
    actions: {
        async fetchData({commit}) {
            try {
                const res = await getData();

                commit('updateData', res.data);
            } catch(error) {
                console.error(error);
            }
        },
        async onSendData({commit}, payload) {
            try {
                const res = await sendData(payload);
            } catch(error) {
                console.error(error)
            }
        }
    },
    mutations: {
        updateData(state, payload) {
            state.formData = payload;
        }
    },
    getters: {
        formData(state) {
            return state.formData;
        }
    }
};