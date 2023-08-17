import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'
function HouseView() {

    let { id } = useParams();
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
                                <h4> View House
                                    <Link to="/houses" className="btn btn-danger float-end"> Back </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label>Address</label>
                                        <input type="text" id="address" name="address" value={house.address} onChange={handleInput} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Current Value</label>
                                        <input type="text" id="currentValue" name="currentValue" value={house.currentValue} onChange={handleInput} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Loan Amount</label>
                                        <input type="text" id="laonAmount" name="loanAmount" value={house.loanAmount} onChange={handleInput} className="form-control" />
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
export default HouseView