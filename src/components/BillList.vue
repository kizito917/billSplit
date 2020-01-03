<template>
    <div class="main-body">
        <div class="content-area">
            <h5>My Bill list</h5>
            <p>Hi i am {{ userName }}!!! I created the bills below for my friends</p>
            <ul>
                <li v-for="recipent in recipents" :key="recipent.bill_id">{{ recipent.email }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    computed: {
        recipents() {
            return this.$store.getters.billRecipents
        },
        userName() {
            return this.$store.getters.userName
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
    }

    .content-area {
        text-align: center;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
        padding-top: 50px;
    }
</style>