import React from 'react'
import Modal from '@material-ui/core/Modal'
import styles from '../styles/PopUp.module.css'

const PopUp = ({open, ruleHyperClose, hyperRule}) => {
    return (
        <>
            <Modal
                open={open}
                onClose={ruleHyperClose}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={styles.popUpContainer}>
                    <div className={styles.popUp}>
                        {hyperRule}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PopUp
