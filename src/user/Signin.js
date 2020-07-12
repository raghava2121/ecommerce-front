import React, { useState } from 'react'
import Layout from '../core/Layout';
import { Link, Redirect } from 'react-router-dom';
import { signin , authenticate} from '../auth'

const Signin = () => {
    const [values, setValues] = useState({
        password: 'test1234',
        email: 'testdsadasd@gmail.com',
        error: '',
        loading: false,
        redirectToReferrer:false
    })

    const { email, password, error, loading, redirectToReferrer } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: '', [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading:false })
        signin({ email, password })
            .then(data => {
                console.log("data",data)
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false , redirectToReferrer:false})
                } else {
                    authenticate( data, () => {
                        setValues({
                            ...values,
                            loading: false,
                            redirectToReferrer: true
    
                        })
                    })
                   
                }
            })
    }


    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted"> Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}> Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}> {error}</div>

    )
    const showLoading = () => (
         loading && <div > <h2> ...loading</h2>
             </div>

    )

    const redirectUser = () => {
        if(redirectToReferrer){
            return <Redirect to="/"/>
        }
    }
    return (

        <Layout title="Signin " description=" Signin here here to node ecommerce app" className='container col-md-8 offset-md-2'>
            <div>
                {showError()}
                {showLoading()}
                {redirectUser()}
                {signUpForm()}</div>

        </Layout>
    )

}


export default Signin
