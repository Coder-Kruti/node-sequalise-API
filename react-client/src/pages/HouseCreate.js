import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'

function HouseCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [house, setHouse] = useState({
        address: '',
        currentValue: '',
        loanAmount: '',
        risk: ''
    });
    const handleInput = (event) => {
        event.persist();
        setHouse(house => ({ ...house, [event.target.name]: event.target.value }))
    }

    const saveHouse = (e) => {
        e.preventDefault();
        setLoading(true)

        const data = {
            address: house.address,
            currentValue: house.currentValue,
            loanAmount: house.loanAmount
        }

        axios.post(`http://localhost:8080/api/houses`, data)
            .then(res => {
                alert("Saved the house data")
                navigate('/houses')
                setLoading(false)
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        alert("Please fill in address, Loan Amount, Current Value")
                        setLoading(false)
                    }
                    if (error.response.status === 500) {
                        alert("Service is currently unavaible.")
                        setLoading(false)
                    }
                }

            });

    }
    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4> Add House
                                    <Link to="/houses" className="btn btn-danger float-end"> Back </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveHouse}>
                                    <div className="mb-3">
                                        <label>Address <span className="required">*</span></label>
                                        <input type="textarea" id="address" name="address" value={house.address} onChange={handleInput} required className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Current Value <span className="required">*</span></label>
                                        <input type="number" id="currentValue" name="currentValue" min= "0.1" value={house.currentValue} onChange={handleInput} required className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Loan Amount <span className="required">*</span></label>
                                        <input type="number" id="laonAmount" name="loanAmount" min="0" max={house.currentValue} value={house.loanAmount} onChange={handleInput} required className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary" > Save house</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HouseCreate;