import React from 'react';
export default function MyFunctionalDescription({ description, children, selected }) {
    console.log('selected: ' + selected);
    return <p>My functional Description: {children} {description} </p>
}

export const descriptionFromModule = 'exported const';