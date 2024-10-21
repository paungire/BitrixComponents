import { Text } from "../components/Text";

export const Home = {
	name: "Home",
	components: { Text },
	/* html */
	template: `
    <Text>
      <p><strong>1. Создание бота через BotFather</strong></p>
      <blockquote>
      <p>1. Откройте приложение Telegram и найдите бота <a
      href="https://t.me/BotFather">BotFather</a>.</p>
      <p>2. Нажмите <strong>Start</strong> для начала работы с BotFather.</p>
      <p>3. Для создания нового бота введите команду /newbot.</p>
      <p>4. BotFather попросит вас ввести имя для вашего бота. Введите
      желаемое имя (например, “МойБот”).</p>
      <p>5. Далее потребуется указать уникальное имя пользователя (username)
      для бота. Оно должно оканчиваться на слово bot (например,
      MyTestBot).</p>
      <p>6. После успешного создания BotFather выдаст вам <strong>токен
      API</strong>. Этот токен понадобится для интеграции бота с нашей
      системой.</p>
      </blockquote>
    </Text>
    <RouterLink to="/first">
        <button class="btn btn-primary">Далее</button>
    </RouterLink>
    <Text>
      <p>Если у вас возникли какие-либо вопросы, вы всегда можете обратиться к
      нашему менеджеру поддержки.</p>
    </Text>
  `,
};
