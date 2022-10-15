import { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getAnimals } from "../../managers/animals"
import { addEmployee } from "../../managers/employees"
import { getLocations } from "../../managers/locations"
import "./Employees.css"

export const AddEmployeeForm = () => {
    const name = useRef(null)
    const address = useRef(null)
    const location = useRef(null)

    const navigate = useNavigate()

    const [animals, setAnimals] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(() => {
        getAnimals().then(animalsData => setAnimals(animalsData))
        getLocations().then(locationsData => setLocations(locationsData))
    }, [])

    const constructNewEmployee = () => {
        const locationId = parseInt(location.current.value)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            addEmployee({
                name: name.current.value,
                address: address.current.value,
                location_id: locationId
            })
                .then(() => navigate("/employees"))
        }
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">Create New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name: </label>
                    <input type="text" id="employeeName" ref={name} required autoFocus className="form-control" placeholder="Employee name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeAddress">Address: </label>
                    <input type="text" id="employeeAddress" ref={address} required autoFocus className="form-control" placeholder="Employee name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue="" name="location" ref={location} id="employeeLocation" className="form-control" >
                        <option value="0">Select a location</option>
                        {
                            locations.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>

                            ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEmployee()
                }}
                className="btn btn-primary">
                Save Employee
            </button>
        </form>
    )
}
