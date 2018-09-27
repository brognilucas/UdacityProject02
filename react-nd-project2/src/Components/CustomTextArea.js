import React from 'react'

import { TextArea } from 'semantic-ui-react'


const CustomTextArea = ({ field,props }) => (
    <div>
        <TextArea {...field} {...props} autoHeight rows={2}/>
    </div>
);

export default CustomTextArea
