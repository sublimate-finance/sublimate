<script lang="ts">
	import type { TableData } from '../types/table-data'

	export let data: TableData = []
	export let primaryKey: string

	$: primaryKey = primaryKey || data[0]?.[primaryKey]


	import { flip } from "svelte/animate"
</script>

<table>
	<thead>
		<tr>
			{#each Object.keys(data[0]) as key}
				<th>{key}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Object.values(data) as row, i (primaryKey && row[primaryKey] || i)}
			<tr animate:flip>
				{#each Object.entries(row) as [key, value]}
					<td>
						<slot name="cell" {key} {value}>{value}</slot>
					</td>
				{/each}
			</tr>
		{:else}
			<slot></slot>
		{/each}
	</tbody>
</table>
