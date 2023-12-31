import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/emoji.avif"

const Form= ({
    isSignInPage = true,
}) => {
    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ''
        }),
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
      console.log("data :>> ", data);
      e.preventDefault();
      const res = await fetch(
        `https://chatapplication-kgba.onrender.com/api/${isSignInPage ? "login" : "register"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      if (res.status === 400) {
        alert("Invalid credentials");
      } else {
        const resData = await res.json();
        if (resData.token) {
          localStorage.setItem("user:token", resData.token);
          localStorage.setItem("user:detail", JSON.stringify(resData.user));
          navigate("/");
  
        }
      }
    };

  return (
    <div className="bg-light h-screen flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
<div className="bg-light h-screen flex items-center justify-center">
    <div className=" bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className=" text-4xl font-extrabold">Welcome {isSignInPage && 'Back'}</div>
        <div className=" text-xl font-light mb-14">{isSignInPage ? 'Sign in to get explored' : 'Sign up to get started'}</div>
        <form className="flex flex-col items-center w-full" onSubmit={(e)=>handleSubmit(e)}>
        { !isSignInPage &&<Input label="Full Name" name="name" placeholder="Enter your full name" className="mb-6 w-[50%]"value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value }) }/>}
        <Input label="Email address"type="email" name="email" placeholder="Enter your email" className="mb-6 w-[50%]" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value }) }/>
        <Input label="password"type="password" name="password" placeholder="Enter your password" className="mb-6 w-[50%]" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value }) }/>
        <Button label={isSignInPage ? 'Sign in': 'Sign up'} type='submit'className="w-1/2 mb-2"/>
        </form>
        <div>{ isSignInPage ? "Didn't have an account?" : "Already have an account?"} <span className="text-primary cursor-pointer underline" onClick={() =>
              navigate(`/users/${isSignInPage ? "sign_up" : "sign_in"}`)
            }>
          {isSignInPage ? 'sign up' : 'sign in'}</span>
          <div className=" w-1/1 mb-2"><p><strong>Sample Credentials</strong></p></div>
         <div className=" w-1/1 mb-2"><strong>username : admin@chat.com  password : admin1234</strong></div>
        <div className=" w-1/1 mb-2"><strong>username : sowmya@chat.com  password : sowmya123</strong></div>
          </div>
          </div>
        </div>
</div>

        )

}

export default Form;