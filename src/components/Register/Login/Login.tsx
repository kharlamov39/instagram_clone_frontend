import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { useAppDispatch } from "../../../hooks/hooks";
import { fetchLogin } from "../../../redux/authSlice";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import styles from './Login.module.css'

const Login = () => {
    const dispatch = useAppDispatch()

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(5, 'Too Short').max(15, 'Too Long').required('Required')
      });

    return (
        <div style={{marginBottom: '20px'}} className={styles.formWrap}>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    dispatch(fetchLogin(values));
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Input type='email' placeholder='email' name='email' label='Email' > 
                            {errors.email && touched.email ? <div >{errors.email}</div> : <div></div> }
                        </Input>

                        <Input type='password' placeholder='password' name='password' label='Password' > 
                            {errors.password && touched.password ? <div >{errors.password}</div> : <div></div> }
                        </Input>
                        <Button type="submit" variant='black'> 
                            Login 
                        </Button>
                    </Form>
            )}
     </Formik>
   </div>
    )
}

export default Login