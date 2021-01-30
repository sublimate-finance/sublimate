<script lang="ts">
	import { Router } from "@roxi/routify"
	import { routes } from "../.routify/routes"
</script>

<style global>
	@import "../assets/fonts/fonts.css";
	@import "../assets/global.css";

	/* @import "tailwindcss/base.css";
	@import "tailwindcss/components.css"; */
	@import "tailwindcss/utilities.css";
</style>

<Router {routes} />
