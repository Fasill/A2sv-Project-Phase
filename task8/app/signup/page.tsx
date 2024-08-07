'use client'
import React, { useEffect, useState } from 'react'
import SignUp from '../components/auth/SignUp';
import VerifyEmail from '../components/auth/VerifyEmail';
const Page = () => {
  const [val, setVal] = useState<number>(0)
  const [email, setEmail] = useState<string>("")
  const next = (data: number) => {
    setVal(data)
  } 
  useEffect(()=>{
    console.log("val,","val",val)
  },[val])
  const passedEmail = (email: string) => {
    setEmail(email)
  }
  return (
    <div>
    
      {val===0&&<SignUp onNext={next} PassedEmail = {passedEmail} /> }
    
      {val===1&&<VerifyEmail onNext={next} email={email}/> }
    
    </div>
  )
}

export default Page
