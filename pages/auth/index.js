// pages/auth/index.js
import { request1 } from "../../request/request";
import regeneratorRuntime from "../../libs/runtime/runtime.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 获取用户信息
     */
    getUserInfo(e) {
        const {encryptedData, iv, rawData, signature} = e.detail;
        wx.login({
            timeout:10000,
            success: (result)=>{
                // console.log(result);
                const {code} = result;
                // console.log(code);
                this.initData(encryptedData, rawData, iv, signature, code);
            }
        });
    },
    async initData(encryptedData, rawData, iv, signature, code) {
        let res = await request1("api/public/v1/users/wxlogin", "POST", {encryptedData, rawData, iv, signature, code});
        const {token} = res.message;
        wx.setStorageSync("token", token);
        wx.navigateBack({
            delta: 1
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})