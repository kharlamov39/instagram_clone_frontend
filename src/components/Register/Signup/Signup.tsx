import { Formik, Form, Field  } from "formik";
import * as Yup from 'yup';
import { useAppDispatch } from "../../../hooks/hooks";
import { fetchRegister } from "../../../redux/authSlice";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import styles from './Signup.module.css'

const Signup = () => {

    const dispatch = useAppDispatch()

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        lastName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(5, 'Too Short').max(15, 'Too Long').required('Required')
      });

    return (
        <div style={{marginBottom: '20px'}} className={styles.formWrap}>
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    dispatch(fetchRegister(values));
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                         <Input type='text' placeholder='firstName' name='firstName' label='Firstname' > 
                            {errors.firstName && touched.firstName ? <div >{errors.firstName}</div> : <div></div> }
                        </Input>

                        <Input type='text' placeholder='lastName' name='lastName' label='Lastname' > 
                            {errors.lastName && touched.lastName ? <div >{errors.lastName}</div> : <div></div> }
                        </Input>

                        <Input type='email' placeholder='email' name='email' label='Email' > 
                            {errors.email && touched.email ? <div >{errors.email}</div> : <div></div> }
                        </Input>

                        <Input type='password' placeholder='password' name='password' label='Password' > 
                            {errors.password && touched.password ? <div >{errors.password}</div> : <div></div> }
                        </Input>
                        
                        <Button type="submit" variant="black">
                            Sign up
                        </Button>
                    </Form>
            )}
     </Formik>
   </div>
    )
}

export default Signup