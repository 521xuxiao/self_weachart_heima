const objects = {
    getSetting: ()=>{
        return new Promise((resolve, reject)=>{
            wx.getSetting({
                success: (result)=>{
                    resolve(result);
                },
                fail: (err)=>{
                    reject(err);
                }
            });
        })
    },

    openSetting: ()=>{
        return new Promise((resolve, reject)=>{
            wx.openSetting({
                success: (result)=>{
                    resolve(result);
                },
                fail: (err)=>{
                    reject(err);
                }
            });
        })
    },

    chooseAddress: ()=>{
        return new Promise((resolve, reject)=>{
            wx.chooseAddress({
                success: (result)=>{
                    resolve(result)
                },
                fail: (err)=>{
                    reject(err);
                }
            });
        })
    },

    showModal: (title, content)=>{
        return new Promise((resolve, reject)=>{
            wx.showModal({
                title,
                content,
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#333',
                confirmText: '确定',
                confirmColor: '#409eff',
                success: (result) => {
                    if(result.confirm){
                        resolve("ok");
                    }else{
                        resolve("notOk");
                    }
                },
                fail: (err)=>{
                    reject(err);
                }
            });
        })
    }
};
export default objects;