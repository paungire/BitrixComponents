import { defineStore } from "ui.vue3.pinia";

export const store = defineStore("store", {
	state: () => ({
		api_key: "",
	}),
	getters: {
		getApiKeyLength() {
			return this.api_key.length;
		},
	},
	actions: {
		setApiKey(key) {
			this.api_key = key;
		},
	},
});
