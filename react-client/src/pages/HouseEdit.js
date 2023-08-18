import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'
function HouseEdit() {

    let { id } = useParams();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [house, setHouse] = useState({});
    const handleInput = (event) => {
        event.persist();
        setHouse(house => ({ ...house, [event.target.name]: event.target.value }))
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/api/houses/${id}`).then(res => {
            setHouse(res.data);
            setLoading(false)
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert("Id not found")
                    setLoading(false)
                }
                if (error.response.status === 500) {
                    alert("Service is currently unavaible.")
                    setLoading(false)
                }
            }

        });
    }, [id])

    const updateHouse = (e) => {
        e.preventDefault();

        setLoading(true)
        const data = {
            address: house.address,
            currentValue: house.currentValue,
            loanAmount: house.loanAmount
        }
        axios.put(`http://localhost:8080/api/houses/${id}`, data)
            .then(res => {
                if (res.status === 200) {
                    alert("Updated the house data")
                    navigate('/houses')
                    setLoading(false)
                }
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        setLoading(false)
                    }
                    if (error.response.status === 404) {
                        alert("Id not found")
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
    if (Object.keys(house).length === 0) {
        return (
            <div className="container">
                <h4>House does not exist with that id</h4>
            </div>
        )

    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4> Edit House
                                    <Link to="/houses" className="btn btn-danger float-end"> Back </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateHouse}>
                                    <div className="mb-3">
                                        <label>Address <span class="required">*</span></label>
                                        <input type="textarea" id="address" name="address" value={house.address} onChange={handleInput} required className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Current Value <span class="required">*</span></label>
                                        <input type="number" id="currentValue" name="currentValue" min="0"  value={house.currentValue} onChange={handleInput} required className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Loan Amount <span class="required">*</span></label>
                                        <input type="number" id="laonAmount" name="loanAmount" min="0"  value={house.loanAmount} onChange={handleInput} required className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Risk</label>
                                        <input type="text" id="risk" name="risk" value={house.risk}  className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary" > Update house</button>
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
export default HouseEdit