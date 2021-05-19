import React, { Component } from 'react'

class ProductForm extends Component {
    state = {
        ...this.returnStateObject()
    }

    returnStateObject(){
        if(this.props.currentIndex==-1)
        return {
            product: '',
            price: '',
            quantity: '',
            category: '',
        }
        else
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentIndex != this.props.currentIndex || prevProps.list.length != this.props.list.length)
        this.setState({...this.returnStateObject()})
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onAddorEdit(this.state)
    }
    render() {
        return (
            <div>
                <input type="search" onChange={this.props.handleSearch} />
                <form onSubmit = {this.handleSubmit} autoComplete="off">
                <input name="product" placeholder="Enter product" value={this.state.product} onChange={this.handleInputChange} /> <br/>
                <input name="price" placeholder="Enter price" value={this.state.price} onChange={this.handleInputChange} /> <br/>
                <input name="quantity" placeholder="Enter quantity" value={this.state.quantity} onChange={this.handleInputChange} /> <br/>
                <input name="category" placeholder="Enter category" value={this.state.category} onChange={this.handleInputChange} /> <br/>
                <button type="submit">Add</button>
            </form>
            </div>
        )
    }
}

export default ProductForm