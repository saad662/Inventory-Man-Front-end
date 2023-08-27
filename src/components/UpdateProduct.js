import React, { useState, useEffect, useCallback } from 'react';
import './AddProduct.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    const getProductDetails = useCallback(async () => {
        let result = await fetch(`http://localhost:5000/products/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }, [params.id]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let result = await fetch(`http://localhost:5000/products/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
        navigate('/');
    };

    return (
        <div className="add-product">
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <label>Product Name:</label>
                <input type="text" value={name} name="name" onChange={(e) => { setName(e.target.value) }} />

                <label>Product Price:</label>
                <input type="number" value={price} name="price" onChange={(e) => { setPrice(e.target.value) }} />

                <label>Product Category:</label>
                <input type="text" value={category} name="category" onChange={(e) => { setCategory(e.target.value) }} />

                <label>Product Company:</label>
                <input type="text" value={company} name="company" onChange={(e) => { setCompany(e.target.value) }} />

                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
