<template>
    <div class="main-body">
        <div class="content-area">
            <h5>{{ pageTitle }}</h5>
            <p><strong>Hi i am {{ userName }}!!! I created the bills below for my friends</strong></p>
            <div class="billInfo-area">
                <p><b>Bill Title:</b> {{ billTitle }}</p>
                <p><b>Bill Description:</b> {{ billDescription }}</p>
            </div>
            <table class="table table-stripped table-bordered">
                <thead>
                    <tr>
                        <td><strong>Bill ID</strong></td>
                        <td><strong>User Email</strong></td>
                        <td><strong>Amount Billed</strong></td>
                    </tr>
                </thead>
                <tbody v-for="recipent in recipents" :key="recipent.bill_id">
                    <tr>
                        <td>{{ recipent.bill_id }}</td>
                        <td>{{ recipent.email }}</td>
                        <td>&#x20A6;{{ recipent.amount }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            pageTitle: 'My Bill list'
        }
    },
    computed: {
        recipents() {
            return this.$store.getters.billRecipents
        },
        userName() {
            return this.$store.getters.userName
        },
        billTitle() {
            return this.$store.getters.billTitleName
        },
        billDescription() {
            return this.$store.getters.billDescriptionName
        }
    },
    created() {
        this.$store.dispatch('getBillList')
    },
    mounted() {
        this.$store.dispatch('getName')
    }
}
</script>

<style scoped>
    .main-body {
        background-color: whitesmoke;
        height: 650px;
    }

    .content-area {
        text-align: center;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        padding-top: 50px;
    }

    h5 {
        text-decoration: underline;
    }
</style>