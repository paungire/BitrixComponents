<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/form-tg.bundle.css',
	'js' => 'dist/form-tg.bundle.js',
	'rel' => [
		'main.polyfill.core',
		'ui.vue3',
		'ui.vue3.router',
		'ui.vue3.pinia',
	],
	'skip_core' => true,
];
