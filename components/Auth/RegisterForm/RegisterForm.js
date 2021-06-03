import React, {useState} from 'react'
import { Form, Button } from "semantic-ui-react"
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { registerApi } from '../../../api/user'
import { toast } from 'react-toastify'

export default function RegisterForm(props){
  const {showLoginForm}=props;
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues:initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true)
      //console.log(formData)
      const response = await registerApi(formData)
      console.log(response)
      if (response?.jwt){
        toast.success('Usuario creado exitosamente')
        showLoginForm()
      }else{
        //console.log('Error al registrar al usuario, intentelo mas tarde')
        toast.error('Error al registrar al usuario, intentelo mas tarde')
      }
      setLoading(false)
    }
  })
  return(
    <Form className='login-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name='name'
        type='text'
        placeholder='Nombre'
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name='lastname'
        type='text'
        placeholder='Apellidos'
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name='username'
        type='text'
        placeholder='Nombre de Usuario'
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name='email'
        type='text'
        placeholder='Correo Electrónico'
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name='password'
        type='password'
        placeholder='Contraseña'
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className='actions'>
        <Button type='button' basic onClick={showLoginForm} >
          Iniciar Sesión
        </Button>
        <Button type='submit' className='submit' loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  )
  return (
    <div> 
      Estamos en el registro de usuario form
      <button onClick={showLoginForm}> Ir al Login</button>  
    </div>
  )
}


function initialValues(){
  return {
    name:'',
    lastname:'',
    username: '',
    email: '',
    password: '',
  }
}
function validationSchema(){
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required("El Apellido es obligatorio"),
    username: Yup.string().required("El Usuario es obligatorio"),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
    

  }
}