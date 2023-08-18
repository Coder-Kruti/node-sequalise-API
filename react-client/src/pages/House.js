import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from "../components/Loading";
function House() {

    const [loading, setLoading] = useState(true);
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/houses`).then(res => {
            console.log(res)
            setHouses(res.data);
            setLoading(false)
        });
    }, [])
    if (loading) {
        return (
            <Loading />
        )
    }
    var houseDetails = ""
    houseDetails = houses?.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.address}</td>
                <td>{item.currentValue}</td>
                <td>{item.loanAmount}</td>
                <td>{item.risk}</td>
                <td>
                    <Link to={`${item.id}/edit`} className="btn btn-success"> Edit </Link>
                </td>
                <td>
                    <Link to={`${item.id}/view`} className="btn btn-success"> View </Link>
                </td>
            </tr>
        )

    });
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>House List
                                <Link to="/houses/create" className="btn btn-primary float-end"> Add House</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Address</th>
                                        <th>Current Value</th>
                                        <th>Loan Amount</th>
                                        <th>Risk</th>
                                        <th>Edit</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {houseDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default House;