import React from "react";

import { debonce } from '../utils/common';

export const QueryInput = (props) => {
    const { param, setParam } = props;

    return <form action="">
        <div>
            <h2>QQ号查询</h2>
            QQ：<input type="text" value={param.qqNumber} onChange={evt => debonce(setParam({
                ...param,
                qqNumber: evt.target.value
            }), 5000)
            } />
        </div>
    </form>
}