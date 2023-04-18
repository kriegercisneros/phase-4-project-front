import React, { useEffect, useState } from 'react'
//import {Formik} from 'formik'

export const SignupForm = () =>{
    const [users, setUsers] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        console.log("fetching users...")
        fetch('/users')
    })
} 

    const formik = useFormik({
        initialValues:{
            company_name:'',
            email:'',
            location:'',
            password:'',
            re_enter_password:''
        },
        validationSchema: formSchema,
    onSubmit:(values)=>{
        fetch("customers", {

        })
    }
    })