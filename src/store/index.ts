import Vue from 'vue'
import Vuex from 'vuex'
import { User, IUser }  from "@/classes/user"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        layout      : <string> "left-layout",
        bottom      : <boolean> false,
        userList    : <Array<IUser>> [],
        loaded      : <boolean> false,
        loading     : <boolean> false,
        settings    : <object> {
            "left-layout-bottom" : {
                leftPanel	: 50,
                topPanel	: 65,
                template	:
                    "'master   vResizer slave'" 		+
                    "'hResizer hResizer hResizer'" 		+
                    "'console  console  console'" 		+
                    "'. . .'",
            },

            "right-layout-bottom" : {
                leftPanel	: 50,
                topPanel	: 65,
                template	:
                    "'slave    vResizer  master'"		+
                    "'hResizer hResizer hResizer'"		+
                    "'console  console  console'"		+
                    "'. . .'",
            },

            "left-layout" : {
                leftPanel	: 50,
                topPanel	: 65,
                template	:
                    "'master  vResizer slave'"			+
                    "'master  vResizer hResizer'"		+
                    "'master  vResizer console'" 		+
                    "'master  vResizer .'",
            },

            "right-layout" : {
                leftPanel	: 50,
                topPanel	: 65,
                template	:
                    "'slave     vResizer  master' " 	+
                    "'hResizer  vResizer  master'" 		+
                    "'console   vResizer  master'" 		+
                    "'.         vResizer  master'",
            },
        },
    },

    mutations: {
        setLayout(state, layout){
            state.layout = layout;
        },

        setBottomLayout(state, bottom){
            state.bottom = bottom;
        },

        addNewUserToList(state, data){
            state.userList.push(new User(data));
        },

        setLoading(state, data){
            state.loading = data;
        },

        setDataLoaded(state){
            state.loaded = true;
        },

        setNewSettings(state, settings){
            state.settings = settings;
        }
    },

    actions: {
        setLayout(context, val){
            context.commit('setLayout', val);
            return context.dispatch('updateSettings');
        },

        setBottomLayout(context, val){
            context.commit('setBottomLayout', val);
            setTimeout(()=>window.dispatchEvent(new Event('resize')));
            return context.dispatch('updateSettings');
        },

        fetchUsersData(context){

            context.dispatch('restoreSettings'); // этого не должно здесь быть

            if (context.state.loaded){ return Promise.resolve(context.state.userList) }

            context.commit('setLoading', true);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);

            return fetch('https://run.mocky.io/v3/34c351e6-c7e2-422b-84e5-c0cc959127ac', {
                method  : 'GET',
                mode    : 'cors',
                signal  : controller.signal,
                headers : { 'Content-Type': 'application/json' }
            })
                .then((response) => {
                    clearTimeout(timeout);

                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error(`Something went wrong. Oops: ${response.status}`);
                    }
                })
                .then((snapshot) => snapshot.forEach((data: IUser) => context.commit('addNewUserToList', data)))
                .then(() => {
                    context.commit('setDataLoaded');
                    return context.state.userList;
                })
                .catch((err => console.warn(err)))
                .finally(()=>  setTimeout(() => context.commit('setLoading', false), 500));
        },

        updateSettings(context) {
            let json = JSON.stringify({
                settings: context.state.settings,
                layout  : context.state.layout,
                bottom  : context.state.bottom,
            });
            localStorage.setItem("layout-settings", json);
        },

        restoreSettings(context){
            try {
                let json = localStorage.getItem("layout-settings");
                if (json && json !== 'null') {
                    const settings = JSON.parse(json);
                    settings.settings   && context.commit('setNewSettings', settings.settings);
                    settings.layout     && context.commit('setLayout', settings.layout);
                    settings.bottom     && context.commit('setBottomLayout', settings.bottom);
                }
            }
            catch (err) {
                console.log('error reading local storage->' + err.message());
            }
        },
    },

    getters: {
        getUserList: state => state.userList,
    },

    modules: {

    }
})
