import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const [recordAdded, setRecordAdded] = useState(false);

    const handleSubmit = async (event) => {

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        event.preventDefault();
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result = await result.json();
        setRecordAdded(true);
        console.warn(result);
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
    }

    return (
        <div className="add-product">
            <h1>Add a New Product</h1>
            <form onSubmit={handleSubmit}>
                <label>Product Name:</label>
                <input type="text" value={name} name="name" onChange={(e) => { setName(e.target.value) }} />
                {error && !name && <span className='invalid-input'>Enter valid Name</span>}
                <label >Product Price:</label>
                <input type="number" value={price} name="price" onChange={(e) => { setPrice(e.target.value) }} />
                {error && !price && <span className='invalid-input'>Enter valid price</span>}
                <label >Product Category:</label>
                <input type="text" value={category} name="category" onChange={(e) => { setCategory(e.target.value) }} />
                {error && !category && <span className='invalid-input'>Enter valid category</span>}
                <label >Product Company:</label>
                <input type="text" value={company} name="company" onChange={(e) => { setCompany(e.target.value) }} />
                {error && !company && <span className='invalid-input'>Enter valid company</span>}
                <button type="submit">Add Product</button>
            </form>

            {recordAdded && <p className="record-added-text">Record has been added</p>}
        </div>
    )
}

export default AddProduct