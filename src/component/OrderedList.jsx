const OrderedList = ({ listItems }) => {
    return (
        <ol>
            {listItems.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </ol>
    );
};

export default OrderedList;
