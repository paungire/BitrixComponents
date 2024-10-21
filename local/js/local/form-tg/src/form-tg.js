import { BitrixVue } from "ui.vue3";
import { createRouter, createWebHashHistory } from "ui.vue3.router";

import { createPinia } from "ui.vue3.pinia";
const store = createPinia();
import "./style.css";

import { Home } from "./pages/Home.js";
import { First } from "./pages/First.js";
import { Text } from "./components/Text.js";
import { Second } from "./pages/Second.js";
import { Third } from "./pages/Third.js";
import { Thanks } from "./pages/Thanks.js";

export class FormTg {
	#application;
	constructor(rootNode) {
		this.rootNode = document.querySelector(rootNode);
	}

	init() {
		const context = this;
		const routes = [
			{ path: "/", component: Home },
			{ path: "/first", component: First },
			{ path: "/second", component: Second },
			{ path: "/third", component: Third },
			{ path: "/thanks", component: Thanks },
			{
				path: "/:pathMatch(.*)*",
				redirect: "/",
			},
		];
		const router = createRouter({
			history: createWebHashHistory(),
			routes,
		});
		this.#application = BitrixVue.createApp({
			name: "FormTg",
			components: { Text },
			beforeCreate() {
				this.$bitrix.Application.set(context);
			},
			/* html */
			template: `
			<div class="application">
				<Text>
					<p><strong>Инструкция по созданию Telegram-бота</strong></p>
					<p>Для того чтобы настроить Telegram-бота и передать необходимые данные
					для интеграции вашего мини-приложения, выполните следующие шаги:</p>
				</Text>
				<router-view v-slot="{ Component }">
					<Transition>
						<Component :is="Component" />
					</Transition>
				</router-view>
			</div>
			`,
		});
		this.#application.use(router);
		this.#application.use(store);
		this.#application.mount(this.rootNode);
	}

	destroy() {
		this.#application.unmount();
	}
}
