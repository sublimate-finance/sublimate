<script>
    export let user
</script>

<div class="flex flex-col rounded-md overflow-hidden w-full">
    <div class="flex flex-row font-semibold text-gray-900">
        <button class="flex-1 flex flex-row items-center justify-center p-3 bg-white shadow-inner">
            Donations
        </button>
        <button class="flex-1 flex flex-row items-center justify-center p-3 bg-white bg-opacity-20">
            Summary
        </button>
        <button class="flex-1 flex flex-row items-center justify-center p-3 bg-white bg-opacity-20">
            Supporting
        </button>
    </div>
    <div class="p-4 bg-white">
        <table class="table-auto w-full border-separate text-gray-600" style="border-spacing: 1rem;">
            <thead>
                <tr>
                    <th>Asset</th>
                    <th>Rate</th>
                    <th># of donators</th>
                    <th>%</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="flex flex-row items-center justify-center space-x-2">
                            <img src="/images/token/eth.png" alt="eth" class="w-5 h-5 rounded-full" />
                            <span>ETH</span>
                        </div>
                    </td>
                    <td><div class="flex flex-row items-center justify-center"><b class="font-bold">7.85 ETH</b>/month</div></td>
                    <td><div class="flex flex-row items-center justify-center">12</td>
                    <td>90%</td>
                </tr>
                <tr>
                    <td>
                        <div class="flex flex-row items-center justify-center space-x-2">
                            <img src="/images/token/dai.png" alt="dai" class="w-5 h-5 rounded-full" />
                            <span>DAI</span>
                        </div>
                    </td>
                    <td><div class="flex flex-row items-center justify-center"><b class="font-bold">23.4 DAI</b>/month</div></td>
                    <td><div class="flex flex-row items-center justify-center">3</td>
                    <td>10%</td>
                </tr>
                <!-- <tr>
                    <td class="py-1">
                        <div class="flex flex-row items-center justify-center space-x-2">
                            Total
                        </div>
                    </td>
                    <td>Rate</td>
                    <td># of donators</td>
                    <td>%</td>
                </tr> --> <!-- TODO: compute total in which currency? usd? -->
            </tbody>
        </table>
    </div>
</div>