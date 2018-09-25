import React, { Component } from 'react'
import { connect } from 'react-redux'

import Category from './Category';
import { List, Segment, Button } from 'semantic-ui-react'
import Post from './Post';
class HomePage extends Component {

    changeOrdering = (item) => {
        this.props.changeOrder(item)
    }

    render() {
        const { categories, posts } = this.props
        return (
            <div>
                <div>
                    <h3> Category </h3>
                    <List horizontal relaxed='very'>
                        {Object.values(categories).map(category => (
                            <Category key={category.name} category={category} />
                        ))}
                    </List>
                </div>
                <div>
                    <div>
                        <Segment.Group horizontal>
                            <Segment>
                                <span> Select the ordering of posts </span>
                                <select className='ui selection dropdown' placeholder='Choose language...' onChange={(e) => this.changeOrdering(e.target.value)}>
                                    <option value='voteScore'> Vote Score </option>
                                    <option value='timestamp'> Timestamp </option>
                                </select>
                            </Segment>
                        </Segment.Group>
                    </div>
                    <h3> Posts </h3>
                    <List horizontal relaxed='very'>
                        {posts.map((post) => (
                            <Post key={post} id={post} />
                        ))}
                    </List>
                </div>
                <Button content='Add new Post' />
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }, { order }) {
    return {
        categories,
        posts: Object.keys(posts).sort((a, b) => {
            return posts[b][order] - posts[a][order]
        })
    }
}




export default connect(mapStateToProps)(HomePage);