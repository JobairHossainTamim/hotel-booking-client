import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";


function Loader() {
    const [loading, setLoading] = useState(true);

    return (
        <>

            <div  className="sweet-loading text-center" style={{ marginTop: '150px' }}>
                <HashLoader color={'#256395'} loading={true} css='' size={90} style={{ textAlign :"center"}}/>
            </div>
        </>
    );
}

export default Loader;