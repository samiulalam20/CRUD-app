import React, { Component } from 'react'
import ProductForm from './ProductForm'

class ProductList extends Component {
    state = {
        currentIndex: -1,
        list : this.returnList(),
        searchResults: []
    }

    returnList () {
        if(localStorage.getItem('products') == null)
            localStorage.setItem('products', JSON.stringify([]))
            return JSON.parse(localStorage.getItem('products'))
    }

    onAddorEdit = (data) => {
        var list = this.returnList()
        if(this.state.currentIndex==-1)
        list.push(data)
        else
        list[this.state.currentIndex] = data
        localStorage.setItem('products', JSON.stringify(list))
        this.setState({list:list, currentIndex:-1})
    }

    handleEdit = index => {
        this.setState({
            currentIndex: index
        })
    }

    handleDelete = (index) => {
        var list = this.returnList()
        list.splice(index, 1)
        localStorage.setItem('products', JSON.stringify(list))
        this.setState({list:list, currentIndex:-1})
    }

    handleSearch = e => {
        console.log("list",this.state.list)
        var sr = e.target.value
        var resultSr = []
        if(sr){
            resultSr = this.state.list.filter(prod => prod.product.includes(sr))
        }
        else{
            resultSr = []
        }
        this.setState({searchResults:resultSr})
        
    }
    render() {
        return (
            <div>
                <ProductForm
                onAddorEdit={this.onAddorEdit}
                currentIndex = {this.state.currentIndex}
                list = {this.state.list}
                searchResults = {this.state.searchResults}
                handleSearch = {this.handleSearch}
                />
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                        </tr>
                        {
                            this.state.list.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.product}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.category}</td>
                                    <td><button onClick={() => this.handleEdit(index)}>Edit</button></td>
                                    <td><button onClick={() => this.handleDelete(index)}>X</button></td>
                                </tr>
                            })
                        }

                        <br></br>
                        <br></br>
                        <h3>Search Results</h3>
                        {
                            this.state.searchResults.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.product}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.category}</td>
                                    <td><button onClick={() => this.handleEdit(index)}>Edit</button></td>
                                    <td><button onClick={() => this.handleDelete(index)}>X</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductList