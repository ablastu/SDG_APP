import PropTypes from "prop-types";

const Table = ({ data, columns }) => {
    return (
        <div className="m-10">
            <table className="min-w-full border border-gray-300 shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className="py-2 px-4 border">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                            {columns.map((column) => (
                                <td key={column.key} className="py-2 px-4 border text-center">
                                    {row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Table;
