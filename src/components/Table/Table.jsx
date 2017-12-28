import React from 'react'
import PropTypes from 'prop-types'
import styles from './Table.scss'

const renderThs = (contents, thStyles) => contents.map((content, index) => {
    const style = thStyles[index]
    return (
        <th
          key={index}
          className={styles['table-th']}
          style={style}
        >
            {content}
        </th>
    )
})

const renderTds = (contents, tdStyles) => contents.map((content, index) => {
    const tdStyle = tdStyles[index]
    return <td key={index} style={tdStyle}>{content}</td>
})

const renderTrs = (contents, style) => contents.map((content, index) => (
    <tr key={index} className={styles['table-tr']}>
        { renderTds(content, style) }
    </tr>
))

const Table = (props) => {
    const { className, tableHead, tableBody, tableHeadStyle, tableBodyStyle } = props.data
    return (
        <table className={className}>
            <thead>
                <tr>
                    {renderThs(tableHead, tableHeadStyle)}
                </tr>
            </thead>
            <tbody>
                {renderTrs(tableBody, tableBodyStyle)}
            </tbody>
        </table>
    )
}

Table.propTypes = {
    data: PropTypes.shape({
        className: PropTypes.string.isRequired,
        tableHead: PropTypes.array.isRequired,
        tableBody: PropTypes.array.isRequired,
        tableHeadStyle: PropTypes.array.isRequired,
        tableBodyStyle: PropTypes.array.isRequired,
    }).isRequired,
}

export default Table
