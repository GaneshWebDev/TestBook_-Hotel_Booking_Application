import React from 'react';
function Invalid({message}){
    return(
        <div class="alert alert-warning" role="alert">
            <p>{message}</p>
        </div>
    )
}
export default Invalid;