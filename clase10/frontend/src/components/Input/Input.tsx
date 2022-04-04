
import React from 'react';
import styles from "./Input.module.scss";

const FormItem = ({ label, registrar, placeholder, children, customClass, ...props }: any) => {
    return (
        <div className={`${styles.Input} ${customClass && customClass}`}>
            <input placeholder={placeholder} type="text" {...props} />
        </div>
    )
}

export default FormItem;