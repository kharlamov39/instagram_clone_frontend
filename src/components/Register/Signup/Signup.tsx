import { Formik, Form, Field  } from "formik";
import * as Yup from 'yup';
import { useAppDispatch, useTypedSelector } from "../../../hooks/hooks";
import { fetchRegister } from "../../../redux/authSlice";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import styles from './Signup.module.css'
import { useState } from "react"; 
import InputPassword from "../../InputPassword/InputPassword";
import { RegisterType } from "../../../api/auth-api";

const Signup = () => {

    const [ showPass, setShowPass ] = useState<'password' | 'text'>('password')

    const dispatch = useAppDispatch()

    const initialValues:RegisterType = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(15, 'Too Long!')
          .matches(/^[a-zA-Zа-яА-Я]+([- ][a-zA-Zа-яА-Я]+)*$/, "Incorrect firstname")
          .required('Required'),
        lastName: Yup.string()
          .min(2, 'Too Short!')
          .max(15, 'Too Long!')
          .matches(/^[a-zA-Zа-яА-Я]+([- ][a-zA-Zа-яА-Я]+)*$/, "Incorrect lastname")
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(5, 'Too Short').max(25, 'Too Long').required('Required')
      });

    return (
        <div className={styles.formWrap}>
            <h1>Signup</h1>
            <Formik
                initialValues={initialValues}
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

                        <Input type='text' placeholder='lastName' name='lastName' label='Lastname'  > 
                            {errors.lastName && touched.lastName ? <div >{errors.lastName}</div> : <div></div> }
                        </Input>

                        <Input type='email' placeholder='email' name='email' label='Email'  > 
                            {errors.email && touched.email ? <div >{errors.email}</div> : <div></div> }
                        </Input>

                        <InputPassword placeholder='password' name='password' label='Password' >
                            {errors.password && touched.password ? <div >{errors.password}</div> : <div></div> }
                        </InputPassword>
                      
                        <Button type="submit" variant="blue">
                            Sign up
                        </Button>
                    </Form>
            )}
     </Formik>
   </div>
    )
}

export default Signup