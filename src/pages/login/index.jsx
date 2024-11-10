import React from 'react'
import AuthenTemplate from '../../components/authen-template';
import { Button, Form, Input } from "antd"
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../config/firebase';
import {Link, useNavigate} from 'react-router-dom'
import api from '../../config/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/userSlice';

function LoginPage() {
  const navigate = useNavigate();

  // luu vao redux: useDispatch();
  // lay du lieu ra: useSelector();

  const dispatch = useDispatch();

  const handleLoginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const handleLogin = async (values) => {
    try{  
      const response = await api.post('account/login', values);
      toast.success("Success")
      dispatch(login(response.data))
      const {role , token} = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("uid", response.data.id);

      navigate("/");
      if (role === 'USER') {   
        navigate("/");
      } else if (role === 'ADMIN') {
        navigate("/admin");
      }
    } catch(err) {
      toast.error(err.response.data);
    }
  }

  return (
    <AuthenTemplate>
      <br/>
      <h2>Welcome to Boo Caffee! 👋</h2>
      <p>Please sign-in to your account and start the adventure</p><br/><br/>
      <Form  
        labelCol={{
          span: 24,
        }}
        onFinish={handleLogin}
        >
        <Form.Item label="Username" name="username" rules={[
          {
            required: true,
            message: "Please input your Username!",
          }
        ]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[
          {
            required: true,
            message: "Please input your password!",
          }
        ]}>
          <Input.Password />
        </Form.Item>

        <div>
          <Link to= "/register">Don't have account ? Register new account</Link>
        </div>

        <Button type='primary' htmlType='submit'>
          Login
        </Button>

        <Button onClick={handleLoginGoogle}>Login google</Button>
      </Form>
    </AuthenTemplate>
  )
}

export default LoginPage;