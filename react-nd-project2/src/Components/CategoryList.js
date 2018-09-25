import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Category from './Category';
const CategoryList = (props) => (
    <div>
        <h3> Category </h3>
        <List horizontal relaxed='very'>
            <List.Item>
                <List.Content>
                    <Link to='/'> All  </Link>
                </List.Content>
            </List.Item>
            {Object.values(props.categories).map(category => (
                <Category key={category.name} category={category} />
            ))}
        </List>
    </div>
)

export default CategoryList