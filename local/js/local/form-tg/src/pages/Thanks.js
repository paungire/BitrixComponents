import { Alert } from "../components/Alert";
import { Text } from "../components/Text";

export const Thanks = {
	name: "Thanks",
	components: { Text, Alert },
	data() {
		return {
			go: false,
		};
	},
	mounted() {
		setTimeout(() => {
			this.go = true;
		}, 500);
	},
	/*html*/
	template: `
  <Text style="margin-bottom: 100px;">
    <p><strong>Всё готово!</strong></p>
  </Text>
  <Alert :open="go" :type="'success'">Ваш бот успешно подключен и настроен для работы с нашей системой. Теперь вы сможете получать заявки и уведомления через него.</Alert>
  `,
};

{
	/* <Alert :open="go" :type="'success'">Спасибо за сотрудничество! Если у вас возникнут вопросы или потребуется помощь, наша команда поддержки всегда готова помочь.</Alert> */
}
