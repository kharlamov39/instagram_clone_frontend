import { Formik, Form } from "formik";
import { useAppDispatch, useTypedSelector } from "../../hooks/hooks";
import Input from "../Input/Input";
import styles from "./UpdateProfile.module.css";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { instance } from "../../api/api";
import { fetchUpdateProfile, fetchDeleteProfile } from "../../redux/profileSlice";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera.png";

const UpdateProfile = () => {
    const currentId = useTypedSelector(state => state.auth.currentUser?._id)
    const profile = useTypedSelector( state => state.profile.profile)
    const inputRef = useRef<HTMLInputElement>(null)
    const [ image, setImage ] = useState('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const UpdateProfileSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        avatar: Yup.string(),
      });

    const handleChange = async (e:any, setFieldValue:any) => {
        try{
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            const { data } = await instance.post('/upload', formData)
            setImage(data.url)
            setFieldValue('avatar', data.url)
        } catch(err) {
            console.log(err)
        }
    }

    const deleteProfile = async () => {
        await dispatch(fetchDeleteProfile(profile?._id))
        if( localStorage.getItem('token') == null) {
            navigate('/')
        } 
    }

    if(!profile) {
        return (
            <div> Loading </div>
        )
    }      

    return (
        <div className={styles.main}>
            <div className={styles.formWrap}>
                <Formik 
                    initialValues={{
                        _id: profile._id,
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        avatar: profile.avatar
                    }}
                    validationSchema={UpdateProfileSchema}
                    onSubmit={ async values => {
                        await dispatch(fetchUpdateProfile(values))
                        navigate(`/profile/${profile?._id}`)
                    }}
                >
                    { ({errors, touched, setFieldValue}) =>  (
                        <Form className={styles.form}>
                            <Input type='text' placeholder='firstName' name='firstName' label='Firstname'>
                                {errors.firstName && touched.firstName ? <div >{errors.firstName}</div> : <div></div> }
                            </Input>
                            <Input type='text' placeholder='lastName' name='lastName' label='Lastname'>
                                {errors.lastName && touched.lastName ? <div >{errors.lastName}</div> : <div></div> }
                            </Input>
                            <input type="file" name='avatar' accept='image/*' hidden ref={inputRef} onChange={(e) => handleChange(e, setFieldValue)}/>
                            <div style={{marginBottom: '30px'}}>
                                <div>
                                    Avatar
                                    <img src={camera} alt="camera" onClick={ () => inputRef.current?.click() } />
                                </div>
                                { !image.length 
                                ? <img src={`${process.env.REACT_APP_API_URL}${profile.avatar}`} alt="avatar" width='200px' />
                                : <img src={`${process.env.REACT_APP_API_URL}${image}`} alt="avatar" width='200px' />
                                }   
                                
                            </div>
                            
                            <Button type="submit" variant='blue'>
                                Обновить
                            </Button>
                            
                        </Form>
                    )}

                </Formik>
            </div>
            <div className={styles.deleteBtn}>
                <Button variant='red' type='button' onClick={deleteProfile}>
                    Удалить профиль
                </Button>
            </div>
        </div>
    )
}

export default UpdateProfile