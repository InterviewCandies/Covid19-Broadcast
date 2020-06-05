import React from 'react'
import '../../styles/Footer.css'
import { useTranslation } from 'react-i18next'
const Footer = props => {
    const { t } = useTranslation();
    return (
        <div className="mt-5 footer">
            <p className="mb-1 text-center font-weight-lighter">{t("lastUpdated")} <span>{new Date(props.updated).toLocaleString()}</span></p>
            <div className="d-flex justify-content-center">
                <p className="mb-1">{t("providedBy")} <a href="https://disease.sh/" target="_blank">NOVEL COVID API</a></p>
                <p className="mx-2">|</p>
                <p className="m-0">{t("powerBy")} <a href="https://github.com/InterviewCandies" target="_blank">Vo Quoc Thang</a></p>
            </div>
        </div>
    )
}
export default Footer;