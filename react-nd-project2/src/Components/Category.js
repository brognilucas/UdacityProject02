
import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const Category = (props) => {
    return (
        <List.Item>
            <List.Content>
                <Link to={'/'+props.category.name}>{props.category.name}</Link>
            </List.Content>
        </List.Item>
    )
}

export default Category