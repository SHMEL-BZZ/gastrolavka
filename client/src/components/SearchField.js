import React from 'react';

const SearchField = () => {
    return (
        <div>
            <div class="search-widget">
                <div class="search-container">
                    <div class="search-box">
                        <input type="text" class="search-input" placeholder="Найти"/>
                            <span class="search-icon">🔍</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchField;