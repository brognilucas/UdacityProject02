import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addKeyPost } from '../Utils/addKeys'

import CategoryList from './CategoryList'
import { Segment } from 'semantic-ui-react'
import Post from './Post';
import { withRouter } from 'react-router-dom'
class HomePage extends Component {

    changeOrdering = (item) => {
        this.props.changeOrder(item)
    }

    render() {
        const { categories, posts } = this.props
        return (
            <div>
                <CategoryList categories={categories} />
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
                    <Segment>
                        {posts.map((post) => (
                            <Post key={post} id={post} />
                        ))}
                    </Segment>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }, props) {

    const { category } = props.match.params

    const { order } = props

    if (category) {

        const postsFiltered = Object.values(posts).filter((post) => post.category === category)

        return {
            categories,
            posts: Object.keys(addKeyPost(postsFiltered)).sort((a, b) => {
                return posts[b][order] - posts[a][order]
            })
        }
    }

    return {
        categories,
        posts: Object.keys(posts).filter(post => !post.deleted).sort((a, b) => {
            return posts[b][order] - posts[a][order]
        })
    }
}




export default withRouter(connect(mapStateToProps)(HomePage));