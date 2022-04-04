import React from 'react';
import styles from "./Button.module.scss"

interface ButtonProps {
    type?: string,
    href?: string,
    disabled?: boolean,
    text?: string,
    secondary?: boolean,
    noBorder?: boolean,
    customClass?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: number | string,
    weight?: number | string,
    children?: any,
    tag?: string
}

const Button = ({ type, href, disabled = false, text, secondary, noBorder, customClass, onClick, size = "100%", weight = 300, tag = "button", children, ...props }: ButtonProps) => {
    let CustomTag: any = tag;
    return (
        <CustomTag
            to={`${href ? href : ""}`}
            className={
                `${disabled && styles.disabled} ${styles.Button} ${customClass ? customClass : ""} ${secondary ? styles.secondary : ""} ${noBorder ? styles.noBorder : ""}`
            }
            disabled={disabled}
            type={type ? type : ""}
            onClick={!disabled && onClick}
            {...props}
            style={{ width: size }}
        >
            {text && text}
            {children}

        </CustomTag>
    )
}
export default Button;