import React from 'react'

function Error({ msg }) {
    return (
        <div className="min-h-96">
            <p className="mt-4 font-montSemiBold" >{msg}</p>
        </div>
    )
}

export default Error