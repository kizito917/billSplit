<template>
    <div class="main-body">
        <div class="bg">
            <h5>.</h5>
            <div class="container">
                <div class="form-area">
                    <h5>Welcome to Billsplit!!! Please Register Below</h5>
                    <div class="alert alert-success" id="alert-div" v-if="created">
                        Account successfully created
                    </div>
                    <form @submit.prevent="createAccount" class="form">
                        <div class="form-group">
                            <input type="text" class="form-control" required placeholder="username" v-model="username">
                        </div>

                        <div class="form-group">
                            <input type="email" class="form-control" required placeholder="email" v-model="email">
                        </div>

                        <div class="form-group">
                            <input type="password" class="form-control" required placeholder="password" v-model="password">
                        </div>

                        <div class="form-group">
                            <button  type="submit" class="btn btn-success d-block mx-auto w-30"><i class="fas fa-paper-plane mr-2 text-white" ></i>SIGN UP</button><router-link to="/login" class="btn btn-warning" id="sign-in">Login</router-link>
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
          username: '',
          email: '',
          password: '',
          created: false
      }
  },
  methods: {
      createAccount() {
          axios.post('https://billsplitapi.herokuapp.com/bills/signup', {
              username: this.username,
              email: this.email,
              password: this.password
          })
          .then((res) => {
              console.log(res),
              this.created = true,
              setTimeout(() => {
                  this.$router.push('/login')
              }, 3000);
          })
          .catch((err) => {
              console.log(err)
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

#alert-div {
    text-align: center;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}
</style>