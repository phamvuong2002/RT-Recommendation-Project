import React from 'react'
import "./sendingEmail.css"
export const SendingEmail = () => {
  return (
    <div className="sending-email text-white flex flex-col gap-2">
        <div className="loading-container">
            <div className="loading-text">
                <span>
                    <img width="64" height="64" src="https://img.icons8.com/arcade/64/send-mass-email.png" alt="send-mass-email"/>
                </span>
                <span>
                    <img width="64" height="64" src="https://img.icons8.com/arcade/64/send-mass-email.png" alt="send-mass-email"/>

                </span>
                <span>
                    <img width="64" height="64" src="https://img.icons8.com/arcade/64/send-mass-email.png" alt="send-mass-email"/>
                </span>
            </div>
            
        </div>
        <div className="text-center text-red-500 text-sm">
            Mã OTP đang được gửi đến bạn. Vui lòng chờ trong giây lát...
        </div>
    </div>
  )
}
