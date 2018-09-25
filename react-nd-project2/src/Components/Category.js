
import React from 'react'
import { List } from 'semantic-ui-react'

const Category = (props) => {
    return (
        <List.Item>
            <List.Content>
                <a>{props.category.name}</a>
            </List.Content>
        </List.Item>
    )
}

export default Category