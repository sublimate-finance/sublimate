<script>
    export let i
    export let amount
    export let currency
    export let rate
    export let from
    export let side
</script>

<tr>
    <td class="{side === "left" ? "rounded-l-md" : ""} bg-white {i % 2 === 0 ? "bg-opacity-50" : "bg-opacity-0"} pl-2 py-2">
        <img src="/images/token/{currency.toLowerCase()}.png" alt="{currency}" class="w-5 h-5 rounded-full" />
        <span>{currency}</span>
    </td>
    <td class="pl-2 bg-white {i % 2 === 0 ? "bg-opacity-50" : "bg-opacity-0"}"><b class="font-bold">{amount} {currency}</b>/{rate}</td>
    <td class="pl-2 bg-white {i % 2 === 0 ? "bg-opacity-50" : "bg-opacity-0"} {side === "right" ? "rounded-r-md" : ""}">{from}</td>
</tr>