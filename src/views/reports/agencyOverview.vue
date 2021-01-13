<template>
    <div class="container">
        <line-chart
                v-if="loaded"
                :chartData="chartData"
                :options="options"/>
    </div>
</template>

<script>
    import LineChart from '../../components/charts/Line'

    export default {
        name: 'AgencyOverviewReport',
        components: { LineChart },
        data: () => ({
            loaded: true,
            chartData: {

                labels: ['January', 'February', 'February', 'February', 'February'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [0,70,60,30, 20]
                    },
                    {
                        label: 'Data Two',
                        backgroundColor: 'green',
                        data: [0,20,40, 10,50]
                    }
                ]

            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }),
        // async mounted () {
        //     this.loaded = false
        //     try {
        //         const { userlist } = await fetch('/api/userlist')
        //         this.chartData = userlist
        //         this.loaded = true
        //     } catch (e) {
        //         console.error(e)
        //     }
        // }
    }
</script>