import React, { useState } from 'react';
import '../static/content/site.css';
import { observer } from "mobx-react-lite";

const ChooseBtn = observer(() => {
    // Состояние для хранения выбранного значения (по умолчанию 'option1')
    const [selected, setSelected] = useState('option1');

    const handleClick = (value) => {
        setSelected(value);
        console.log('Выбран вариант:', value);
    };

    return (
        <div>
            <div className="toggle-group">
                <button
                    type="button"
                    className={`toggle-btn ${selected === 'option1' ? 'active' : ''}`}
                    onClick={() => handleClick('option1')}
                >
                    Самовывоз
                </button>
                <button
                    type="button"
                    className={`toggle-btn ${selected === 'option2' ? 'active' : ''}`}
                    onClick={() => handleClick('option2')}
                >
                    Доставка
                </button>
            </div>
        </div>
    );
});

export default ChooseBtn;