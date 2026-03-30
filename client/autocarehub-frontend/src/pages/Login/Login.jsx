import { useState } from "react";
import { Button } from  "@/components/ui/button"

function Login() {

  const[email, setEmail] = useState("");
  const [password, setPassword = useState("")

  return <>

    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="auth-card">
          <h1 className="auth-title">Login</h1>

          {/* formgroup */}
          <div className="form-group">
            <label className="form-label">Email</label>
              {/* input */}
              <input 
              type="email"
              className="form-input"
              placeholder="Enter Your Email"
              value={email}

              onChange={(e)=>{
                e.target.value
              }}

              />

          </div>


          {/* password */}
          <div className="form-group">
                
          </div>

      </div>
    </div>
  </>
  
}