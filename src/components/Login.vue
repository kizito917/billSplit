<template>
    <div class="main-body">
        <h5>.</h5>
        <div class="bg">
            <div class="container">
                <div class="form-area">
                    <h5>Please Login your Account</h5>
                    <div class="alert alert-success" id="logIn-Success" v-if="loginOk">
                        Login successful
                    </div>
                    <div class="alert alert-danger" id="logIn-error" v-if="loginErr">
                        Incorrect Email/password combination
                    </div>
                    <form @submit.prevent="loginAccount" class="form">
                        <div class="form-group">
                            <input type="email" class="form-control" required placeholder="email" v-model="email">
                        </div>

                        <div class="form-group">
                            <input type="password" class="form-control" required placeholder="password" v-model="password">
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-success" id="sign-in"><i class="fas fa-paper-plane mr-2 text-white" ></i>SIGN IN</button>
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
      return {
          email: '',
          password: '',
          loginOk: false,
          loginErr: false
      }
  },
  methods: {
      loginAccount() {
          axios.post('https://billsplitapi.herokuapp.com/bills/login', {
              email: this.email,
              password: this.password
          })
          .then((res) => {
              localStorage.setItem('bearer_token', res.data.message.access_token)
              localStorage.setItem('bearer_name', res.data.message.user.username)
              localStorage.setItem('bearer_accountId', res.data.message.user.user_account_id)
              this.loginOk = true
              setTimeout(() => {
                  this.$router.push('/create_bill')
              }, 2000);
          })
          .catch((err) => {
              console.log(err),
              this.loginErr = true
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

.form {
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
}

#sign-in {
    margin-bottom: 20px;
}

#logIn-Success {
    text-align: center;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}

#logIn-error {
    text-align: center;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}
</style>