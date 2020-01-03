<template>
    <div class="main-body">
        <h5>.</h5>
        <div class="bg">
            <div class="container">
                <div class="form-area">
                    <h5>Welcome Back "{{ userName }}"</h5> 
                    <router-link to="/my_billList" style="text-align: center;">View Created Bills</router-link>
                    <p>Kindly create a bill for you and your friends</p>
                    <div class="alert alert-success" id="bill-Success" v-if="billCreated">
                        Bill Succesfully created
                    </div>
                    <div class="alert alert-danger" id="bill-error" v-if="billCreatedErr">
                        Unable to generate bill
                    </div>
                    <form @submit.prevent="createBill" class="form">
                        <div class="form-group">
                            <input type="text" class="form-control" required placeholder="Bill Title" v-model="billTitle">
                        </div>
                    
                        <div class="form-group">
                            <input type="text" class="form-control" required placeholder="Bill Description" v-model="billDescription">
                        </div>

                        <div class="form-group">
                            <p>Fill In Your Friends Email and the amount you wanna charge them</p>
                        </div>

                        <div class="two-friends">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="email" class="form-control" required placeholder="Friend Email" v-model="email">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="number" class="form-control" required placeholder="Amount Charged" v-model="amount">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="email" class="form-control" required placeholder="Friend Email" v-model="email1">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="number" class="form-control" required placeholder="Amount Charged" v-model="amount1">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-success" id="sign-in"><i class="fas fa-paper-plane mr-2 text-white" ></i>Create Bill</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return{
            billCreated: false,
            billCreatedErr: false,
            email: '',
            amount: '',
            email1: '',
            amount1: '',
            billTitle: '',
            billDescription: ''
        }
    },
    computed: {
        userName() {
            return this.$store.getters.userName
        }
    },
    mounted() {
        this.$store.dispatch('getName')
    },
    methods: {
        chooseTwo() {
            this.twoFriends = true
        },
        createBill() {
            //Getting the email and prices assigned to user's Friends
            let gottenRecipents = [
                {
                    email: this.email,
                    amount: this.amount + '.00'
                },
                {
                    email: this.email1,
                    amount: this.amount1 + '.00'
                }
            ]
            //setting the config headers for API call
            const config = {
                headers: {
                    'authorization': localStorage.getItem('bearerToken')
                }     
            }
            axios.post('https://billsplitapi.herokuapp.com/bills/create', {
                user_account_id: localStorage.getItem('bearer_accountId'),
                title: this.billTitle,
                description: this.billDescription,
                recipients: gottenRecipents
            }, config)
            .then((res) => {
                console.log(res),
                this.billCreated = true  //setting the success message alert to true
            })
            .catch(err => {
                console.log(err),
                this.billCreatedErr = true  //setting the error message alert to true
            })
        }
    }
}
</script>

<style scoped>
    .main-body {
   background-image: url(../assets/vesicash-750x400.png);
   background-size: cover;
   min-height: 100vh;
}
.form-area {
    margin-top: 100px;
    background-color: whitesmoke;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}

.form-area> h5 {
    text-align: center;
    padding-top: 20px;
}

.form-area> p {
    text-align: center;
}

.form {
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
}

#sign-in {
    margin-bottom: 20px;
}

#bill-Success {
    text-align: center;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}

#bill-error {
    text-align: center;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}
</style>