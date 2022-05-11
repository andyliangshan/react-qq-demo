import React from "react";
import { useEffect, useState } from "react";
import request from "../utils/request";
import { QueryInput } from "./query";
import { QqInfo } from "./qqInfo";
import './index.css'

export const QueryQQInfo = () => {
    // 设置输入参数
    const [param, setParam] = useState({
        qqNumber: ""
    });
    // 设置查询信息
    const [info, setInfo] = useState({});
    // 设置loading
    const [loading, setLoading] = useState(true);

    const apiUrl = 'https://api.uomg.com/api/qq.info';

    // 防抖副作用函数
    const useDebouncedEffect = (fn, ms, deps) => {
        useEffect(() => {
            let clean = null;
            const timer = setTimeout(() => {
                clean = fn();
            }, ms);
            return () => {
                clearTimeout(timer);
                if (clean) clean();
            };
        }, deps);
    }
    const getQQInfo = ({ qqNumber }) => {
        if (qqNumber && /\D/g.test(qqNumber)) {
            alert('请输入数字！');
            setParam({
                qqNumber: qqNumber.replace(/[^0-9]/g, '')
            });
            return false;
        }
        setLoading(true);
        request({
            url: `${apiUrl}?qq=${qqNumber}`,
            method: 'get',
            data: {}
        }).then(res => {
            setInfo(res);
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setLoading(false);
        })
    }

    useDebouncedEffect(() => getQQInfo(param), 500, [param])

    return <>
        <QueryInput param={param} setParam={setParam} />
        {loading ? <div className="loading">
            加载中....
        </div> : (info.code !== 1 ? <div className="queryRes">查询错误结果： {info.message}</div> : <QqInfo info={info} />)}
    </>
}
