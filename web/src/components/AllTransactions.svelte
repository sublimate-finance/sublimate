<script>
	import TransactionRow from './TransactionRow.svelte'
	export let user
</script>

<div class="flex flex-col items-center w-full space-y-4">
	<span class="text-gray-900 font-bold">All transactions</span>
	<div class="flex flex-row space-x-8 w-full text-sm">
		<div class="flex flex-row w-1/2 justify-end">
			<div class="flex flex-row items-center px-6 py-1 bg-primary-100 bg-opacity-25 shadow-inner rounded-md space-x-4 text-gray-600">
				<button class="w-16">block</button>
				<button class="w-16 text-gray-900 px-3 py-0.5 shadow-inner bg-white rounded-full">day</button>
				<button class="w-16">month</button>
				<button class="w-16">year</button>
			</div>
		</div>
		<div class="flex flex-row w-1/2 justify-start">
			<div class="flex flex-row items-center w-64">
				<button class="flex flex-row w-1/2 items-center justify-center px-4 py-2 bg-primary-100 bg-opacity-25 rounded-l-md shadow-inner">
					Filter
				</button>
				<button class="flex flex-row w-1/2 items-center justify-center px-4 py-2 bg-primary-100 bg-opacity-10 rounded-r-md ">
					By rate
				</button>
			</div>
		</div>
	</div>
	<div class="relative flex flex-row space-x-0 w-full max-w-6xl mx-auto bg-primary-100 bg-opacity-10 rounded-md">
		<div class="flex-1 flex flex-col items-start">
			<span class="px-8 py-4 font-bold">Donations</span>
			<table class="table-auto text-xs w-full text-gray-600 pl-4 text-left" style="border-spacing: 0rem;">
				<thead>
					<tr>
						<th class="pl-2 pb-2">Asset</th>
						<th class="pl-2 pb-2">Rate</th>
						<th class="pl-2 pb-2">From</th>
					</tr>
				</thead>
				<tbody>
					<TransactionRow currency="ETH" amount="7.85" rate="month" from="0x32Be343B94f860124dC4fEe278FDCBD38C102D88" i={0} side="left" />
					<TransactionRow currency="ETH" amount="7.85" rate="month" from="0x32Be343B94f860124dC4fEe278FDCBD38C102D88" i={1} side="left" />
					<TransactionRow currency="ETH" amount="7.85" rate="month" from="0x32Be343B94f860124dC4fEe278FDCBD38C102D88" i={2} side="left" />
					<TransactionRow currency="ETH" amount="7.85" rate="month" from="0x32Be343B94f860124dC4fEe278FDCBD38C102D88" i={3} side="left" />
				</tbody>
			</table>
		</div>
		<div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-900 bg-opacity-10" />
		<div class="flex-1 flex flex-col items-end">
			<span class="px-8 py-4 font-bold">Supporting</span>
			<table class="table-auto text-xs w-full text-gray-600 pr-4 text-left" style="border-spacing: 0rem;">
				<thead>
					<tr>
						<th class="pl-2 pb-2">Asset</th>
						<th class="pl-2 pb-2">Rate</th>
						<th class="pl-2 pb-2">From</th>
					</tr>
				</thead>
				<tbody>
					<TransactionRow currency="ETH" amount="7.85" rate="month" from="0x32Be343B94f860124dC4fEe278FDCBD38C102D88" i={0} side="right" />
					<TransactionRow currency="ETH" amount="7.85" rate="month" from="0x32Be343B94f860124dC4fEe278FDCBD38C102D88" i={1} side="right" />
				</tbody>
			</table>
		</div>
	</div>
</div>
