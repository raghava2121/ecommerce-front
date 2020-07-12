import React, { useState } from 'react'
import Layout from '../core/Layout';
import { API } from '../config'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        error: '',
        success: false
    })


    const { name, email, password } = values;



    const handleChange = name => event => {
        setValues({ ...values, error: '', [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        signup({ email, name, password })
    }

    const signup = (user) => {
        fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
             //   Accepts: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),

        }).then((response) => {
            return response.json()
        }).catch((err) => {
            console.log(err)
        })

    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted"> Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted"> Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}> Submit</button>
        </form>
    )

    return (

        <Layout title="My signup " description=" signup here to node ecommerce app" className='container col-md-8 offset-md-2'>
            <div> {signUpForm()}</div>

        </Layout>
    )

}


export default Signup
