import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Store } from '../Store';
import { getError } from '../util';
import { toast } from 'react-toastify';

export default function SignUpScreen() {
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error(' passwords donot match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      //   alert('Invalid UserName or password entered');
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="confirm password"
            required
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an Account?{' '}
          <Link to={`/signIn?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
}
