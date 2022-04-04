import React from "react";
import styles from "./Table.module.scss";

const Table = ({
    fieldAndHeaders,
    items,
    totalItems }) => {
    return (
        <table className={styles.Table}>
            <thead>
                <tr>
                    {Object.keys(fieldAndHeaders).map((header, index) => {
                        return <td key={index}>{header}</td>;
                    })}
                </tr>
            </thead>
            <tbody>
                {items?.length > 0 && items.map((item, index) => {
                    return (
                        <tr key={"body" + index}>
                            {Object.keys(fieldAndHeaders).map((header) => {
                                return (
                                    <td
                                        key={header + 1}
                                    >
                                        {item[fieldAndHeaders[header]]}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
            {totalItems ? <tfoot>
                <tr>
                    <td colSpan="10">
                        <div className={styles.footerOption}>
                            <small>Total Items: {totalItems} </small>
                        </div>
                    </td>
                </tr>
            </tfoot> : null}
            {items.length === 0 && 'No se encontraron productos'}
        </table>
    )
}

export default Table