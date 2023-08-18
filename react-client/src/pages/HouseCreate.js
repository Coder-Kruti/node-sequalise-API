import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'

function HouseCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [inputErrorList, setInputErrorList] = useState({})
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
                console.log("*------**************")
                console.log(res)
                alert("Saved the house data")
                navigate('/houses')
                setLoading(false)
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        setInputErrorList(error.response.data.errors)
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
                                        <label>Address</label>
                                        <input type="text" id="address" name="address" value={house.address} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.address}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Current Value</label>
                                        <input type="text" id="currentValue" name="currentValue" value={house.currentValue} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.address}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Loan Amount</label>
                                        <input type="text" id="laonAmount" name="loanAmount" value={house.loanAmount} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.address}</span>
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