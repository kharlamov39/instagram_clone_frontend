import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useAppDispatch } from "../../../hooks/hooks";
import { fetchLogin } from "../../../redux/authSlice";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import styles from './Login.module.css'
import InputPassword from "../../InputPassword/InputPassword";

export interface ILoginFields {
    email: string
    password: string
    rememberMe: boolean
}

const Login = () => {
    const dispatch = useAppDispatch()

    const initialValues:ILoginFields = {
        email: '',
        password: '',
        rememberMe: true
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(5, 'Too Short').max(25, 'Too Long').required('Required')
      });

    return (
        <div className={styles.formWrap}>
            <h1>Login</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    const { email, password, rememberMe } = values
                    dispatch(fetchLogin(values));
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Input type='email' placeholder='email' name='email' label='Email' > 
                            {errors.email && touched.email ? <div >{errors.email}</div> : <div></div> }
                        </Input>

                        <InputPassword placeholder='password' name='password' label='Password' >
                            {errors.password && touched.password ? <div >{errors.password}</div> : <div></div> }
                        </InputPassword>
                        <div style={{marginBottom: '20px'}}>
                            <label htmlFor="rememberMe"> Remember Me </label>
                            <Field type="checkbox" name="rememberMe" />
                        </div>
                        
                        
                        <Button type="submit" variant='blue'> 
                            Login 
                        </Button>
                    </Form>
            )}
     </Formik>
   </div>
    )
}

export default Login