import { Text } from "../components/Text";
import { Alert } from "../components/Alert";
import { store } from "../store";
import { mapState, mapActions } from "ui.vue3.pinia";

import { Otp } from "../components/Otp";

export const Second = {
	name: "Second",
	components: { Text, Alert, Otp },
	data() {
		return {
			error: false,
			formOpen: false,
			timer: 0,
		};
	},
	mounted() {
		if (this.api_key.length < 46) {
			this.$router.push("/first");
		}
	},
	computed: {
		...mapState(store, ["api_key"]),
	},
	methods: {
		sendMessage() {
			if (this.timer > 0) {
				return;
			}
			this.timer = 60;
			let interId = setInterval(() => {
				this.timer--;
				if (this.timer === 0) {
					clearInterval(interId);
				}
			}, 1000);
			BX.ajax
				.runComponentAction("custom:form-tg", "getUserId", {
					mode: "class",
					data: {
						api_key: this.api_key,
					},
				})
				.then(
					(response) => {
						console.log(response?.data);
						this.formOpen = true;
					},
					(response) => {
						console.error(response);
						this.error = true;
					}
				);
		},
		otpComplete(code) {
			BX.ajax
				.runComponentAction("custom:form-tg", "otpConfirm", {
					mode: "class",
					data: {
						code: code,
					},
				})
				.then(
					(response) => {
						if (response?.data === true) {
							this.$router.push("/third");
						} else {
							this.error = true;
						}
					},
					(response) => {
						console.error(response);
						this.error = true;
					}
				);
		},
	},
	/*html*/
	template: `
    <Text>
      <p><strong>3. Получение вашего Telegram ID</strong></p>
      <p>Для того чтобы мы могли отправлять вам заявки через бота, нам
      потребуется ваш <strong>Telegram ID</strong>. Вот как его можно
      получить:</p>
      <blockquote>
      <p>1. В вашем созданном боте отправьте любое сообщение (например,
      “Привет”).</p>
      <p>2. Мы отправим вам код, который нужно будет ввести в поле ниже.</p>
      </blockquote>
    </Text>

    <Otp :error="error" :open="formOpen" :count="6" @complete="otpComplete" @input="error=false"/>
    <Alert :open="error" :type="'error'">Неверный код</Alert>

    <div class="join">
			<button @click="$router.back()" class="btn btn-outline join-item">Назад</button>
			<button @click="sendMessage" class="btn btn-primary join-item" :disabled="timer!=0">
				<span v-if="timer==0">Получить код</span>
				<span v-else class="countdown">
					<span :style="{'--value':timer}"></span>
				</span>
			</button>


		</div>

		<Text>
			<p>Если у вас возникли какие-либо вопросы, вы всегда можете обратиться к
			нашему менеджеру поддержки.</p>
		</Text>
  `,
};
