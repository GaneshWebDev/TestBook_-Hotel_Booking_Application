import React from 'react';
function Success({message}){
    return(
        <div class="alert alert-success" role="alert">
            <p>{message}</p>
        </div>
    )
}
export default Success;