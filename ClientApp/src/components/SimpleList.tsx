import React from 'react';

type SimpleListProps = {
    listItems?: string[]
}

export const SimpleList: React.FC<SimpleListProps> = (props: SimpleListProps) => {
    const { listItems } = props;

    return (
        <ul>
            {
                (!listItems || listItems.length === 0) && <li> nothing yet in store... </li>
            }
            {
                listItems !== undefined && listItems
                    .filter(item => item !== undefined)
                    .map((item: string, index: number) => <li key={index}>{item}</li>)
            }
        </ul>
    );
};