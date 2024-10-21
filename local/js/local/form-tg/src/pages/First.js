import { Text } from "../components/Text";
import { Alert } from "../components/Alert";

import { store } from "../store";
import { mapState, mapActions } from "ui.vue3.pinia";

export const First = {
	name: "First",
	components: { Text, Alert },
	data() {
		return {
			error: false,
			progress: false,
		};
	},
	computed: {
		...mapState(store, ["api_key"]),
	},
	methods: {
		sendApiKey() {
			this.progress = true;
			BX.ajax
				.runComponentAction("custom:form-tg", "sendApiKey", {
					mode: "class",
					data: {
						api_key: this.api_key,
					},
					analyticsLabel: {
						viewMode: "grid",
						filterState: "closed",
					},
				})
				.then(
					(response) => {
						this.progress = false;
						if (response.data.response.ok) {
							this.error = false;
							this.$router.push("/second");
						} else {
							this.error = true;
						}
					},
					(response) => {
						//сюда будут приходить все ответы, у которых status !== 'success'
						console.log(response);
					}
				);
		},
		onEnter() {
			if (this.api_key.length >= 46) this.sendApiKey();
		},
		...mapActions(store, ["setApiKey"]),
	},
	watch: {
		api_key(newValue) {
			if (newValue.length > 0) {
				this.error = false;
			}
		},
	},
	/*html*/
	template: `
    <Text>
      <p><strong>2. Передача токена API нам</strong></p>
      <blockquote>
      <p>1. Скопируйте <strong>токен API</strong>, который вы получили от
      BotFather.</p>
      <p>2. Вставьте токен ниже в соответствующее поле. Мы используем его для связи вашего
      бота с нашей системой.</p>
      </blockquote>
    </Text>

    <label class="input input-bordered flex items-center gap-2 mb-8 input-primary" :class="{'input-error':error}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-4 w-4 opacity-70">
        <path
          fill-rule="evenodd"
          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
          clip-rule="evenodd" />
      </svg>
      <input type="password" class="grow" @input="(e)=>setApiKey(e.currentTarget.value)" :value="api_key" @keyup.native.enter="onEnter"/>
      <span ref="progress" class="loading loading-spinner loading-md transition-all" :class="{'opacity-100':progress, 'opacity-0':!progress}"></span>
    </label>
    <Alert :open="error" :type="'error'">Api ключ не найден</Alert>

    <div class="join">
      <button @click="$router.back()" class="btn btn-outline join-item">Назад</button>
      <button @click="sendApiKey" class="btn btn-primary join-item" :disabled="api_key.length<46 || error">Далее</button>
    </div>

		<Text>
			<p>Если у вас возникли какие-либо вопросы, вы всегда можете обратиться к
			нашему менеджеру поддержки.</p>
		</Text>
  `,
};
