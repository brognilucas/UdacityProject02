import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addKeyPost } from '../Utils/addKeys'
import CategoryList from './CategoryList'
import { Segment, Input } from 'semantic-ui-react'
import Post from './Post';
import { withRouter } from 'react-router-dom'
class Posts extends Component {


    changeOrdering = (item) => {
        this.props.changeOrder(item)
    }

    render() {
        const { categories, posts } = this.props

        return (

            <div>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <span> Select the ordering of posts </span>
                    <select className='ui selection dropdown' placeholder='Choose language...' onChange={(e) => this.changeOrdering(e.target.value)}>
                        <option value='voteScore'> Vote Score </option>
                        <option value='timestamp'> Timestamp </option>
                    </select>
                </div>
                <div>
                    <CategoryList categories={categories} />
                </div>
                <div>
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

    const { order, title } = props
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
        posts: Object.keys(posts).filter(post => posts[post].title.toUpperCase().includes(title.toUpperCase())).sort((a, b) => {
            return posts[b][order] - posts[a][order]
        })
    }
}




export default withRouter(connect(mapStateToProps)(Posts));