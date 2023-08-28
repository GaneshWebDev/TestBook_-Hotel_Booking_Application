import React from 'react';
import { Triangle } from 'react-loader-spinner';
function Loading(){
    return(
        <Triangle
          height="100"
          width="100"
          color="#2F3C7E"
          ariaLabel="triangle-loading"
          wrapperStyle={{display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            height:'100vh'}}
          wrapperClassName=""
          visible={true}
        />
    )
}
export default Loading;