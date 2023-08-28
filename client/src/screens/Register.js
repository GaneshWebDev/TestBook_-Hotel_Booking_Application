import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import Error from '../components/error';
import Success from '../components/success';
import Loading  from '../components/loading';
const Register = () => {
    const [loading,setloading]=useState(false);
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password==confirmPassword){
        const user={
            name,
            email,
            password
        }
        try {
            setloading(true);
            axios.post('/register',user).then(
                response=>{
                    console.log(`successfully create ${response}`);
                    setloading(false);
                    setSuccess(true);
                    setTimeout(()=>{window.location.href='/login'},5000);
                }
            )
        } catch (error) {
            setError(true);
            setloading(false);
            console.log(error);
        }
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }else{
        alert("wrong passwod re-enter paswword");
        setPassword('');
        setConfirmPassword('');
    }
    
}
if(loading){
    return(<Loading/>)
}else if(error){
    return(<Error/>)
}

  return (
    <Container mt-4>
      {success?<Success message={'successfully registered'}/>:<h2 className="text-uppercase text-center mb-5">Create an account</h2>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Your Name'
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your Email'
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </FormGroup>
        <Button color="primary">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
