import React, { useEffect } from 'react';


const AvatarPreview = ({avatar}) => {

    useEffect(() => {
        console.log('mounted or updated');
        window.$('#imagePreview').hide();
        window.$('#imagePreview').fadeIn(500);
    });

    return (
        <div className="avatar-upload">
            <div className="avatar-preview">
                <div id="imagePreview" style={{background: `url(${avatar})`}}></div>
            </div>
        </div>
    )
}

export default AvatarPreview;