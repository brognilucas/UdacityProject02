import React, { Component } from 'react'
import Posts from './Posts'
import { Input, Segment, Header } from 'semantic-ui-react'
class HomePage extends Component {

    state = {
        order: "voteScore",
        title: ''
    }

    setFilter = (e) => {
       this.setState( () => ({
           title: e
       }))
    }


    
    changeOrder(order) {
        this.setState(() => ({
            order
        }))
    }

    render() {
        return (
            <Segment>
                <Header> Filter Posts by Titles Here </Header> 
                <Input fluid onChange={ (e) => this.setFilter(e.target.value)} value={this.state.title} placeholder='Filter by Title'/>
                <Posts order={this.state.order} title={this.state.title}  changeOrder={(e) => this.changeOrder(e)} />
            </Segment>            
        )
    }
}

export default HomePage