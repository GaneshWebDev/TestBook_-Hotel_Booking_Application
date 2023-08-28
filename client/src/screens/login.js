import React, { useState } from 'react';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import Error from '../components/error';
import Loading from '../components/loading';
import Success from '../components/success';
import Invalid from '../components/invalidLogin';
const Login = () => {
    const [loading,setloading]=useState(false);
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
    const [inValid,setInvalid]=useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage]=useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const user={
        email,
        password
    }
    axios.post('/login',user).then(
        response=>{
            setloading(true);
            if(response.status==200){
                console.log('success',response.data);
                setMessage(response.data.message);
                setSuccess(true);
                localStorage.setItem('user', JSON.stringify(response.data.userData));
                window.location.href='/home';
            }
            console.log(response.status);
            setloading(false);
        }
    ).catch(err=>{
        setloading(false);
        console.log(err);
        setInvalid(true);
        setMessage('Incorrect username or password');
    })
  };
  if(loading){
        return(<Loading/>)
    }else if(error){
        return(<Error/>)
    }
  return (
    <Container>
        {success?<Success message={message}/>:inValid ?<Invalid message={message}/>: <h2 className="text-uppercase text-center mb-5">Login</h2>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="email"
            id="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            id="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button color="primary">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
