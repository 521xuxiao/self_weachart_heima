const host = "https://api-hmugo-web.itheima.net/";
let num = 0;
export const request1 = (params, method, data, header) => {
    return new Promise((resolve, rejects)=>{
       wx.showLoading({
           title: "努力加载中.....",
           mask: true
       });
       num++;
        wx.request({
            url: host+params,
            method: method?method:'GET',
            data: data,
            header,
            success: (res)=>{
                resolve(res.data);
            },
            fail: (err)=>{
                rejects(err);
            },
            complete: ()=>{
                num--;
                if(num === 0 ) {
                    wx.hideLoading();
                }
            }
        })
    })
}