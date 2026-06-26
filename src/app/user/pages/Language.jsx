import { useEffect, useState } from "react";
import "../css/Menu.css";
import azFlag from '../../../assets/az.svg'
import engFlag from '../../../assets/uk.webp'
import trFlag from '../../../assets/tr.svg'
import ruFlag from '../../../assets/ru.webp'

const Language = ({ setLang }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("az");

    const languages = [
        { code: "az", label: "AZ", flag: azFlag },
        { code: "eng", label: "ENG", flag: engFlag },
        { code: "ru", label: "RU", flag: ruFlag },
        { code: "tr", label: "TR", flag: trFlag },
    ];

    const handleSelect = (lang) => {
        setSelected(lang.code);
        setLang(lang.code);
        setOpen(false);
    };

    const current = languages.find(l => l.code === selected);

    useEffect(() => {
        setLang('az')
    }, [])
    return (
        <div className="lang-wrapper">
            <div className="lang-selected" onClick={() => setOpen(!open)}>
                <img src={current.flag} alt="" className="flag" />
                <span>{current.label}</span>
            </div>

            {open && (
                <div className="lang-dropdown">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            className="lang-item"
                            onClick={() => handleSelect(lang)}
                        >
                            <img src={lang.flag} alt="" className="flag" />
                            <span>{lang.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Language;