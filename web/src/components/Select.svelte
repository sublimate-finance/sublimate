<script lang="ts">
	export let options = []
	export let value
</script>

<style>
	label {
		display: contents;
	}

	input[type="radio"] {
		display: none;
	}

	span {
		display: inline-flex;

		background-color: transparent;
		border-radius: 1rem;
		padding: 0.2em 0.8em;
		opacity: 0.66;

		transition: 0.3s;

		cursor: pointer;
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
</style>

{#each options as option}
	<label class="select-option">
		<input type="radio" bind:group={value} value={option}>
		<span>{option}</span>
	</label>
{/each}