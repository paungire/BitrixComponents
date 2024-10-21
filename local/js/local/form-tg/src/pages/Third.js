import { Text } from "../components/Text";

export const Third = {
	name: "Third",
	components: { Text },
	data() {
		return {
			dataArr: {},
		};
	},
	mounted() {
		BX.ajax
			.runComponentAction("custom:form-tg", "getBotData", {
				mode: "class",
			})
			.then(
				(response) => {
					this.dataArr = response?.data;
					if (!this.dataArr.message_id) {
						this.$router.push("/");
					}
				},
				(response) => {
					console.error(response);
					this.$router.push("/");
				}
			);
	},
	methods: {
		confirm() {
			BX.ajax
				.runComponentAction("custom:form-tg", "confirm", {
					mode: "class",
				})
				.then(
					(response) => {
						if (response?.data) {
							this.$router.push("/thanks");
						}
					},
					(response) => {
						console.error(response);
						this.$router.push("/");
					}
				);
		},
	},
	/*html*/
	template: `
  <Text>
    <p><strong>4. Подтверждение данных</strong></p>
    <p><strong>Ваш аккаунт:</strong></p>
    <blockquote>

    <template v-if="!dataArr?.chat?.username">
      <p><div class="skeleton h-6 w-full"></div></p>
      <p><div class="skeleton h-40 w-40"></div></p>
    </template>
    <template v-else>
      <p>{{dataArr?.chat?.first_name}} {{dataArr?.chat?.last_name}} <strong>@{{dataArr?.chat?.username}}</strong></p>
      <p>
        <div class="avatar">
          <div class="rounded-xl w-40">
            <img :src="dataArr?.photo"/>
          </div>
        </div>
      </p>
    </template>

    </blockquote>
    <p><strong>Ваш бот:</strong></p>
    <blockquote>

      <p v-if="!dataArr?.from?.username"><div class="skeleton h-6 w-full"></div></p>
      <p v-else>{{dataArr?.from?.first_name}} <strong>@{{dataArr?.from?.username}}</strong></p>

    </blockquote>
  </Text>

  <div class="join">
    <button @click="$router.back()" class="btn btn-outline join-item">Назад</button>
    <button @click="confirm" class="btn btn-primary join-item">Подтвердить</button>
  </div>

  <Text>
    <p>Если у вас возникли какие-либо вопросы, вы всегда можете обратиться к
    нашему менеджеру поддержки.</p>
  </Text>
  `,
};
