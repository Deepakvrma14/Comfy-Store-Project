import { FormInput, SubmitBtn } from '../components';
import { Form, Link, useNavigate } from 'react-router-dom';

import { redirect } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/users/userSlice';

export const action = (store)=> async({request})=>{
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try{
      const response = await customFetch.post('/auth/local',data);
      store.dispatch(loginUser(response.data));
      toast.success('Logged in Successfully');
      return redirect('/')
    }catch(error){
      console.log(error);
      const errorMessage = error?.response?.data?.error?.message || "Please add credentials properly";
      toast.error(errorMessage);
      return null;

    }
  }



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginGuest = async() =>{
    try{
      const response = await customFetch.post('/auth/local', {
        identifier:'test@test.com',
        password: 'secret',
      });
      dispatch(loginUser(response.data));
      toast.success('Guest ID logged in');
      return navigate('/');
    }catch(error){
      console.log(error);
      toast.error('Error logging you in, please try agian later');
      if(error?.response?.status ===401){
        toast.warn('Unauthorised, Please register first  ');
      }
      if(error?.response?.status ===403){
        toast.warn('Forbidden, Please check your credentials ');
      }
      return null;
    }
  }
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='post'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput
          type='email'
          label='email'
          name='identifier'
          defaultValue='test@test.com'
        />
        <FormInput
          type='password'
          label='password'
          name='password'
          defaultValue='secret'
        />
        
        <div className='mt-4' >
            <SubmitBtn text='Login' />
        </div>
        <button type='button' className='btn btn-secondary btn-block' onClick={loginGuest}>
          continue as Guest
        </button>
        
        <p className='text-center'>
          Not a member yet?
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;