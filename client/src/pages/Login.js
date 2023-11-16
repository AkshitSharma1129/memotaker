import React from 'react'

const Login = () => {
  return (
    <div>
   <form action="">
<div >Login Here!</div>
<div >
  <input type="text" placeholder="username" />
</div>
<div>
  <input type="password" placeholder="password"  />
  <div class="cut cut-short"></div>
  {/* <label for="password" class="placeholder">Email</label> */}
</div>
            <button type="text" class="submit">Login</button>
        </form>
    </div>
  )
}

export default Login;