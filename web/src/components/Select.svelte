<script lang="ts">
	export let options = []
	export let value

	// Display options
	export let style: 'full' | 'pill' = 'pill'
</script>

<style>
	/* label {
		display: contents;
	} */

	label.style-full {
		display: grid;
	}

	input[type="radio"] {
		display: none;
	}

	span {
		display: inline-flex;
		justify-content: center;

		background-color: transparent;
		opacity: 0.66;

		transition: 0.3s;

		cursor: pointer;
	}
	.style-pill span {
		border-radius: 1rem;
		padding: 0.2em 0.8em;
	}
	.style-full span {
		padding: 0.75em 1em;
	}
	span:hover {
		opacity: 0.9;
	}
	input[type="radio"]:checked ~ span {
		background-color: rgba(255, 255, 255, 0.75);

		font-weight: bold;

		opacity: 1;

		box-shadow: rgba(231, 145, 245, 0.267) 0px 2px 4px;
	}
	.style-full:first-child span {
		border-top-left-radius: var(--border-radius);
		border-bottom-left-radius: var(--border-radius);
	}
	.style-full:last-child span {
		border-top-right-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
	}
</style>

{#each options as option}
	<label class="select-option style-{style}">
		<input type="radio" bind:group={value} value={option}>
		<span>{option}</span>
	</label>
{/each}
