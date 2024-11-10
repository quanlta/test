import React from "react";

export default function FileUploadComponent({ icon, text }) {
    return (
        <>
            {text ?
                <div className={`mc-file-upload ${text ? "button" : "icon"}`}>
                    <input type="file" id="avatar" />
                    <label htmlFor="avatar">
                        <i className="material-icons">{icon || 'cloud_upload'}</i>
                        <span>{text || 'Upload'}</span>
                    </label>
                </div>
            :
                <div className={`mc-file-upload ${text ? "button" : "icon"}`}>
                    <input type="file" id="avatar" />
                    <label htmlFor="avatar" className="material-icons">{icon || 'cloud_upload'}</label>
                </div>
            }
        </>
    )
}
