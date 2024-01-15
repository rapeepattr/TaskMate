import React from 'react'
import { useEffect } from 'react'

const Alert = ({ msg, type, setAlert, list }) => {
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setAlert({show: 'false', msg: '', type: ''})
        }, 3000)
        return()=>clearTimeout(timeOut)
    }, [list])

    return (
        <p className={`alert ${type}`}>{msg}</p>
    )
}

export default Alert