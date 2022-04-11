import React from "react";
import styles from './Title.module.scss';

interface Title {
    children: any,
    priority?: number,
    underlined?: boolean,
    hasMargin?: boolean ,
    customClass?: string,
    tag?: string
}

const Title = ({
    children,
    priority = 2,
    underlined,
    hasMargin,
    customClass,
    tag
}: Title) => {
    let CustomTag: any = tag ? tag : `h${priority}`;
    return (
        <div className={`${customClass ? customClass : ""} ${styles.Title} ${underlined ? styles.underlined : ""} ${hasMargin ? styles.hasMargin : ""}`}>
            <CustomTag>{children}</CustomTag>
        </div>
    );
};

export default Title;
